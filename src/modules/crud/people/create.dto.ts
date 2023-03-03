import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsNumberString, IsOptional, IsString } from 'class-validator';
import { CreateUnitDto } from '../config/dto/ create.unit.dto';

export class CreatePeopleDto implements CreateUnitDto {

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Tion Medon', description: 'People name' })
  name: string;

  @IsNumberString({}, {message: "Height field is not a number string!"})
  @ApiProperty({ example: '172', description: 'People height' })
  @IsNotEmpty()
  height: string;

  @IsNumberString()
  @ApiProperty({ example: '77', description: 'People mass' })
  @IsNotEmpty()
  mass: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'blond', description: 'People hair color' })
  hair_color: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'fair', description: 'People skin color' })
  skin_color: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'blue', description: 'People eye color' })
  eye_color: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: '19BBY', description: 'People birth year' })
  birth_year: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'male', description: 'People gender' })
  gender: string;

  @IsNotEmpty()
  @ApiProperty({
    example: '["Revenge of the Sith"]',
    description: 'Array of films ids',
  })
  @IsString({ each: true })
  films: string[];

  @IsNotEmpty()
  @ApiProperty({
    example: '["Pau\'an"]',
    description: 'Array of species ids',
  })
  @IsString({ each: true })
  species: string[];

  @IsNotEmpty()
  @ApiProperty({
    example: '["Tsmeu-6 personal wheel bike"]',
    description: 'Array of vehicles ids',
  })
  @IsString({ each: true })
  vehicles: string[];

  @IsNotEmpty()
  @ApiProperty({
    example: '["Belbullab-22 starfighter"]',
    description: 'Array of starships ids',
  })
  @IsString({ each: true })
  starships: string[];

  @IsNotEmpty()
  @ApiProperty({
    example: '[]',
    description: 'Array of images names',
  })
  @IsString({ each: true })
  images: string[];
}