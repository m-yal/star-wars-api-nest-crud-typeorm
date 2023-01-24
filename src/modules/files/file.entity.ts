import { ApiProperty } from '@nestjs/swagger';
import { Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Files {
  @ApiProperty({
    example: '3ee1db5a-b671-496b-8772-d8ba9cafa815.png',
    description: 'Film name',
  })
  @PrimaryColumn({ type: "varchar" })
  name: string;
}