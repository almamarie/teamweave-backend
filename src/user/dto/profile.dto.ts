import { JsonObject } from '@prisma/client/runtime/library';
import { Transform } from 'class-transformer';
import { IsEnum, IsJSON, IsOptional, IsString } from 'class-validator';

export class ProfileDto {
  @IsString()
  @IsOptional()
  dateOfBirth?: string;

  @IsEnum(['Male', 'Female'])
  @IsOptional()
  gender?: string;

  @IsString()
  @IsOptional()
  interest?: string;

  @IsString()
  @IsOptional()
  location?: string;

  @IsJSON()
  @Transform(({ value }) => validateAndStringifyAvatar(value))
  @IsOptional()
  avatar?: string | null;

  @IsString()
  @IsOptional()
  image?: string;

  @IsString()
  @IsOptional()
  ghanaCardImage?: string;
}

interface AvatarData {
  url: string;
  alternativeText?: string;
  width?: number;
  height?: number;
  formats?: {
    thumbnail?: { url: string; width: number; height: number };
    small?: { url: string; width: number; height: number };
    medium?: { url: string; width: number; height: number };
    large?: { url: string; width: number; height: number };
  };
}

// Function to validate and stringify avatar data
function validateAndStringifyAvatar(avatar: any): string | null {
  try {
    // Attempt to parse if it's already a string
    if (typeof avatar === 'string') {
      JSON.parse(avatar);
      return avatar;
    }

    // Validate the structure
    const validatedAvatar: AvatarData = avatar; // Type assertion

    if (typeof validatedAvatar.url !== 'string' || !validatedAvatar.url) {
      throw new Error('Invalid URL');
    }

    if (validatedAvatar.formats) {
      for (const format in validatedAvatar.formats) {
        if (validatedAvatar.formats[format]) {
          if (typeof validatedAvatar.formats[format].url !== 'string' || !validatedAvatar.formats[format].url) {
            throw new Error(`Invalid URL for format ${format}`);
          }
        }
      }
    }

    return JSON.stringify(validatedAvatar);
  } catch (error) {
    console.error('Invalid avatar data:', error.message);
    return null; // Or throw an exception if you prefer
  }
}
