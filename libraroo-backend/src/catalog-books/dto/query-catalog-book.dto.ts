import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { PaginationDto } from 'src/shared/models/pagination.dto';

export class QueryCatalogBookDto extends PaginationDto{
  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ type: String, description: 'Author of the book' })
  authors?: string[];

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ type: String, description: 'Language of the book' })
  language?: string;

  @IsOptional()
  @IsString({ each: true })
  @ApiPropertyOptional({
    type: [String],
    description: 'Categories of the book',
  })
  categories?: string[];

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ type: String, description: 'Title of the book' })
  title?: string;


}
