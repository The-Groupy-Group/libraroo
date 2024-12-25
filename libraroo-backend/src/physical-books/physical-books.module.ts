import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PhysicalBook, PhysicalBookSchema } from './models/physical-book.model';
import { PhysicalBooksService } from './physical-books.service';
import { PhysicalBooksController } from './physical-books.controller';
import { PhysicalBooksRepositroy } from './physical-books.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PhysicalBook.name, schema: PhysicalBookSchema },
    ]),
  ],
  providers: [PhysicalBooksService, PhysicalBooksRepositroy],
  controllers: [PhysicalBooksController],
})
export class PhysicalBookModule {}
