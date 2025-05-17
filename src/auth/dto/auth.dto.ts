import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Gender } from "@prisma/client";
import { Transform } from "class-transformer";
import { IsArray, IsDate, IsEmail, IsNotEmpty, IsOptional, IsString, IsUrl } from "class-validator";

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
  @Transform(({value}) => {
    try {
      return new Date(value);
    } catch (error) {
      return null;
      }
    })
  @IsNotEmpty()
  @ApiProperty({
    type: Date,
    description: 'The date of birth of the user'
  })
  dateOfBirth: Date;


  @IsString()
  @Transform(({ value }) => {
    console.log("DTO Gender check: ", value)
    try { 
      if (typeof value !== 'string')
        return null

      if (value.toUpperCase() === "MALE") {
        return Gender.male
      }

      if (value.toUpperCase() === "FEMALE") {
        return Gender.female
      }

      return null;
    }
    catch (error) {
      return null;
    }
  })
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: 'The gender of the user'
  })
  gender: string;


  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: 'The bio of the user'
  })
  bio: string;

  @IsUrl()
  @IsOptional()
  @ApiProperty({
    type: String,
    description: 'The twitter url of the user'
  })
  twitterLink?: string;

  @IsUrl()
  @IsOptional()
  @ApiProperty({
    type: String,
    description: 'The linkedIn url of the user'
  })
    linkedinLink?: string;
  
  @IsUrl()
  @IsOptional()
  @ApiProperty({
    type: String,
    description: 'The facebook url of the user'
  })
  facebookLink?: string;


  @IsString()
  @IsOptional()
  @ApiProperty({
    type: String,
    description: 'The github username of the user'
  })
    githubUsername?: string;
  
  
    @IsUrl()
  @IsOptional()
  @ApiProperty({
    type: String,
    description: 'The gitlab username of the user'
  })
    gitlabUsername?: string;
  
  
    @IsUrl()
  @IsOptional()
  @ApiProperty({
    type: String,
    description: 'The website url of the user'
  })
    website?: string;
  
  @IsString()
      @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: 'The website url of the user'
  })
  location: string;


  @IsArray()
    @IsString({ each: true })
  @ApiProperty({
    type: [String],
    description: 'The website url of the user'
  })
  skills?: string[];

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
