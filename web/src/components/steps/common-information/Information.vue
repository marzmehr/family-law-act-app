<template>
    <page-base v-on:onPrev="onPrev()" v-on:onNext="onNext()" v-on:onComplete="onComplete()">   
        <survey v-bind:survey="survey"></survey>
    </page-base>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch} from 'vue-property-decorator';

import * as SurveyVue from "survey-vue";
import * as surveyEnv from "@/components/survey/survey-glossary.ts";
import surveyJson from "./forms/survey-information.json";

import PageBase from "../PageBase.vue";
import { stepInfoType, stepResultInfoType } from "@/types/Application";

import { namespace } from "vuex-class";   
import "@/store/modules/application";
const applicationState = namespace("Application");

@Component({
    components:{
        PageBase
    }
})

export default class Information extends Vue {
    
    @Prop({required: true})
    step!: stepInfoType;

    @applicationState.State
    public steps!: any

    @applicationState.State
    public types!: string[]

    @applicationState.Action
    public UpdateGotoPrevStepPage!: () => void

    @applicationState.Action
    public UpdateGotoNextStepPage!: () => void

    @applicationState.Action
    public UpdateStepResultData!: (newStepResultData: stepResultInfoType) => void

    @applicationState.Action
    public UpdateCommonStepResults!: (newCommonStepResults) => void

    survey = new SurveyVue.Model(surveyJson);
    surveyJsonCopy
    currentStep=0;
    currentPage=0;

    yourInformationPOpage = 1
    editButton = false

    lawyerName = '';
    clientName = '';

    beforeCreate() {
        const Survey = SurveyVue;
        surveyEnv.setCss(Survey);
    }

    mounted(){
        this.initializeSurvey();
        this.addSurveyListener();
        this.reloadPageInformation();
    }

    public initializeSurvey(){
        this.adjustSurveyForPersonalInfo()
        this.survey = new SurveyVue.Model(this.surveyJsonCopy);
        this.survey.commentPrefix = "Comment";
        this.survey.showQuestionNumbers = "off";
        this.survey.showNavigationButtons = false;
        surveyEnv.setGlossaryMarkdown(this.survey);
    }
    
    public addSurveyListener(){
        this.survey.onValueChanged.add((sender, options) => {
            Vue.filter('surveyChanged')('familyLawMatter')
            //console.log(this.survey.data);
            // console.log(options)

            if(options.name == 'editName'){ 
                this.$store.commit("Application/setCurrentStep", 1);
                this.$store.commit("Application/setCurrentStepPage", {currentStep: 1, currentPage: this.yourInformationPOpage }); 
            }

            if(options.name == "ApplicantName") {
                this.$store.commit("Application/setApplicantName", this.survey.data["ApplicantName"]);
                this.UpdateCommonStepResults({data:{'applicantName':this.survey.data["ApplicantName"]}})
            }
        })
    }
    
    public reloadPageInformation() {
        // console.log(this.steps[0].result)
        this.currentStep = this.$store.state.Application.currentStep;
        this.currentPage = this.$store.state.Application.steps[this.currentStep].currentPage;        

        if (this.step.result && this.step.result['yourInformationSurvey']) {
            this.survey.data = this.step.result['yourInformationSurvey'].data;
            Vue.filter('scrollToLocation')(this.$store.state.Application.scrollToLocationName);            
        }

        this.survey.setVariable("editButton",this.editButton);

        if (this.types.includes("Family Law Matter")){
            this.survey.setVariable("includesFlm", true);            
        } else {
            this.survey.setVariable("includesFlm", false);
        }

        if(this.steps[0].result && this.steps[0].result['selectedForms'].includes("protectionOrder")){
            if(this.steps[1].result && this.steps[1].result['yourInformationSurveyPO'] && this.steps[1].result['yourInformationSurveyPO'].data)
            {
                this.survey.setValue('ApplicantDOB',this.steps[1].result['yourInformationSurveyPO'].data.ApplicantDOB);
                this.survey.setValue('ApplicantName',this.steps[1].result['yourInformationSurveyPO'].data.ApplicantName);
            }
        }
        
        Vue.filter('setSurveyProgress')(this.survey, this.currentStep, this.currentPage, 50, false);       
    }

    public adjustSurveyForPersonalInfo(){
        this.surveyJsonCopy = JSON.parse(JSON.stringify(surveyJson));

       //console.log(this.surveyJsonCopy.pages[0].elements[0].elements[0])
       //console.log(this.steps[1].result['yourInformationSurveyPO'].data)
       // console.log(this.steps[0].result['selectedForms'])
        if(this.steps[0].result && this.steps[0].result['selectedForms'].includes("protectionOrder")){
            this.surveyJsonCopy.pages[0].elements[0].elements[0].readOnly = true;
            this.surveyJsonCopy.pages[0].elements[0].elements[1].readOnly = true;
            this.editButton = true;
        }

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

        if(this.survey.data && this.survey.data["ApplicantName"]) {
            this.$store.commit("Application/setApplicantName", this.survey.data["ApplicantName"]);
            this.UpdateCommonStepResults({data:{'applicantName':this.survey.data["ApplicantName"]}})
        }
        
        Vue.filter('setSurveyProgress')(this.survey, this.currentStep, this.currentPage, 50, true);
        
        this.UpdateStepResultData({step:this.step, data: {yourInformationSurvey: Vue.filter('getSurveyResults')(this.survey, this.currentStep, this.currentPage)}})

    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import "../../../styles/survey";
</style>
