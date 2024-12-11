import { Module } from '@nestjs/common';
import { CatalogBooksController } from './catalog-books.controller';
import { CatalogBooksService } from './catalog-books.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CatalogBook, CatalogBookSchema } from './models/catalog-book.model';
import { CatalogBooksRepository } from './catalog-books.repository';
import { BooksApiService } from './books-api/books-api.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule, ConfigService } from '@nestjs/config';

const googleApiUrl = process.env.GOOGLE_API_BASE_URL;
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CatalogBook.name, schema: CatalogBookSchema },
    ]),
    HttpModule.registerAsync({
      imports: [ConfigModule], // Ensure ConfigModule is available
      useFactory: async (configService: ConfigService) => ({
        baseURL: configService.get<string>('GOOGLE_API_BASE_URL'),
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [CatalogBooksController],
  providers: [CatalogBooksService, CatalogBooksRepository, BooksApiService],
})
export class CatalogBooksModule {}
