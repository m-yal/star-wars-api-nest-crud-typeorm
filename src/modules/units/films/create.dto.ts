import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumberString, IsString } from 'class-validator';

import { CreateUnitDto } from '../config/dto/ create.unit.dto';

export class CreateFilmDto implements CreateUnitDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'A New Film', description: 'Film name' })
  name: string;

  @IsNumberString()
  @ApiProperty({ example: '444', description: 'Film episode number' })
  episode_id: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'It is a period of civil war. ...',
    description: 'Film opening crawl',
  })
  opening_crawl: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'George Lucas', description: 'Film director' })
  director: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'Gary Kurtz, Rick McCallum',
    description: 'Film producer',
  })
  producer: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: '1977-05-25', description: 'Film release date' })
  release_date: string;

  @IsNotEmpty()
  @ApiProperty({
    example: '["Tion Medon", "Jocasta Nu"]',
    description: 'Array of people names',
  })
  @IsString({ each: true })
  characters: string[];

  @IsNotEmpty()
  @ApiProperty({
    example: '["Tatooine"]',
    description: 'Array of planet names',
  })
  @IsString({ each: true })
  planets: string[];

  @IsNotEmpty()
  @ApiProperty({
    example: '["Slave 1"]',
    description: 'Array of starships names',
  })
  @IsString({ each: true })
  starships: string[];

  @IsNotEmpty()
  @ApiProperty({
    example: '["Vulture Droid"]',
    description: 'Array of vehicles names',
  })
  @IsString({ each: true })
  vehicles: string[];

  @IsNotEmpty()
  @ApiProperty({
    example: '["Human"]',
    description: 'Array of species names',
  })
  @IsString({ each: true })
  species: string[];

  @IsNotEmpty()
  @ApiProperty({
    example: '[]',
    description: 'Array of images names for relations binding',
  })
  @IsString({ each: true })
  images: string[];
}