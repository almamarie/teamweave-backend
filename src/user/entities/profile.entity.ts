import { ApiProperty } from '@nestjs/swagger';

export class ProfileEntity {
  @ApiProperty({
    description: 'The ID of the user who owns this profile',
    example: 'ckue89r3400001hjgk91i3rcg'
  })
  userId: string;

  @ApiProperty({
    description: "The user's date of birth",
    example: '19-03-1956'
  })
  dateOfBirth: string;

  @ApiProperty({
    description: 'The Gender of the user',
    example: 'Male'
  })
  gender: string;

  @ApiProperty({
    description: 'The interest of the user',
    example: 'I love to party'
  })
  interest: string;

  @ApiProperty({
    description: 'Location of the user',
    example: 'Accra'
  })
  location: string;

  @ApiProperty({
    description: 'The prefered avatar of the user',
    example: 'Json object'
  })
  avatar: string;

  @ApiProperty({
    description: 'Image of the user',
    example: 'http://www.images.com/images/w9ey89w8w98wyw8yw9'
  })
  image: string;

  @ApiProperty({
    description: "Image of the user's Ghana Card",
    example: 'http://www.images.com/images/e736ensdnswjwhw'
  })
  ghanaCardImage: string;
}
