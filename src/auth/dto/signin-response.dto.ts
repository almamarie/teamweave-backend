export class SigninResponseDto {
    access_token: string;
    user: {
      userId: string;
      firstName: string;
      lastName: string;
      email: string;
      role: string;
    };
  }
  