import {
  Body,
  Controller,
  Post,
  UseGuards,
  ValidationPipe,
  Request,
} from '@nestjs/common';
import { AuthGuard } from '../shared/guards/auth/auth.guard';
import { PhysicalBooksService } from './physical-books.service';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { CreatePhysicalBookDto } from './dto/create-physical-book.dto';
import { PhysicalBookDto } from './dto/physical-book.dto';
import { ApiRequest } from 'src/shared/models/api-request';

@UseGuards(AuthGuard)
@Controller('physical-books')
export class PhysicalBooksController {
  constructor(private readonly PhysicalBookService: PhysicalBooksService) {}

  @Post()
  @ApiOperation({ summary: 'create new physical book' })
  @ApiCreatedResponse({
    description: 'PhysicalBookDto',
    type: PhysicalBookDto,
  })
  @ApiBadRequestResponse()
  async create(
    @Request() request: ApiRequest,
    @Body(ValidationPipe) CreatePhysicalBookDto: CreatePhysicalBookDto,
  ) {
    return await this.PhysicalBookService.create(
      request.jwtPayLoad.sub,
      CreatePhysicalBookDto,
    );
  }
}
