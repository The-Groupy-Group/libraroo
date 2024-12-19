import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { BooksApiResponse } from './types/books-api.types';
import { firstValueFrom } from 'rxjs';

const MAX_PAGINATION = 40; //the api's limit
@Injectable()
export class BooksApiService {
  private key: string;
  private logger: Logger = new Logger(BooksApiService.name);
  constructor(private readonly httpService: HttpService) {
    this.key = process.env.GOOGLE_API_KEY;
  }

  async findByTitleAuthorAndLanguage(
    author: string,
    title: string,
    langCode: string,
  ): Promise<BooksApiResponse> {
    const route = `/books/v1/volumes?q=inauthor:"${author}"+intitle:"${title}"&langRestrict=${langCode}&maxResults=${MAX_PAGINATION}`;
    this.logger.log(`calling book api via route: ${route}`);
    try {
      const res = await firstValueFrom(
        this.httpService.get<BooksApiResponse>(`${route}&key=${this.key}`),
      );
      return res.data;
    } catch {
      throw new InternalServerErrorException('Something went wrong');
    }
  }
}
