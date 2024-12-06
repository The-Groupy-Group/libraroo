import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PhysicalBook, PhysicalBookSchema } from './models/physical-book.model';
//import { PhysicalBookService } from './physical-book.service';
//import { PhysicalBookController } from './physical-book.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PhysicalBook.name, schema: PhysicalBookSchema },
    ]),
  ],
  // providers: [PhysicalBookService],
  //controllers: [PhysicalBookController],
})
export class PhysicalBookModule {}
