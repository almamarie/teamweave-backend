import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Gender } from "@prisma/client";
import { IsDate, IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class AuthDto {
  @ApiProperty({
    type: String,
    description: 'First name of the user'
  })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({
    type: String,
    description: 'Last name of the user'
  })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiPropertyOptional({
    type: String,
    description: 'Other names of the user'
  })
  @IsString()
  @IsOptional()
  otherNames: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: 'The email of the user'
  })
  email: string;

  @IsDate()
  @IsNotEmpty()
  @ApiProperty({
    type: Date,
    description: 'The date of birth os the user'
  })
  dateOfBirth: Date;


  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: 'The gender of the user'
  })
  gender: Gender;


  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: 'The bio of the user'
  })
  bio: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    type: String,
    description: 'The twitter url of the user'
  })
  twitterLink?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    type: String,
    description: 'The twitter url of the user'
  })
    linkedinLink?: string;
  
  @IsString()
  @IsOptional()
  @ApiProperty({
    type: String,
    description: 'The twitter url of the user'
  })
  facebookLink?: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: 'The password of the user'
  })
  password: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: 'The password of the user'
  })
  confirmPassword: string;
}
