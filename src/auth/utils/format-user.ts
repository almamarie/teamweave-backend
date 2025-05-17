import { User } from '@prisma/client';
import { FormattedUserType } from '../types';
import { NotFoundException } from '@nestjs/common';

export function formatUser(user: User): FormattedUserType {
  if (!user) throw new NotFoundException("User not found")
  const formatted = {
    ...user,
    createdAt: user.createdAt.toString(),
    updatedAt: user.updatedAt.toString(),
    accountActivatedAt: user.accountActivatedAt ? user.accountActivatedAt.toString() : null,
    accountIsActivated: user.accountIsActivated,



  skills: user["skills"] ?? [],
  projects :       user["projects"] ?? [],
  journeyMaps :    user["journeyMaps"] ?? [],
  uiuxDesigns :    user["uiuxDesigns"]  ?? [],
  frontends :      user["frontends"] ?? [],
  backends  :      user["backends"] ?? [],
  fullstacks:      user["fullstacks"] ?? [],
  activityEvents:  user["activityEvents"] ?? [],
  comments :       user["comments"] ?? [],
  projectComments: user["projectComments"] ?? [],
  projectUpvotes:  user["projectUpvotes"] ?? [],
  userStories:     user["userStories"] ?? [],
  userJourneys:    user["userJourneys"] ?? [],

    
    // phoneNumberIsVerified: user.phoneNumberIsVerified,
    // phoneNumberVerifiedAt: user.phoneNumberVerifiedAt ? user.phoneNumberVerifiedAt.toString() : null,
    // mfaEnabled: user.mfaEnabled,
    // mfaType: user.mfaType
  };

  if (!formatted.otherNames) {
    formatted.otherNames = "";
  }

  delete formatted.passwordHash;
  delete formatted.passwordResetToken;
  delete formatted.passwordResetExpires;
  delete formatted.passwordChangedAt;
  delete formatted.accountActivationToken;
  delete formatted.accountActivationExpires;
  // delete formatted.phoneNumberVerificationToken;
  // delete formatted.phoneNumberVerificationTokenExpires;
  // delete formatted.phoneNumberVerificationCode;
  // delete formatted.mfaCode;
  // delete formatted.mfaCodeExpiresAt;

  return formatted;
}
