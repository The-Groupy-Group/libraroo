import { ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { CatalogBooksService } from './catalog-books.service';
import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { CatalogBookDto } from './dto/catalog-book.dto';
import { CreateCatalogBookDto } from './dto/create-catalog-book.dto';

@Controller('catalog-books')
export class CatalogBooksController {
  constructor(private readonly catalogBooksService: CatalogBooksService) {}

  @Post()
  @ApiOperation({ summary: 'create new catalog book' })
  @ApiCreatedResponse({
    description: 'CatalogBookDto',
    type: CatalogBookDto,
  })
  async create(@Body(ValidationPipe) createCatalogBookDto: CreateCatalogBookDto) {
    return await this.catalogBooksService.create(createCatalogBookDto);
  }
}
