import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class QueryCatalogBookDto {
  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    description: 'The author of the book',
    example: 'Karen',
  })
  author?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    description: 'The language of the book',
    example: 'en',
  })
  language?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    description: 'The categories of the book',
    example: ['History'],
  })
  categories?: string[];

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    description: 'The title of the book',
    example: 'Jerusalem',
  })
  title?: string;
}
