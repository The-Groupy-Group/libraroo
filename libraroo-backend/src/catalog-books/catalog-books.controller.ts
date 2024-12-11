import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { CatalogBooksService } from './catalog-books.service';
import {
  Body,
  Controller,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { CatalogBookDto } from './dto/catalog-book.dto';
import { CreateCatalogBookDto } from './dto/create-catalog-book.dto';
import { AuthGuard } from 'src/shared/guards/auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('catalog-books')
export class CatalogBooksController {
  constructor(private readonly catalogBooksService: CatalogBooksService) {}

  @Post()
  @ApiOperation({ summary: 'create new catalog book' })
  @ApiCreatedResponse({
    description: 'CatalogBookDto',
    type: CatalogBookDto,
  })
  @ApiBadRequestResponse()
  async create(
    @Body(ValidationPipe) createCatalogBookDto: CreateCatalogBookDto,
  ) {
    return await this.catalogBooksService.create(createCatalogBookDto);
  }
}
