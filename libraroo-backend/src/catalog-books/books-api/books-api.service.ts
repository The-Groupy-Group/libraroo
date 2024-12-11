import { BadRequestException, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Books } from './types/books-api.types';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class BooksApiService {
  key: string;
  baseUrl: string;
  constructor(private readonly httpService: HttpService) {
    this.key = process.env.GOOGLE_API_KEY;
  }
  async findByTitleAuthorAndLanguage(
    author: string,
    title: String,
    langCode: string,
  ): Promise<Books> {
    const route = `?q=inauthor:"${author}"+intitle:"${title}"&langRestrict=${langCode}&key=${this.key}`;

    try {
      const res = await firstValueFrom(this.httpService.get(route));
      return res.data;
    } catch (error) {
      console.log(error);
      throw new BadRequestException('api encountered an error');
    }
  }
}
