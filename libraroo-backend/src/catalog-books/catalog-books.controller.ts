import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiExtraModels,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiQuery,
  ApiResponse,
} from '@nestjs/swagger';
import { CatalogBooksService } from './catalog-books.service';
import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { CatalogBookDto } from './dto/catalog-book.dto';
import { CreateCatalogBookDto } from './dto/create-catalog-book.dto';
import { AuthGuard } from '../shared/guards/auth/auth.guard';
import { QueryCatalogBookDto } from './dto/query-catalog-book.dto';

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

  @Get()
  @ApiOperation({ summary: 'get books by queries' })
  @ApiResponse({
    description: 'CatalogBookDto',
    type: CatalogBookDto,
    isArray: true,
  })
  @ApiExtraModels(QueryCatalogBookDto)
  @ApiQuery({
    name: 'query',
    required: false,
    type: QueryCatalogBookDto,
    description: 'The query for books to find',
  })
  @ApiInternalServerErrorResponse()
  async getBooksByQueries(@Query() queryCatalogBookDto: QueryCatalogBookDto) {
    return await this.catalogBooksService.getBooksByQueries(
      queryCatalogBookDto,
    );
  }
}
