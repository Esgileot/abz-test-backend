import { Controller, Get, Inject } from '@nestjs/common'
import { ApiConsumes, ApiOkResponse, ApiOperation, ApiUnprocessableEntityResponse } from '@nestjs/swagger'
import { PositionResponseDto } from './dto/position-response.dto'
import { PositionService } from './position.service'

@Controller('positions')
export class PositionController {
  constructor(@Inject(PositionService) private readonly positionService: PositionService) {}

  @Get()
  @ApiConsumes('application/json')
  @ApiOkResponse({
    status: 200,
    type: PositionResponseDto,
    description: 'Returns a list of all available users positions.',
  })
  @ApiUnprocessableEntityResponse({ description: 'Positions not found' })
  @ApiOperation({ summary: 'Returns a list of all available users positions.' })
  public async getRegistrationToken(): Promise<PositionResponseDto> {
    const position = await this.positionService.getPositionsList()
    return { position: position }
  }
}
