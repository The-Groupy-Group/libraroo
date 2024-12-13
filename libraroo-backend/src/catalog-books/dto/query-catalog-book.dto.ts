import { IsNumber, IsOptional, IsString } from "class-validator";

export class QueryCatalogBookDto{
    @IsOptional()
    @IsString()
    author?: string;
  
    @IsOptional()
    @IsString()
    language?: string;

    @IsOptional()
    @IsString()
    categories?: string[];

    @IsOptional()
    @IsString()
    title?: string;

    @IsOptional()
    @IsNumber()
    startIndex?:number;

    @IsOptional()
    @IsNumber()
    maxResults?:number;
    
}