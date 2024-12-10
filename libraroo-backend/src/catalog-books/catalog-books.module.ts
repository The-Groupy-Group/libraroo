import { Module } from '@nestjs/common';
import { CatalogBooksController } from './catalog-books.controller';
import { CatalogBooksService } from './catalog-books.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CatalogBook, CatalogBookSchema } from './models/catalog-book.model';
import { CatalogBooksRepository } from './catalog-books.repository';
import { BooksApiService } from './books-api/books-api.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CatalogBook.name, schema: CatalogBookSchema },
    ]),
  ],
  controllers: [CatalogBooksController],
  providers: [CatalogBooksService, CatalogBooksRepository, BooksApiService],
})
export class CatalogBooksModule {}
