import { IsNotEmpty, IsString } from "class-validator";

export class ImageNameDto {
    @IsString()
    @IsNotEmpty()
    imageName: string;
}