import { ActivityEvent, Backend, Frontend, Fullstack, JourneyMap, Project, ProjectComment, Projectvote, Skills, UIUXDesign, UserJourney, UserStory } from "@prisma/client";

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
  id: string;
  firstName: string;
  lastName: string;
  otherNames: string;
  email: string;
  role: string;
  gender: string;

  createdAt: string;
  updatedAt: string;
  accountActivatedAt: string | null;
  accountIsActivated: boolean;


  skills:          Skills[],
  projects :       Project[],
  journeyMaps :    JourneyMap[],
  uiuxDesigns :    UIUXDesign[],
  frontends :      Frontend[],
  backends  :      Backend[],
  fullstacks:      Fullstack[],
  activityEvents:  ActivityEvent[],
  comments :       Comment[],
  projectComments: ProjectComment[],
  projectUpvotes:  Projectvote[],
  userStories:     UserStory[],
  userJourneys:    UserJourney[],

  // phoneNumberIsVerified: boolean;
  // phoneNumberVerifiedAt: string | null;

  // mfaEnabled: boolean;
  // mfaType: string;
};
