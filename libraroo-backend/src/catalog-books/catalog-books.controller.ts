import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOperation,
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
