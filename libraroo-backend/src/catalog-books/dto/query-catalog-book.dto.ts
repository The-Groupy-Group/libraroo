import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString } from "class-validator";

export class QueryCatalogBookDto {
    @IsOptional()
    @IsString()
    @ApiPropertyOptional({ type: String, description: 'Author of the book' })
    author?: string;

    @IsOptional()
    @IsString()
    @ApiPropertyOptional({ type: String, description: 'Language of the book' })
    language?: string;

    @IsOptional()
    @IsString({ each: true })
    @ApiPropertyOptional({ type: [String], description: 'Categories of the book' })
    categories?: string[];

    @IsOptional()
    @IsString()
    @ApiPropertyOptional({ type: String, description: 'Title of the book' })
    title?: string;

    @IsOptional()
    @IsNumber()
    @ApiPropertyOptional({ type: Number, description: 'Start index for pagination' })
    startIndex?: number;

    @IsOptional()
    @IsNumber()
    @ApiPropertyOptional({ type: Number, description: 'Maximum number of results to return' })
    maxResults?: number;
}
