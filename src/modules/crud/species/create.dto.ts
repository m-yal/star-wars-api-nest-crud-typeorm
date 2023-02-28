import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumberString, IsOptional, IsString } from 'class-validator';
import { CreateUnitDto } from '../config/dto/ create.unit.dto';

export class CreateSpeciesDto extends CreateUnitDto {

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: 'Barbarian', description: 'Specie name' })
    name: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: 'mammal', description: 'Specie classification' })
    classification: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: 'sentient', description: 'Specie designation' })
    designation: string;

    @IsNumberString()
    @IsNotEmpty()
    @ApiProperty({
        example: '180',
        description: 'Specie average height',
    })
    average_height: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        example: 'caucasian, black, asian, hispanic',
        description: 'Specie skin color',
    })
    skin_colors: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        example: 'blonde, brown, black, red',
        description: 'Specie hair color',
    })
    hair_colors: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        example: 'brown, blue, green, hazel, grey, amber',
        description: 'Specie eye color',
    })
    eye_colors: string;

    @IsNumberString()
    @IsNotEmpty()
    @ApiProperty({
        example: '120',
        description: 'Specie average lifespan',
    })
    average_lifespan: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        example: 'Galactic Basic',
        description: 'Specie language',
    })
    language: string;

    @IsString()
    @ApiProperty({
        example: "",
        description: 'Planet name',
    })
    homeworld: string;

    @IsString({ each: true })
    @ApiProperty({
        example: '["Grievous"]',
        description: 'Array of films ids',
    })
    people: string[];

    @IsString({ each: true })
    @ApiProperty({
        example: '["Revenge of the Sith"]',
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