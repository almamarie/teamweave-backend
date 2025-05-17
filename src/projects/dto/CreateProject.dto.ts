import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateProjectDto {
    @ApiProperty({
        type: String,
        description: 'First name of the project'
      })
      @IsString()
    @IsNotEmpty()
        name:string

    @ApiProperty({
        type: String,
        description: 'First description of the user'
      })
      @IsString()
    @IsNotEmpty()
    description: string;

    @ApiProperty({
        type: String,
        description: 'First visibility of the user'
      })
      @IsString()
    @IsNotEmpty()
    visibility: "PUBLIC" | "PRIVATE";
}