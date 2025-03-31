import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class NewAdminDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: 'The first name of the admin user'
  })
  firstName: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: 'The last name of the admin user'
  })
  lastName: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    type: String,
    description: 'The other names of the admin user'
  })
  otherNames: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: 'The email of the admin user'
  })
  email: string;
}
