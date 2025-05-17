import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UpdateProjectDto {
    @ApiProperty({
        type: String,
        description: 'First name of the project'
      })
      @IsString()
    @IsOptional()
        name:string

    @ApiProperty({
        type: String,
        description: 'First description of the user'
      })
      @IsString()
    @IsOptional()
    description: string;

    // @ApiProperty({
    //     type: String,
    //     description: 'First visibility of the user'
    //   })
    //   @IsString()
    // @IsOptional()
    // visibility: "PUBLIC" | "PRIVATE";
}