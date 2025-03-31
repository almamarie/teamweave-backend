Below is an example of a comprehensive Markdown documentation for your TeamWeave backend API. This document outlines the routes, HTTP methods, and descriptions for each endpoint.

---

# TeamWeave Backend API Documentation

This document provides a detailed overview of the RESTful API endpoints for the TeamWeave backend. It includes routes, HTTP methods, and brief descriptions of each endpoint's functionality.

---

## 1. User Endpoints

- **GET /users**_Description:_ Retrieve a list of all users._Usage:_ Use this endpoint to display all registered users on the platform.
- **GET /users/:id**_Description:_ Fetch details for a specific user by their unique ID._Usage:_ Useful for profile viewing and administrative purposes.
- **POST /users**_Description:_ Create a new user._Request DTO:_ `CreateUserDTO`_Usage:_ Accepts user details (e.g., first name, last name, email, password, etc.) and registers a new user.
- **PUT /users/:id**_Description:_ Update the details of an existing user._Request DTO:_ `UpdateUserDTO`_Usage:_ Modify user information such as profile details and contact information.
- **DELETE /users/:id**
  _Description:_ Delete a user by ID.
  _Usage:_ Remove a user from the system (admin use).

---

## 2. Project Endpoints

- **GET /projects**_Description:_ Retrieve a list of all projects._Usage:_ Displays a list of projects available on the platform.
- **GET /projects/:id**_Description:_ Get detailed information for a specific project._Usage:_ View project details, including description, milestones, and associated submissions.
- **POST /projects**_Description:_ Create a new project._Request DTO:_ `CreateProjectDTO`_Usage:_ Initiate a new project with a name, description, and creator information.
- **PUT /projects/:id**_Description:_ Update an existing project’s details._Request DTO:_ `UpdateProjectDTO`_Usage:_ Edit project information such as name or description.
- **DELETE /projects/:id**
  _Description:_ Delete a project.
  _Usage:_ Remove a project from the system.

---

## 3. Milestone Endpoints

- **GET /projects/:projectId/milestones**_Description:_ List all milestones for a given project._Usage:_ Track progress on project milestones.
- **GET /milestones/:id**_Description:_ Retrieve details of a specific milestone._Usage:_ View milestone information including title, description, and completion status.
- **POST /projects/:projectId/milestones**_Description:_ Create a new milestone for a project._Request DTO:_ `CreateMilestoneDTO`_Usage:_ Define key deliverables or phases within a project.
- **PUT /milestones/:id**_Description:_ Update an existing milestone._Request DTO:_ `UpdateMilestoneDTO`_Usage:_ Modify milestone details or mark as completed.
- **DELETE /milestones/:id**
  _Description:_ Delete a milestone.
  _Usage:_ Remove a milestone from a project.

---

## 4. JourneyMap Endpoints

- **GET /projects/:projectId/journey-maps**_Description:_ Retrieve journey maps associated with a project._Usage:_ View the overall user experience mapping for the project.
- **GET /journey-maps/:id**_Description:_ Get details for a specific journey map._Usage:_ Explore journey map components and descriptions.
- **POST /projects/:projectId/journey-maps**_Description:_ Create a new journey map for a project._Request DTO:_ `CreateJourneyMapDTO`_Usage:_ Initiate a user experience mapping process.
- **PUT /journey-maps/:id**_Description:_ Update a journey map._Request DTO:_ `UpdateJourneyMapDTO`_Usage:_ Modify the title or description of an existing journey map.
- **DELETE /journey-maps/:id**
  _Description:_ Delete a journey map.
  _Usage:_ Remove a journey map from a project.

---

## 5. UserJourney Endpoints

- **GET /journey-maps/:journeyMapId/user-journeys**_Description:_ List user journeys within a specific journey map._Usage:_ Display detailed user flows.
- **GET /user-journeys/:id**_Description:_ Retrieve details for a specific user journey._Usage:_ Understand the flow and context within a journey map.
- **POST /journey-maps/:journeyMapId/user-journeys**_Description:_ Create a new user journey._Request DTO:_ `CreateUserJourneyDTO`_Usage:_ Define a new flow or scenario within a journey map.
- **PUT /user-journeys/:id**_Description:_ Update a user journey._Request DTO:_ `UpdateUserJourneyDTO`_Usage:_ Modify user journey details.
- **DELETE /user-journeys/:id**
  _Description:_ Delete a user journey.
  _Usage:_ Remove a user journey from a journey map.

---

## 6. Epic Endpoints

- **GET /user-journeys/:userJourneyId/epics**_Description:_ List epics under a user journey._Usage:_ Group related user stories within a user journey.
- **GET /epics/:id**_Description:_ Retrieve details for a specific epic._Usage:_ View the scope and objectives of an epic.
- **POST /user-journeys/:userJourneyId/epics**_Description:_ Create a new epic._Request DTO:_ `CreateEpicDTO`_Usage:_ Group related user stories under one epic.
- **PUT /epics/:id**_Description:_ Update an epic._Request DTO:_ `UpdateEpicDTO`_Usage:_ Modify epic details.
- **DELETE /epics/:id**
  _Description:_ Delete an epic.
  _Usage:_ Remove an epic from a user journey.

---

## 7. UserStory Endpoints

- **GET /projects/:projectId/user-stories**_Description:_ List user stories for a specific project._Usage:_ View individual requirements or features of the project.
- **GET /user-stories/:id**_Description:_ Retrieve a specific user story._Usage:_ Get detailed information on a requirement.
- **POST /projects/:projectId/user-stories**_Description:_ Create a new user story._Request DTO:_ `CreateUserStoryDTO`_Usage:_ Add a feature or requirement to a project.
- **PUT /user-stories/:id**_Description:_ Update a user story._Request DTO:_ `UpdateUserStoryDTO`_Usage:_ Edit the details of a user story.
- **DELETE /user-stories/:id**
  _Description:_ Delete a user story.
  _Usage:_ Remove a requirement from the project.

---

## 8. UI/UX Design Submission Endpoints

- **GET /projects/:projectId/uiux-designs**_Description:_ List UI/UX design submissions for a project._Usage:_ Display design contributions associated with a project.
- **GET /uiux-designs/:id**_Description:_ Retrieve details for a specific UI/UX design submission._Usage:_ View design URLs, tools used, and mapping details.
- **POST /projects/:projectId/uiux-designs**_Description:_ Create a new UI/UX design submission._Request DTO:_ `CreateUIUXDesignDTO`_Usage:_ Submit a UI/UX design with associated journey mapping information.
- **PUT /uiux-designs/:id**_Description:_ Update a UI/UX design submission._Request DTO:_ `UpdateUIUXDesignDTO`_Usage:_ Modify design details.
- **DELETE /uiux-designs/:id**
  _Description:_ Delete a UI/UX design submission.
  _Usage:_ Remove a design submission from a project.

---

## 9. Frontend Submission Endpoints

- **GET /projects/:projectId/frontends**_Description:_ List frontend submissions for a project._Usage:_ View frontend implementations linked to a UI/UX design.
- **GET /frontends/:id**_Description:_ Retrieve details for a specific frontend submission._Usage:_ Access repository URLs and live demo links.
- **POST /projects/:projectId/frontends**_Description:_ Create a new frontend submission._Request DTO:_ `CreateFrontendDTO`_Usage:_ Submit frontend code tied to a UI/UX design.
- **PUT /frontends/:id**_Description:_ Update a frontend submission._Request DTO:_ `UpdateFrontendDTO`_Usage:_ Modify frontend submission details.
- **DELETE /frontends/:id**
  _Description:_ Delete a frontend submission.
  _Usage:_ Remove a frontend submission.

---

## 10. Backend Submission Endpoints

- **GET /projects/:projectId/backends**_Description:_ List backend submissions for a project._Usage:_ Display backend implementations and mapping details.
- **GET /backends/:id**_Description:_ Retrieve details for a specific backend submission._Usage:_ View repository information and service details.
- **POST /projects/:projectId/backends**_Description:_ Create a new backend submission._Request DTO:_ `CreateBackendDTO`_Usage:_ Submit backend code along with journey map linkage.
- **PUT /backends/:id**_Description:_ Update a backend submission._Request DTO:_ `UpdateBackendDTO`_Usage:_ Edit backend submission details.
- **DELETE /backends/:id**
  _Description:_ Delete a backend submission.
  _Usage:_ Remove a backend submission from a project.

---

## 11. Fullstack Submission Endpoints

- **GET /projects/:projectId/fullstacks**_Description:_ List fullstack submissions for a project._Usage:_ View complete solutions that combine frontend and backend submissions.
- **GET /fullstacks/:id**_Description:_ Retrieve details for a specific fullstack submission._Usage:_ Access combined submission information.
- **POST /projects/:projectId/fullstacks**_Description:_ Create a new fullstack submission._Request DTO:_ `CreateFullstackDTO`_Usage:_ Submit an integrated solution linking frontend and backend.
- **PUT /fullstacks/:id**_Description:_ Update a fullstack submission._Request DTO:_ `UpdateFullstackDTO`_Usage:_ Modify details of a fullstack submission if needed.
- **DELETE /fullstacks/:id**
  _Description:_ Delete a fullstack submission.
  _Usage:_ Remove a fullstack submission from the project.

---

## 12. Submission User Story Mapping Endpoints

- **GET /submission-user-stories**_Description:_ List all mappings between submissions and user stories._Usage:_ Track which submissions implement which user stories.
- **POST /submission-user-stories**_Description:_ Create a mapping between a submission and a user story._Request DTO:_ `CreateSubmissionUserStoryDTO`_Usage:_ Link a UI/UX design or backend submission to a specific user story.
- **DELETE /submission-user-stories/:id**
  _Description:_ Delete a mapping.
  _Usage:_ Remove an association if a submission no longer implements a user story.

---

## 13. UI/UX Design Version Endpoints

- **GET /uiux-designs/:uiuxDesignId/versions**_Description:_ List version histories for a UI/UX design submission._Usage:_ View past versions and change logs of a design.
- **GET /uiux-design-versions/:id**_Description:_ Retrieve details for a specific UI/UX design version._Usage:_ Access version-specific information.
- **POST /uiux-designs/:uiuxDesignId/versions**_Description:_ Create a new version entry for a UI/UX design._Request DTO:_ `CreateUIUXDesignVersionDTO`
- **PUT /uiux-design-versions/:id**_Description:_ Update a UI/UX design version._Request DTO:_ `UpdateUIUXDesignVersionDTO`
- **DELETE /uiux-design-versions/:id**
  _Description:_ Delete a version entry for a UI/UX design.

---

## 14. Frontend Version Endpoints

- **GET /frontends/:frontendId/versions**_Description:_ List versions for a frontend submission._Usage:_ Track changes and iterations for the frontend code.
- **GET /frontend-versions/:id**_Description:_ Retrieve details for a specific frontend version.
- **POST /frontends/:frontendId/versions**_Description:_ Create a new version for a frontend submission._Request DTO:_ `CreateFrontendVersionDTO`
- **PUT /frontend-versions/:id**_Description:_ Update a frontend version._Request DTO:_ `UpdateFrontendVersionDTO`
- **DELETE /frontend-versions/:id**
  _Description:_ Delete a frontend version entry.

---

## 15. Backend Version Endpoints

- **GET /backends/:backendId/versions**_Description:_ List versions for a backend submission._Usage:_ View iteration history and version details for backend code.
- **GET /backend-versions/:id**_Description:_ Retrieve details for a specific backend version.
- **POST /backends/:backendId/versions**_Description:_ Create a new version entry for a backend submission._Request DTO:_ `CreateBackendVersionDTO`
- **PUT /backend-versions/:id**_Description:_ Update a backend version._Request DTO:_ `UpdateBackendVersionDTO`
- **DELETE /backend-versions/:id**
  _Description:_ Delete a backend version entry.

---

## 16. Tag Endpoints

- **GET /tags**_Description:_ Retrieve a list of all tags._Usage:_ Use for filtering and categorization.
- **GET /tags/:id**_Description:_ Retrieve details for a specific tag.
- **POST /tags**_Description:_ Create a new tag._Request DTO:_ `CreateTagDTO`
- **PUT /tags/:id**_Description:_ Update tag information._Request DTO:_ `UpdateTagDTO`
- **DELETE /tags/:id**
  _Description:_ Delete a tag.

---

## 17. EntityTag Endpoints

- **GET /entity-tags**_Description:_ List all tag associations for entities._Usage:_ Understand which tags are linked to which projects, submissions, etc.
- **POST /entity-tags**_Description:_ Create an association between a tag and an entity._Request DTO:_ `CreateEntityTagDTO`
- **DELETE /entity-tags/:id**
  _Description:_ Delete an entity tag association.

---

## 18. Comment Endpoints

- **GET /comments**_Description:_ List all comments across entities._Usage:_ Review user feedback and discussion.
- **GET /comments/:id**_Description:_ Retrieve details for a specific comment.
- **POST /comments**_Description:_ Create a new comment._Request DTO:_ `CreateCommentDTO`
- **PUT /comments/:id**_Description:_ Update an existing comment._Request DTO:_ `UpdateCommentDTO`
- **DELETE /comments/:id**
  _Description:_ Delete a comment.

---

## 19. Project Comment Endpoints

- **GET /projects/:projectId/comments**_Description:_ List all comments for a specific project.
- **GET /project-comments/:id**_Description:_ Retrieve a specific project comment.
- **POST /projects/:projectId/comments**_Description:_ Create a new comment on a project._Request DTO:_ `CreateProjectCommentDTO`
- **PUT /project-comments/:id**_Description:_ Update a project comment._Request DTO:_ `UpdateProjectCommentDTO`
- **DELETE /project-comments/:id**
  _Description:_ Delete a project comment.

---

## 20. Upvote Endpoints

- **GET /upvotes**_Description:_ List all upvotes across entities.
- **GET /upvotes/:id**_Description:_ Retrieve details for a specific upvote.
- **POST /upvotes**_Description:_ Create a new upvote._Request DTO:_ `CreateUpvoteDTO`
- **DELETE /upvotes/:id**
  _Description:_ Delete an upvote.

---

## 21. Project Upvote Endpoints

- **GET /projects/:projectId/upvotes**_Description:_ List all upvotes for a specific project.
- **GET /project-upvotes/:id**_Description:_ Retrieve details for a specific project upvote.
- **POST /projects/:projectId/upvotes**_Description:_ Create a new upvote for a project._Request DTO:_ `CreateProjectUpvoteDTO`
- **DELETE /project-upvotes/:id**
  _Description:_ Delete a project upvote.

---

## 22. Activity Event Endpoints

- **GET /projects/:projectId/activity-events**_Description:_ List activity events for a specific project._Usage:_ Track actions such as submissions, comments, and upvotes.
- **GET /activity-events/:id**_Description:_ Retrieve details for a specific activity event.
- **POST /projects/:projectId/activity-events**_Description:_ Create a new activity event._Request DTO:_ `CreateActivityEventDTO`
- **DELETE /activity-events/:id**
  _Description:_ Delete an activity event.


## DTOs



Below is a complete list of the DTOs referenced in the documentation, organized by model. You can copy these TypeScript interfaces into your project to define the request payloads for your API endpoints.

---

### 1. User DTOs

```typescript
export interface CreateUserDTO {
  firstName: string;
  lastName: string;
  otherNames?: string;
  dateOfBirth?: string; // ISO date string
  gender?: 'male' | 'female';
  profilePicture?: string;
  about?: string;
  twitterLink?: string;
  linkedinLink?: string;
  facebookLink?: string;
  skills?: string[];
  email: string;
  password: string;
}

export interface UpdateUserDTO {
  firstName?: string;
  lastName?: string;
  otherNames?: string;
  dateOfBirth?: string;
  gender?: 'male' | 'female';
  profilePicture?: string;
  about?: string;
  twitterLink?: string;
  linkedinLink?: string;
  facebookLink?: string;
  skills?: string[];
  email?: string;
  password?: string;
}
```

---

### 2. Project DTOs

```typescript
export interface CreateProjectDTO {
  name: string;
  description: string;
  createdById: string;
}

export interface UpdateProjectDTO {
  name?: string;
  description?: string;
}
```

---

### 3. Milestone DTOs

```typescript
export interface CreateMilestoneDTO {
  title: string;
  description: string;
  completed?: boolean;
}

export interface UpdateMilestoneDTO {
  title?: string;
  description?: string;
  completed?: boolean;
}
```

---

### 4. JourneyMap DTOs

```typescript
export interface CreateJourneyMapDTO {
  title: string;
  description: string;
  projectId: string;
  createdById: string;
}

export interface UpdateJourneyMapDTO {
  title?: string;
  description?: string;
}
```

---

### 5. UserJourney DTOs

```typescript
export interface CreateUserJourneyDTO {
  title: string;
  description: string;
  journeyMapId: string;
  createdById: string;
}

export interface UpdateUserJourneyDTO {
  title?: string;
  description?: string;
}
```

---

### 6. Epic DTOs

```typescript
export interface CreateEpicDTO {
  title: string;
  description: string;
  userJourneyId: string;
}

export interface UpdateEpicDTO {
  title?: string;
  description?: string;
}
```

---

### 7. UserStory DTOs

```typescript
export interface CreateUserStoryDTO {
  content: string;
  projectId: string;
  creatorId: string;
  epicId: string;
}

export interface UpdateUserStoryDTO {
  content?: string;
}
```

---

### 8. UI/UX Design DTOs

```typescript
export interface CreateUIUXDesignDTO {
  projectId: string;
  creatorId: string;
  journeyMapId: string;
  designUrl: string;
  toolsUsed: string[];
}

export interface UpdateUIUXDesignDTO {
  designUrl?: string;
  toolsUsed?: string[];
}
```

---

### 9. Frontend DTOs

```typescript
export interface CreateFrontendDTO {
  projectId: string;
  creatorId: string;
  uiuxDesignId: string;
  repoUrl: string;
  liveUrl?: string;
  toolsUsed: string[];
}

export interface UpdateFrontendDTO {
  repoUrl?: string;
  liveUrl?: string;
  toolsUsed?: string[];
}
```

---

### 10. Backend DTOs

```typescript
export interface CreateBackendDTO {
  projectId: string;
  creatorId: string;
  journeyMapId: string;
  repoUrl: string;
  toolsUsed: string[];
}

export interface UpdateBackendDTO {
  repoUrl?: string;
  toolsUsed?: string[];
}
```

---

### 11. Fullstack DTOs

```typescript
export interface CreateFullstackDTO {
  projectId: string;
  creatorId: string;
  frontendId: string;
  backendId: string;
}

export interface UpdateFullstackDTO {
  // Typically fullstack submissions are aggregates and might not require updates.
}
```

---

### 12. Submission User Story DTO

```typescript
export interface CreateSubmissionUserStoryDTO {
  submissionType: 'uiux_design' | 'backend';
  submissionId: string;
  userStoryId: string;
}
```

---

### 13. UI/UX Design Version DTOs

```typescript
export interface CreateUIUXDesignVersionDTO {
  uiuxDesignId: string;
  versionNum: number;
  description?: string;
  url?: string;
  isCurrent?: boolean;
  metaData?: any;
}

export interface UpdateUIUXDesignVersionDTO {
  versionNum?: number;
  description?: string;
  url?: string;
  isCurrent?: boolean;
  metaData?: any;
}
```

---

### 14. Frontend Version DTOs

```typescript
export interface CreateFrontendVersionDTO {
  frontendId: string;
  versionNum: number;
  description?: string;
  url?: string;
  isCurrent?: boolean;
  metaData?: any;
}

export interface UpdateFrontendVersionDTO {
  versionNum?: number;
  description?: string;
  url?: string;
  isCurrent?: boolean;
  metaData?: any;
}
```

---

### 15. Backend Version DTOs

```typescript
export interface CreateBackendVersionDTO {
  backendId: string;
  versionNum: number;
  description?: string;
  url?: string;
  isCurrent?: boolean;
  metaData?: any;
}

export interface UpdateBackendVersionDTO {
  versionNum?: number;
  description?: string;
  url?: string;
  isCurrent?: boolean;
  metaData?: any;
}
```

---

### 16. Tag DTOs

```typescript
export interface CreateTagDTO {
  name: string;
}

export interface UpdateTagDTO {
  name?: string;
}
```

---

### 17. EntityTag DTO

```typescript
export interface CreateEntityTagDTO {
  entityType: string;
  entityId: string;
  tagId: string;
}
```

---

### 18. Comment DTOs

```typescript
export interface CreateCommentDTO {
  content: string;
  userId: string;
  entityType: string;
  entityId: string;
  parentId?: string;
}

export interface UpdateCommentDTO {
  content?: string;
}
```

---

### 19. Project Comment DTOs

```typescript
export interface CreateProjectCommentDTO {
  content: string;
  userId: string;
  projectId: string;
}

export interface UpdateProjectCommentDTO {
  content?: string;
}
```

---

### 20. Upvote DTO

```typescript
export interface CreateUpvoteDTO {
  userId: string;
  entityType: string;
  entityId: string;
}
```

---

### 21. Project Upvote DTO

```typescript
export interface CreateProjectUpvoteDTO {
  userId: string;
  projectId: string;
}
```

---

### 22. Activity Event DTO

```typescript
export interface CreateActivityEventDTO {
  projectId: string;
  userId?: string;
  eventType: string;
  description: string;
  entityType?: string;
  entityId?: string;
  metaData?: any;
}
```

---

This list covers all the DTOs for the major models and endpoints in your TeamWeave backend API documentation. Adjust the interfaces as needed based on your project requirements or additional fields you may add later.
