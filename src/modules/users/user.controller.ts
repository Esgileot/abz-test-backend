import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Inject,
  Param,
  ParseFilePipe,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiConflictResponse,
  ApiConsumes,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger'
import { AuthGuard } from '../auth/auth.guard'
import { CustomExceptionService } from '../shared/custom-exception.service'
import { CreateUserDto } from './dto/createUser.dto'
import { UserDto } from './dto/user.dto'
import { UserQueryDto } from './dto/userQuery.dto'
import { UsersResponseDto } from './dto/usersResponseDto'
import { validationPipes } from './file-validation.pipes'
import { UserService } from './user.service'

@Controller('users')
export class UserController {
  constructor(@Inject(UserService) private readonly userService: UserService) {}

  @Get()
  @ApiOkResponse({
    status: 200,
    type: UsersResponseDto,
    description:
      'Returns users data from a database divided into pages and sorted by creation date in the descending order. You can specify the parameters such as **count**, **offset** and **page**, which correspond to the number of users on the page, missing record number and page number. If you specify the **offset** parameter, the **page** parameter will be ignored. To navigate through the pages, you can use the links in the servers response: next_link to go to the next page and prev_link to return to the previous page. If the next or previous page does not exist, the next_link/prev_link parameter will be set to null',
  })
  @ApiBadRequestResponse({ description: 'Page not found' })
  @ApiUnprocessableEntityResponse({ description: 'Validation failed' })
  @ApiOperation({ summary: 'Get a list of users with pagination' })
  public async getUsersPagination(@Query() userQuery: UserQueryDto): Promise<UsersResponseDto> {
    return await this.userService.getUsersPagination(userQuery)
  }

  @Get(':id')
  @ApiOkResponse({
    status: 200,
    type: UserDto,
    description:
      'Returns users data from a database divided into pages and sorted by creation date in the descending order. You can specify the parameters such as **count**, **offset** and **page**, which correspond to the number of users on the page, missing record number and page number. If you specify the **offset** parameter, the **page** parameter will be ignored. To navigate through the pages, you can use the links in the servers response: next_link to go to the next page and prev_link to return to the previous page. If the next or previous page does not exist, the next_link/prev_link parameter will be set to null',
  })
  @ApiBadRequestResponse({ description: 'The user_id must be an integer' })
  @ApiNotFoundResponse({ description: 'The user with the requested identifier does not exist' })
  @ApiOperation({ summary: 'Get user by provided id' })
  public getUserById(@Param('id') id: number) {
    return this.userService.getUserById(id)
  }

  @Post()
  @ApiBearerAuth('Token')
  @UseGuards(AuthGuard)
  @ApiCreatedResponse({
    status: 201,
    type: UserDto,
    description: 'Create a new user in the database according to the provided data.',
  })
  @ApiOperation({ summary: 'Create a new user in the database according to the provided data.' })
  @ApiUnauthorizedResponse({ description: 'The token expired.' })
  @ApiConflictResponse({ description: 'User with this phone or email already exist' })
  @ApiUnprocessableEntityResponse({ description: 'Validation failed' })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('photo'))
  public async createUser(
    @Body() payload: CreateUserDto,
    @UploadedFile(
      new ParseFilePipe({
        exceptionFactory(error) {
          CustomExceptionService.customError('Validation failed', HttpStatus.UNPROCESSABLE_ENTITY, { photo: [error] })
        },
        validators: [...validationPipes],
      }),
    )
    photo: Express.Multer.File,
  ) {
    return this.userService.createUser({ ...payload, photo: photo })
  }
}
