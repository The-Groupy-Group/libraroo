import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { FilterQuery } from 'mongoose';

export class QueryOptions<T> {
  @IsOptional()
  @ApiPropertyOptional({
    description: 'limit',
    example: 5,
  })
  maxResults?: number;

  @IsOptional()
  @ApiPropertyOptional({
    description: 'limit',
    example: 5,
  })
  startIndex?: number;

  @IsOptional()
  @ApiPropertyOptional({
    description: 'sort',
    example: 5,
  })
  sort?: { [key: string]: 1 | -1 };
  
  queries?: T;

  filter?: FilterQuery<T>;
}
