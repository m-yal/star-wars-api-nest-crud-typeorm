import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumberString, IsString } from 'class-validator';

export class CreateVehicleDto {

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'New Snowspeeder', description: 'Vehicle name' })
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 't-47 airspeeder', description: 'Vehicle model' })
  model: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Incom corporation',
    description: 'Vehicle manufacturer',
  })
  manufacturer: string;

  @IsNumberString()
  @IsNotEmpty()
  @ApiProperty({ example: '10', description: 'Vehicle cost' })
  cost_in_credits: string;

  @IsNumberString()
  @IsNotEmpty()
  @ApiProperty({ example: '4.5', description: 'Vehicle length' })
  length: string;

  @IsNumberString()
  @IsNotEmpty()
  @ApiProperty({
    example: '650',
    description: 'Vehicle max atmosphering speed',
  })
  max_atmosphering_speed: string;

  @IsNumberString()
  @IsNotEmpty()
  @ApiProperty({ example: '2', description: 'Vehicle crew' })
  crew: string;

  @IsNumberString()
  @IsNotEmpty()
  @ApiProperty({ example: '0', description: 'Vehicle passengers' })
  passengers: string;

  @IsNumberString()
  @IsNotEmpty()
  @ApiProperty({ example: '10', description: 'Vehicle cargo capacity' })
  cargo_capacity: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'none', description: 'Vehicle consumables' })
  consumables: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'airspeeder', description: 'Vehicle vehicle class' })
  vehicle_class: string;

  @IsString({ each: true })
  @ApiProperty({
    example: '["Grievous"]',
    description: 'Array of pilots names',
  })
  pilots: string[];

  @IsString({ each: true })
  @ApiProperty({
    example: '["Attack of the Clones", "Revenge of the Sith"]',
    description: 'Array of films names',
  })
  films: string[];

  @IsString({ each: true })
  @ApiProperty({
    example: '[]',
    description: 'Array of images names',
  })
  images: string[];
}