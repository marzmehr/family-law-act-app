<template>
    <step-base v-bind:step="step">
        <flm-Questionnaire v-bind:step="step" v-if="step.currentPage == 0"/>
        <flm-background v-bind:step="step" v-if="step.currentPage == 1"/>
        <children-info v-bind:step="step" v-if="step.currentPage == 2"/>    
        
        
        <parenting-arrangements v-bind:step="step" v-if="step.currentPage == 3"/>    
        <parental-responsibilities v-bind:step="step" v-if="step.currentPage == 4"/> 
        <parenting-time v-bind:step="step" v-if="step.currentPage == 5"/> 
        <other-parenting-arrangements v-bind:step="step" v-if="step.currentPage == 6"/> 
        
        <parenting-order-agreement v-bind:step="step" v-if="step.currentPage == 7"/>
        <about-parenting-arrangements v-bind:step="step" v-if="step.currentPage == 8"/>
        <parenting-arrangement-changes v-bind:step="step" v-if="step.currentPage == 9"/>
        <best-interests-of-child v-bind:step="step" v-if="step.currentPage == 10"/>

        
        <child-support v-bind:step="step" v-if="step.currentPage == 11"/> 
        <child-support-current-arrangements v-bind:step="step" v-if="step.currentPage == 12"/> 
        <income-and-earning-potential v-bind:step="step" v-if="step.currentPage == 13"/> 
        <about-child-support-order v-bind:step="step" v-if="step.currentPage == 14"/>
       
        <child-support-order-agreement v-bind:step="step" v-if="step.currentPage == 15"/>
        <about-existing-child-support v-bind:step="step" v-if="step.currentPage == 16"/> 
        
        <calculating-child-support v-bind:step="step" v-if="step.currentPage == 17"/>
        <undue-hardship v-bind:step="step" v-if="step.currentPage == 18"/> 
        <special-and-extraordinary-expenses v-bind:step="step" v-if="step.currentPage == 19"/> 

        <about-child-support-changes v-bind:step="step" v-if="step.currentPage == 20"/> 
        <unpaid-child-support v-bind:step="step" v-if="step.currentPage == 21"/>


        <contact-with-child v-bind:step="step" v-if="step.currentPage == 22"/>
        
        <contact-with-child-order v-bind:step="step" v-if="step.currentPage == 23"/>
        
        <about-contact-with-child-order v-bind:step="step" v-if="step.currentPage == 24"/>
        <contact-with-child-best-interests-of-child v-bind:step="step" v-if="step.currentPage == 25"/>
        
        <guardian-of-child v-bind:step="step" v-if="step.currentPage == 26"/>
        <guardian-of-child-best-interests-of-child v-bind:step="step" v-if="step.currentPage == 27"/>
        <indigenous-ancestry-of-child v-bind:step="step" v-if="step.currentPage == 28"/>

        <spousal-support v-bind:step="step" v-if="step.currentPage == 29"/>
        <spousal-support-income-and-earning-potential v-bind:step="step" v-if="step.currentPage == 30"/> 
        <about-spousal-support-order v-bind:step="step" v-if="step.currentPage == 31"/>

        <existing-spousal-support-order-agreement v-bind:step="step" v-if="step.currentPage == 32"/>
        <existing-spousal-support-final-order v-bind:step="step" v-if="step.currentPage == 33"/>
        <existing-spousal-support-agreement v-bind:step="step" v-if="step.currentPage == 34"/>
        
        <calculating-spousal-support v-bind:step="step" v-if="step.currentPage == 35"/> 

        <about-existing-spousal-support-order v-bind:step="step" v-if="step.currentPage == 36"/>
        <unpaid-spousal-support v-bind:step="step" v-if="step.currentPage == 37"/>

        <flm-additional-documents v-bind:step="step" v-if="step.currentPage == 38"/>

        <review-your-answers-flm v-bind:step="step" v-if="step.currentPage == 39"/>
        <preview-forms-flm v-bind:step="step" v-if="step.currentPage == 40"/>
    </step-base>
</template>

<script lang="ts">
import { Component, Vue, Prop} from 'vue-property-decorator';
import StepBase from "../StepBase.vue";
import { stepInfoType } from "@/types/Application";

import FlmQuestionnaire from "./FlmQuestionnaire.vue";
import FlmBackground from "./FlmBackground.vue";
import ChildrenInfo from "./childInfo/ChildrenInfo.vue";


import ParentingArrangements from "./parentingArrangements/ParentingArrangements.vue";
import ParentalResponsibilities from "./parentingArrangements/ParentalResponsibilities.vue";
import ParentingTime from "./parentingArrangements/ParentingTime.vue";
import OtherParentingArrangements from "./parentingArrangements/OtherParentingArrangements.vue";
import ParentingOrderAgreement from "./parentingArrangements/ParentingOrderAgreement.vue";
import AboutParentingArrangements from "./parentingArrangements/AboutParentingArrangements.vue";
import ParentingArrangementChanges from "./parentingArrangements/ParentingArrangementChanges.vue";
import BestInterestsOfChild from "./parentingArrangements/BestInterestsOfChild.vue";

import ChildSupport from "./childSupport/ChildSupport.vue";
import ChildSupportCurrentArrangements from "./childSupport/ChildSupportCurrentArrangement.vue"
import IncomeAndEarningPotential from "./childSupport/IncomeAndEarningPotential.vue"
import AboutChildSupportOrder from "./childSupport/AboutChildSupportOrder.vue"
import ChildSupportOrderAgreement from "./childSupport/ChildSupportOrderAgreement.vue"
import AboutExistingChildSupport from "./childSupport/AboutExistingChildSupport.vue"
import CalculatingChildSupport from "./childSupport/CalculatingChildSupport.vue"
import UndueHardship from "./childSupport/UndueHardship.vue"
import SpecialAndExtraordinaryExpenses from "./childSupport/SpecialAndExtraordinaryExpenses.vue"
import AboutChildSupportChanges from "./childSupport/AboutChildSupportChanges.vue"
import UnpaidChildSupport from "./childSupport/UnpaidChildSupport.vue"

import ContactWithChild from "./contactWithChild/ContactWithChild.vue";
import AboutContactWithChildOrder from "./contactWithChild/AboutContactWithChildOrder.vue";
import ContactWithChildOrder from "./contactWithChild/ContactWithChildOrder.vue";
import ContactWithChildBestInterestsOfChild from "./contactWithChild/ContactWithChildBestInterestsOfChild.vue";

import GuardianOfChild from "./guardianOfChild/GuardianOfChild.vue";
import GuardianOfChildBestInterestsOfChild from "./guardianOfChild/GuardianOfChildBestInterestsOfChild.vue";
import IndigenousAncestryOfChild from "./guardianOfChild/IndigenousAncestryOfChild.vue";

import SpousalSupport from "./spousalSupport/SpousalSupport.vue";
import AboutSpousalSupportOrder from "./spousalSupport/AboutSpousalSupportOrder.vue";
import CalculatingSpousalSupport from "./spousalSupport/CalculatingSpousalSupport.vue";
import SpousalSupportIncomeAndEarningPotential from "./spousalSupport/SpousalSupportIncomeAndEarningPotential.vue";

// import AboutExistingSpousalSupport from "./spousalSupport/AboutExistingSpousalSupport.vue";
import ExistingSpousalSupportAgreement from "./spousalSupport/ExistingSpousalSupportAgreement.vue";
import ExistingSpousalSupportFinalOrder from "./spousalSupport/ExistingSpousalSupportFinalOrder.vue";
import AboutExistingSpousalSupportOrder from "./spousalSupport/AboutExistingSpousalSupportOrder.vue";
import ExistingSpousalSupportOrderAgreement from "./spousalSupport/ExistingSpousalSupportOrderAgreement.vue";
import UnpaidSpousalSupport from "./spousalSupport/UnpaidSpousalSupport.vue";

import FlmAdditionalDocuments from "./FlmAdditionalDocuments.vue"

import ReviewYourAnswersFlm from "./reviewFLM/ReviewYourAnswersFLM.vue"
import PreviewFormsFlm from "./reviewFLM/PreviewFormsFLM.vue"


@Component({
    components:{
        StepBase,      


        FlmQuestionnaire,
        FlmBackground, 
        ChildrenInfo,


        ParentingArrangements,
        ParentalResponsibilities,
        ParentingTime,
        OtherParentingArrangements,
        ParentingOrderAgreement,
        AboutParentingArrangements,
        ParentingArrangementChanges,
        BestInterestsOfChild, 


        ChildSupport, 
        ChildSupportCurrentArrangements,
        IncomeAndEarningPotential,
        AboutChildSupportOrder,
       
        ChildSupportOrderAgreement,
        AboutExistingChildSupport,
        
        CalculatingChildSupport,
        UndueHardship,
        SpecialAndExtraordinaryExpenses,

        AboutChildSupportChanges,
        UnpaidChildSupport,    
              
        ContactWithChild,
        AboutContactWithChildOrder,
        ContactWithChildOrder,
        ContactWithChildBestInterestsOfChild,

        GuardianOfChild,
        GuardianOfChildBestInterestsOfChild,
        IndigenousAncestryOfChild,

        SpousalSupport,
        AboutSpousalSupportOrder,
        CalculatingSpousalSupport,
        SpousalSupportIncomeAndEarningPotential,
       
        ExistingSpousalSupportAgreement,
        ExistingSpousalSupportFinalOrder,
        AboutExistingSpousalSupportOrder,
        ExistingSpousalSupportOrderAgreement,
        UnpaidSpousalSupport,
        
        FlmAdditionalDocuments,

        ReviewYourAnswersFlm,
        PreviewFormsFlm,
    }
})
export default class FamilyLawStep extends Vue {

    @Prop({required: true})
    step!: stepInfoType | Object

};

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
    @import "../../../styles/survey";
</style>
