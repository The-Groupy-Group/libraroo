import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BooksApiService {
  key: string;
  baseUrl: string;
  axios: AxiosInstance;
  constructor() {
    this.key = process.env.API_KEY;
    this.baseUrl = process.env.API_BASE_URL;
    this.axios = axios.create({
      baseURL: this.baseUrl,
    });
  }
  async findByTitleAuthorAndLanguage(
    author: string,
    title: String,
    langCode: string,
  ): Promise<AxiosResponse> {
    const route =
      '?q=' +
      'inauthor:"' +
      author +
      '"' +
      '+intitle:"' +
      title +
      '"' +
      '&langRestrict=' +
      langCode +
      '&key=' +
      this.key;
    return await this.axios.get(route);
  }
}
