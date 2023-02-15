import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumberString, IsString, } from 'class-validator';

export class CreatePlanetDto {

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'The Earth', description: 'Planet name' })
  name: string;

  @IsNumberString()
  @IsNotEmpty()
  @ApiProperty({ example: '23', description: 'Planet rotation period' })
  rotation_period: string;

  @IsNumberString()
  @IsNotEmpty()
  @ApiProperty({ example: '304', description: 'Planet orbital period' })
  orbital_period: string;

  @IsNumberString()
  @IsNotEmpty()
  @ApiProperty({ example: '10465', description: 'Planet diameter' })
  diameter: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'arid', description: 'Planet climate' })
  climate: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: '1 standard', description: 'Planet gravity' })
  gravity: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'desert', description: 'Planet terrain' })
  terrain: string;

  @IsNumberString()
  @IsNotEmpty()
  @ApiProperty({ example: '1', description: 'Planet surface water' })
  surface_water: string;

  @IsNumberString()
  @IsNotEmpty()
  @ApiProperty({ example: '200000', description: 'Planet population' })
  population: string;

  @ApiProperty({
    example: '["Sly Moore"]',
    description: 'Array of people names',
  })
  residents: string[];

  @ApiProperty({
    example: '["Revenge of the Sith", "A New Hope"]',
    description: 'Array of films names',
  })
  films: string[];

  @ApiProperty({
    example: '[]',
    description: 'Array of images names',
  })
  images: string[];
}