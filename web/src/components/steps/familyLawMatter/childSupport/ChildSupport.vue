<template>
    <page-base v-on:onPrev="onPrev()" v-on:onNext="onNext()" v-on:onComplete="onComplete()">
        <survey v-bind:survey="survey"></survey>
    </page-base>
</template>

<script lang="ts">
import { Component, Vue, Prop} from 'vue-property-decorator';

import * as SurveyVue from "survey-vue";
import * as surveyEnv from "@/components/survey/survey-glossary.ts";
import surveyJson from "./forms/child-support.json";

import PageBase from "../../PageBase.vue";
import { stepInfoType, stepResultInfoType } from "@/types/Application";

import { namespace } from "vuex-class";   
import "@/store/modules/application";
const applicationState = namespace("Application");

@Component({
    components:{
        PageBase
    }
})

export default class ChildSupport extends Vue {
    
    @Prop({required: true})
    step!: stepInfoType;

    @applicationState.State
    public steps!: any

    @applicationState.Action
    public UpdateGotoPrevStepPage!: () => void

    @applicationState.Action
    public UpdateGotoNextStepPage!: () => void

    @applicationState.Action
    public UpdateStepResultData!: (newStepResultData: stepResultInfoType) => void

    survey = new SurveyVue.Model(surveyJson);
    surveyJsonCopy;
    currentStep = 0;
    currentPage = 0;
    surveyHasError = false;
    numberOfOtherParties = 0;

    beforeCreate() {
        const Survey = SurveyVue;
        surveyEnv.setCss(Survey);
    }

    mounted(){ 
        this.surveyHasError = false;
        this.initializeSurvey();
        this.addSurveyListener();
        this.reloadPageInformation();
    }

    public initializeSurvey(){
       
        this.adjustSurveyForOtherParties();
       
        this.survey = new SurveyVue.Model(this.surveyJsonCopy);
        this.survey.commentPrefix = "Comment";
        this.survey.showQuestionNumbers = "off";
        this.survey.showNavigationButtons = false;
        surveyEnv.setGlossaryMarkdown(this.survey);
    }

    public adjustSurveyForOtherParties(){        
        this.surveyJsonCopy = JSON.parse(JSON.stringify(surveyJson));

        if (this.steps[2].result && this.steps[2].result['otherPartyCommonSurvey'] && this.steps[2].result['otherPartyCommonSurvey'].data) {
            const otherPartyData = this.steps[2].result['otherPartyCommonSurvey'].data; 
            this.numberOfOtherParties = otherPartyData.length;           
            // console.log(otherPartyData)            
            const template = this.surveyJsonCopy.pages[0].elements[0].elements[2];
            const infoTemplate = this.surveyJsonCopy.pages[0].elements[0].elements[3];
            this.surveyJsonCopy.pages[0].elements[0].elements.pop()
            this.surveyJsonCopy.pages[0].elements[0].elements.pop()
            let visibleCondition = "false"
            
            for (const otherIndex in otherPartyData){                
                const otherParty = otherPartyData[otherIndex]
                const temp = JSON.parse(JSON.stringify(template));  
                temp.title = Vue.filter('getFullName')(otherParty['name']) +' is:'
                temp['name'] = "otherParty["+otherIndex+"]GuardianType"
                this.surveyJsonCopy.pages[0].elements[0].elements.push(temp);
                visibleCondition += "or {otherParty["+otherIndex+"]GuardianType} == 'appointedGuardian' "
            }
            //console.log(visibleCondition)
            infoTemplate.visibleIf = visibleCondition
            this.surveyJsonCopy.pages[0].elements[0].elements.push(infoTemplate);
        }else{
            this.surveyHasError = true;
        }
    }
    
    public addSurveyListener(){
        this.survey.onValueChanged.add((sender, options) => {
            Vue.filter('surveyChanged')('familyLawMatter')
            //console.log(this.survey.data)
        })
    }
    
    public reloadPageInformation() { 
        this.currentStep = this.$store.state.Application.currentStep;
        this.currentPage = this.$store.state.Application.steps[this.currentStep].currentPage;
        
        if (this.step.result && this.step.result['childSupportSurvey']) {
            this.survey.data = this.step.result['childSupportSurvey'].data;
           
            Vue.filter('scrollToLocation')(this.$store.state.Application.scrollToLocationName);            
        }
        if(this.surveyHasError)
            Vue.filter('setSurveyProgress')(null, this.currentStep, this.currentPage, 50, false);
        else
            Vue.filter('setSurveyProgress')(this.survey, this.currentStep, this.currentPage, 50, false);
    }   

    public onPrev() {
        this.UpdateGotoPrevStepPage()
    }

    public onNext() {
        if(!this.survey.isCurrentPageHasErrors) {
            this.UpdateGotoNextStepPage()
        }
    }
    
    beforeDestroy() {
        
        if(this.surveyHasError)
            Vue.filter('setSurveyProgress')(null, this.currentStep, this.currentPage, 50, false);
        else
            Vue.filter('setSurveyProgress')(this.survey, this.currentStep, this.currentPage, 50, true);
        
        this.UpdateStepResultData({step:this.step, data: {childSupportSurvey: Vue.filter('getSurveyResults')(this.survey, this.currentStep, this.currentPage)}})
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import "../../../../styles/survey";
</style>
