import { Step } from "./step";

export interface RootState {
  version: string;
}

export interface CommonState {
   // whether it's a new application or loaded from previous session/s
  existingApplication: boolean;
  userId: string;
}

export interface ApplicationState {
  // empty for now, persisted ID from database
  id?: string;

  // identifier for the application type
  // I think we only have one for now
  // can be automatically translated to a label
  type: string;

  /*
  - pre-populated at the moment, will be persisted for saved applications
  - drives the navigation component
  - entries are updated by their respective Vue components
  - visibility is determined by the initial questionnaire (primarily)
  */
  steps: Step[];

  // update automatically as steps are updated
  lastUpdate: Date;

  // updated by navigation or nested component
  // == step type
  currentStep: number;

  // update as pages are updated
  allCompleted: boolean;

  // might be useful?
  lastPrinted?: Date;

  userType: string;

  userName: string;

  userId: string,

  applicantName?: string;

  respondentName?: string;
}
