import { addressInfoType, nameInfoType, questionInfoType } from "../CommonInformation";

export interface affidavitPersonalServicePoDataInfoType {    
    affidavitReason?: string;
    applicationType?: string[];
    applicationTypeComment?: string;
}
  
export interface affidavitPersonalServicePoSurveyInfoType {
    data: affidavitPersonalServicePoDataInfoType;
    questions?: questionInfoType[];
    pageName?: string;
    currentStep?: number | string;
    currentPage?: number | string;
}

export interface aboutAffiantApspDataInfoType {    
    ApplicantName?: nameInfoType;
    ApplicantOccupation?: string;
    inCareOf?: string[];
    ApplicantAddress?: addressInfoType;
}

export interface aboutAffiantApspSurveyInfoType {
    data: aboutAffiantApspDataInfoType;
    questions?: questionInfoType[];
    pageName?: string;
    currentStep?: number | string;
    currentPage?: number | string;
}

export interface aboutServiceApspDataInfoType {    
    ServedPersonName?: nameInfoType;   
    locationServed?: addressInfoType;
    idMethod?: string;
    idMethodComment?: string;
    dateTimeServed?: string;
    documentListApsp?: exhibitsApspDataInfoType[];
}

export interface exhibitsApspDataInfoType {    
    exhibitIndex?: number;
    exhibitName?: string;
    fileName?: string; 
}

export interface aboutServiceApspSurveyInfoType {
    data: aboutServiceApspDataInfoType;
    questions?: questionInfoType[];
    pageName?: string;
    currentStep?: number | string;
    currentPage?: number | string;
}

export interface storyDataInfoType {
    index?: number;
    content?: string;
}

export interface electronicFilingStatementDataInfoType {
    Lawyer?: string;
    ApplicantName?: nameInfoType;
    PartyInfoEfsp?: efspPartyInfoType[];
    OtherPartyInfoEfsp?: efspPartyInfoType[];
    StatementConfirmation?: string[];
}

export interface efspPartyInfoType {
    name: nameInfoType;
}

export interface electronicFilingStatementApspSurveyInfoType {
    data: electronicFilingStatementDataInfoType;
    questions?: questionInfoType[];
    pageName?: string;
    currentStep?: number | string;
    currentPage?: number | string;
}