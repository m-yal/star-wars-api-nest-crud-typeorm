import { ApiProperty } from '@nestjs/swagger';
import { Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: "files" })
export class File {
    @ApiProperty({
      description: `Id of image`
    })
    @PrimaryGeneratedColumn("increment")
    id?: number;

    @ApiProperty({
        example: '3ee1db5a-b671-496b-8772-d8ba9cafa815.png',
        description: 'File name',
    })
    @PrimaryColumn({ type: "varchar" })
    name: string;
}