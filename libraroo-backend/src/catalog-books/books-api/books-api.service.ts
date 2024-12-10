import axios, { AxiosInstance } from 'axios';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BooksApiService {
  key:string;
  axios:AxiosInstance
  constructor() {
    this.key=process.env.API_KEY
   this.axios=axios.create({
      baseURL: process.env.BASE_API_URL,
    });
  }
  async findByTitleAndAuthor(author:string,title:String):Promise<any> {//TODO write a type
   const route= '?'+'author='+author+'&title='+title+'&maxResults=1'+'&key='+this.key;
   const res=this.axios.get(route);
  }
}
