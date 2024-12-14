import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
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
  @ApiQuery({
    name: 'author',
    required: false,
    type: String,
    description: 'The author of the book',
  })
  @ApiQuery({
    name: 'title',
    required: false,
    type: String,
    description: 'The title of the book',
  })
  @ApiQuery({
    name: 'language',
    required: false,
    type: String,
    description: 'The language of the book',
  })
  @ApiQuery({
    name: 'categories',
    required: false,
    type: [String],
    description: 'The categories of the book',
  })
  @ApiQuery({
    name: 'startIndex',
    required: false,
    type: Number,
    description: 'The start index for pagination',
  })
  @ApiQuery({
    name: 'maxResults',
    required: false,
    type: Number,
    description: 'The maximum number of results to return',
  })
  @ApiInternalServerErrorResponse()
  async getBooksByQueries(@Query() queryCatalogBookDto: QueryCatalogBookDto) {
    const options: QueryOptions = {
      startIndex: queryCatalogBookDto.startIndex || 0,
      maxResults: queryCatalogBookDto.maxResults || 10,
    };
    return await this.catalogBooksService.getBooksByQueries(
      queryCatalogBookDto,
      options,
    );
  }
}
