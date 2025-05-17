import { ActivityEvent, Backend, Frontend, Fullstack, JourneyMap, Milestone, ProjectComment, ProjectVisibility, Projectvote, UIUXDesign, User, UserStory } from "@prisma/client";

export type Gender = "MALE" | "FEMALE";

// REMEMBER: Change the types of the models to their formatted types
export type FormattedProject = {
  id:              string        
  name:            string
  description:     string
  createdById:     string
  createdBy:       User,
  
  createdAt:       Date,
  updatedAt:       Date,

  milestones:      Milestone[],
  journeyMaps:     JourneyMap[],
  uiuxDesigns:     UIUXDesign[],
  frontends:       Frontend[],
  backends:        Backend[],
  fullstacks:      Fullstack[],
  activityEvents:  ActivityEvent[],
  projectComments: ProjectComment[],
  projectUpvotes:  Projectvote[],
  userStories:     UserStory[],
  
  likes:           number,
  visibility:      ProjectVisibility
}