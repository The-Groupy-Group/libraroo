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
import { AuthGuard } from 'src/shared/guards/auth/auth.guard';
import { QueryCatalogBookDto } from './dto/query-catalog-book.dto';
import { QueryOptions } from 'src/shared/models/query-options';

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
    name: 'QueryOptions',
    required: false,
    type: QueryCatalogBookDto,
    description: 'options of the query',
    example: { author: 'Karen', categroeies: ['History'], language: 'en' },
  })
  @ApiInternalServerErrorResponse()
  async getBooksByQueries(
    @Query() queryCatalogBookDto: QueryOptions<QueryCatalogBookDto>,
  ) {
    return await this.catalogBooksService.getBooksByQueries(
      queryCatalogBookDto,
    );
  }
}
