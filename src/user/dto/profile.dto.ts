import { ApiPropertyOptional } from '@nestjs/swagger';
import { Gender } from '@prisma/client';
import { JsonObject } from '@prisma/client/runtime/library';
import { Transform } from 'class-transformer';
import { IsDate, IsEmail, IsEnum, IsJSON, IsOptional, IsString } from 'class-validator';

export class ProfileDto {
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
  
    @IsEmail()
    @IsOptional()
    @ApiPropertyOptional({
      type: String,
      description: 'The email of the user'
    })
    email: string;
  
    @IsDate()
    @IsOptional()
    @ApiPropertyOptional({
      type: Date,
      description: 'The date of birth of the user'
    })
    dateOfBirth: Date;
  
  
    @IsString()
    @IsOptional()
    @ApiPropertyOptional({
      type: String,
      description: 'The gender of the user'
    })
    gender: Gender;
  
  
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
  
  
  // @IsJSON()
  // @Transform(({ value }) => validateAndStringifyAvatar(value))
  // @IsOptional()
  // avatar?: string | null;
}

// interface AvatarData {
//   url: string;
//   alternativeText?: string;
//   width?: number;
//   height?: number;
//   formats?: {
//     thumbnail?: { url: string; width: number; height: number };
//     small?: { url: string; width: number; height: number };
//     medium?: { url: string; width: number; height: number };
//     large?: { url: string; width: number; height: number };
//   };
// }

// // Function to validate and stringify avatar data
// function validateAndStringifyAvatar(avatar: any): string | null {
//   try {
//     // Attempt to parse if it's already a string
//     if (typeof avatar === 'string') {
//       JSON.parse(avatar);
//       return avatar;
//     }

//     // Validate the structure
//     const validatedAvatar: AvatarData = avatar; // Type assertion

//     if (typeof validatedAvatar.url !== 'string' || !validatedAvatar.url) {
//       throw new Error('Invalid URL');
//     }

//     if (validatedAvatar.formats) {
//       for (const format in validatedAvatar.formats) {
//         if (validatedAvatar.formats[format]) {
//           if (typeof validatedAvatar.formats[format].url !== 'string' || !validatedAvatar.formats[format].url) {
//             throw new Error(`Invalid URL for format ${format}`);
//           }
//         }
//       }
//     }

//     return JSON.stringify(validatedAvatar);
//   } catch (error) {
//     console.error('Invalid avatar data:', error.message);
//     return null; // Or throw an exception if you prefer
//   }
// }
