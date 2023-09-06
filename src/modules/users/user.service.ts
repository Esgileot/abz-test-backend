import { HttpStatus, Inject, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateUserDto } from './dto/createUser.dto'
import { UserDto } from './dto/user.dto'
import { UserEntity } from './entity/user.entity'
import { PositionService } from '../positions/position.service'
import { ImageService } from '../shared/image.service'
import { AwsS3Service } from '../shared/aws-s3.service'
import { CustomExceptionService } from '../shared/custom-exception.service'
import { UserQueryDto } from './dto/userQuery.dto'
import { ApiConfigService } from 'src/config/api-config.service'
import { UsersResponseDto } from './dto/usersResponseDto'

@Injectable()
export class UserService {
  private readonly count: number = 5
  constructor(
    @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
    @Inject(PositionService) private readonly positionService: PositionService,
    @Inject(ApiConfigService) private readonly configService: ApiConfigService,
    @Inject(ImageService) private readonly imageService: ImageService,
    @Inject(AwsS3Service) private readonly awsS3Service: AwsS3Service,
  ) {}

  public async getUsersPagination(query: UserQueryDto): Promise<UsersResponseDto> {
    const offset = query.offset
    const page = query.page || 1
    const count = query.count || this.count

    const [result, records] = await this.userRepository.findAndCount({
      skip: offset ? offset : (page - 1) * count,
      take: count,
    })

    if (records - offset <= 0) {
      throw CustomExceptionService.customError('Offset more then the users number count', HttpStatus.BAD_REQUEST)
    }

    const totalUsers = offset ? records - offset : records
    const totalPages = Math.ceil(totalUsers / count)
    if (totalPages < page) {
      throw CustomExceptionService.customError('Page not found', HttpStatus.BAD_REQUEST)
    }

    return {
      page: page,
      total_pages: totalPages,
      total_users: totalUsers,
      count: count,
      links: {
        next_url: totalPages <= page ? null : `${this.configService.appDomain}/users?page=${page + 1}&count=${count}`,
        prev_url: 1 < page ? `${this.configService.appDomain}/users?page=${page - 1}&count=${count}` : null,
      },
      users: result,
    }
  }

  public async getUserById(id: number): Promise<UserDto> {
    const user = await this.userRepository.findOne({
      where: { id: id },
    })
    if (!user) {
      throw CustomExceptionService.customError('The user with the requested identifier does not exist', HttpStatus.NOT_FOUND)
    }

    return user
  }

  public async createUser(payload: CreateUserDto): Promise<UserDto> {
    try {
      const user = await this.userRepository.findOne({
        where: [{ phone: payload.phone }, { email: payload.email }],
      })
      if (user) {
        throw CustomExceptionService.customError('User with this phone or email already exist', HttpStatus.CONFLICT)
      }

      const positions = await this.positionService.getPositionsList()
      const position = positions.find(position => position.id === payload.position_id)
      if (!positions || !position) {
        throw CustomExceptionService.customError('Position id not exsists', HttpStatus.UNPROCESSABLE_ENTITY)
      }

      // Resize and compress image from any size to 70x70
      const compressedFile = await this.imageService.compressImage(payload.photo.buffer, 70, 70)
      // Save image into S3 bucket
      const result = await this.awsS3Service.uploadFile(compressedFile as Buffer, payload.photo.mimetype)

      return await this.userRepository.save({
        name: payload.name,
        email: payload.email,
        phone: payload.phone,
        position: position.name,
        position_id: payload.position_id,
        registration_timestamp: Math.floor(Date.now() / 1000),
        photo: result.Location,
      })
    } catch (err) {
      console.log(err)
    }
  }
}
