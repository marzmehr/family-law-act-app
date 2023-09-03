import { addressInfoType, contactInfoType, nameInfoType, questionInfoType } from "../CommonInformation";

export interface noticeLawyerPartyDataInfoType {    
    ApplicantName?: nameInfoType;  
    FirmName?: string;  
    IssuesList?: issuesListInfoType;    
    LawyerAddressNlp?: addressInfoType;
    LawyerContact?: contactInfoType;
    OtherPartyInfoNlp?: noticeLawyerPartyOtherPartyInfoType[];
}  

export interface issuesListInfoType {   
    otherComment?: string;    
    applicationAboutComment?: string;
    courtDocumentsPreparationComment?: string;
    specifiedIssuesComment?: string;
    checked?: string[];   
}

export interface noticeLawyerPartyOtherPartyInfoType {
    name: nameInfoType;
}
  
export interface noticeLawyerPartySurveyInfoType {
    data: noticeLawyerPartyDataInfoType;
    questions?: questionInfoType[];
    pageName?: string;
    currentStep?: number | string;
    currentPage?: number | string;
}

export interface otherPartyNLPConfirmationSurveyInfoType {
    data: {confirmation: string};
    questions?: questionInfoType[];
    pageName?: string;
    currentStep?: number | string;
    currentPage?: number | string;
}

export interface lawyerInformationInfoDataInfoType {   
    lawyerName: nameInfoType;
    firmName: string;
    address: addressInfoType;
    contact: contactInfoType;
}