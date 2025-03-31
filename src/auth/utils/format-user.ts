import { User } from '@prisma/client';
import { FormattedUserType } from '../types';

export function formatUser(user: User): FormattedUserType {
  const formatted = {
    ...user,
    userId: user.userId,
    firstName: user.firstName,
    lastName: user.lastName,
    otherNames: user.otherNames || '',
    email: user.email,
    role: user.role,
    createdAt: user.createdAt.toString(),
    updatedAt: user.updatedAt.toString(),
    accountActivatedAt: user.accountActivatedAt ? user.accountActivatedAt.toString() : null,
    accountIsActivated: user.accountIsActivated,
    phoneNumberIsVerified: user.phoneNumberIsVerified,
    phoneNumberVerifiedAt: user.phoneNumberVerifiedAt ? user.phoneNumberVerifiedAt.toString() : null,
    mfaEnabled: user.mfaEnabled,
    mfaType: user.mfaType
  };

  delete formatted.passwordHash;
  delete formatted.passwordResetToken;
  delete formatted.passwordResetExpires;
  delete formatted.passwordChangedAt;
  delete formatted.accountActivationToken;
  delete formatted.accountActivationExpires;
  delete formatted.phoneNumberVerificationToken;
  delete formatted.phoneNumberVerificationTokenExpires;
  delete formatted.phoneNumberVerificationCode;
  delete formatted.mfaCode;
  delete formatted.mfaCodeExpiresAt;

  return formatted;
}

export function formatProfile(user: any) {
  return {
    dateOfBirth: user.dateOfBirth,
    gender: user.gender,
    interest: user.interest,
    location: user.location,
    avatar: JSON.parse(user.avatar),
    image: user.image,
    ghanaCardImage: user.ghanaCardImage
  };
}
