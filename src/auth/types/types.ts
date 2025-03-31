export type GeneralResponseType = {
  status: boolean;
  message: string;
  data: object;
};

export type welcomeEmailType = {
  firstName: string;
  activationUrl: string;
};

export type FormattedUserType = {
  userId: string;
  firstName: string;
  lastName: string;
  otherNames: string;
  email: string;
  role: string;

  createdAt: string;
  updatedAt: string;
  accountActivatedAt: string | null;
  accountIsActivated: boolean;

  phoneNumberIsVerified: boolean;
  phoneNumberVerifiedAt: string | null;

  mfaEnabled: boolean;
  mfaType: string;
};
