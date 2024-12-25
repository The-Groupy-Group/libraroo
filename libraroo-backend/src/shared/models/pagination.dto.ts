import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsNumber, IsOptional } from "class-validator";

export class PaginationDto {

@IsOptional()
@IsNumber()
@ApiPropertyOptional({
  type: Number,
  description: 'Start index for pagination',
})
startIndex?: number;

@IsOptional()
@IsNumber()
@ApiPropertyOptional({
  type: Number,
  description: 'Maximum number of results to return',
})
maxResults?: number;
}