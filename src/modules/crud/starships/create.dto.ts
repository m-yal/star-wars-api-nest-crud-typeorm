import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsNumberString, IsString, Length } from 'class-validator';

export class CreateStarshipDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'P-wing', description: 'Starship name' })
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'T-65 X-wing', description: 'Starship model' })
  model: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Incom Corporation',
    description: 'Starship manufacturer',
  })
  manufacturer: string;

  @IsNumberString()
  @IsNotEmpty()
  @ApiProperty({
    example: '149999',
    description: 'Starship cost',
  })
  cost_in_credits: string;

  @IsNumberString()
  @IsNotEmpty()
  @ApiProperty({
    example: '12.5',
    description: 'Starship length',
  })
  length: string;

  @IsNumberString()
  @IsNotEmpty()
  @ApiProperty({
    example: '1050',
    description: 'Starship max speed',
  })
  max_atmosphering_speed: string;

  @IsNumberString()
  @IsNotEmpty()
  @ApiProperty({
    example: '1',
    description: 'Starship crew',
  })
  crew: string;

  @IsNumberString()
  @IsNotEmpty()
  @ApiProperty({
    example: '0',
    description: 'Starship passengers',
  })
  passengers: string;

  @IsNumberString()
  @IsNotEmpty()
  @ApiProperty({
    example: '110',
    description: 'Starship capacity',
  })
  cargo_capacity: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: '1 week',
    description: 'Starship consumables',
  })
  consumables: string;

  @IsNumberString()
  @IsNotEmpty()
  @ApiProperty({
    example: '1.0',
    description: 'Starship rating',
  })
  hyperdrive_rating: string;

  @IsNumberString()
  @IsNotEmpty()
  @ApiProperty({
    example: '100',
    description: 'Starship MGLT',
  })
  MGLT: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Starfighter',
    description: 'Starship class',
  })
  starship_class: string;

  @IsString({ each: true })
  @ApiProperty({
    example: '["Obi-Wan Kenobi", "Grievous"]',
    description: 'Array of pilots ids',
  })
  pilots: string[];

  @IsString({ each: true })
  @ApiProperty({
    example: '["Attack of the Clones"]',
    description: 'Array of films ids',
  })
  films: string[];

  @IsString({ each: true })
  @ApiProperty({
    example: '[]',
    description: 'Array of images names',
  })
  images: string[];
}