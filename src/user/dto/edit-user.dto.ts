import { ApiPropertyOptional } from '@nestjs/swagger';
import { Gender } from '@prisma/client';
import { Transform } from 'class-transformer';
import { IsDate, IsEmail, IsOptional, IsString, IsUrl } from 'class-validator';

export class EditUserDto {
 @ApiPropertyOptional({
       type: String,
       description: 'First name of the user'
     })
     @IsString()
     @IsOptional()
     firstName: string;
   
     @ApiPropertyOptional({
       type: String,
       description: 'Last name of the user'
     })
     @IsString()
     @IsOptional()
     lastName: string;
   
     @ApiPropertyOptional({
       type: String,
       description: 'Other names of the user'
     })
     @IsString()
     @IsOptional()
     otherNames: string;
   
   
  @IsDate()
         @Transform(({value}) => {
           try {
             return new Date(value);
           } catch (error) {
             return null;
             }
           })
     @IsOptional()
     @ApiPropertyOptional({
       type: Date,
       description: 'The date of birth of the user'
     })
     dateOfBirth: Date;
   
   
     @IsString()
     @IsOptional()
    //  @Transform(({ value }) => {
    //   try { 
    //     if (typeof value === 'string')
    //       return null
  
    //     if (value.toUpperCase() === "MALE") {
    //       return Gender.male
    //     }
  
    //     if (value.toUpperCase() === "FEMALE") {
    //       return Gender.female
    //     }
  
    //     return null;
    //   }
    //   catch (error) {
    //     return null;
    //   }
    // })
     @ApiPropertyOptional({
       type: String,
       description: 'The gender of the user'
     })
     gender: string;
   
   
     @IsString()
     @IsOptional()
     @ApiPropertyOptional({
       type: String,
       description: 'The bio of the user'
     })
     bio: string;
   
     @IsString()
     @IsOptional()
     @ApiPropertyOptional({
       type: String,
       description: 'The twitter url of the user'
     })
     twitterLink?: string;
   
     @IsString()
     @IsOptional()
     @ApiPropertyOptional({
       type: String,
       description: 'The twitter url of the user'
     })
       linkedinLink?: string;
     
     @IsString()
     @IsOptional()
     @ApiPropertyOptional({
       type: String,
       description: 'The twitter url of the user'
     })
     facebookLink?: string;
  
  
  @IsString()
    @IsOptional()
    @ApiPropertyOptional({
      type: String,
      description: 'The github username of the user'
    })
      githubUsername?: string;
    
    
      @IsUrl()
    @IsOptional()
    @ApiPropertyOptional({
      type: String,
      description: 'The gitlab username of the user'
    })
      gitlabUsername?: string;
    
    
      @IsUrl()
    @IsOptional()
    @ApiPropertyOptional({
      type: String,
      description: 'The website url of the user'
    })
      website?: string;
    
    @IsString()
        @IsOptional()
    @ApiPropertyOptional({
      type: String,
      description: 'The website url of the user'
    })
    location: string;
   
}
