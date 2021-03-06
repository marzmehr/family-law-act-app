<template>
    <page-base v-on:onPrev="onPrev()" v-on:onNext="onNext()" v-on:onComplete="onComplete()">
        <survey v-bind:survey="survey"></survey>
    </page-base>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch} from 'vue-property-decorator';

import * as SurveyVue from "survey-vue";
import * as surveyEnv from "@/components/survey/survey-glossary.ts";
import surveyJson from "./forms/about-contact-with-child-order.json";

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

export default class AboutContactWithChildOrder extends Vue {
    
    @Prop({required: true})
    step!: stepInfoType;   

    @applicationState.Action
    public UpdateGotoPrevStepPage!: () => void

    @applicationState.Action
    public UpdateGotoNextStepPage!: () => void

    @applicationState.Action
    public UpdateStepResultData!: (newStepResultData: stepResultInfoType) => void

    survey = new SurveyVue.Model(surveyJson);
    surveyJsonCopy;
    currentStep=0;
    currentPage=0;

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
        this.adjustSurveyForChildren();
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
            if (options.name == "contactTypeChoices"){

                if(options.value.includes('No contact of any type')){
                    //console.log('clear')
                    Vue.nextTick(()=>
                        this.survey.setValue('contactTypeChoices',['No contact of any type'])
                    )
                    this.survey.setVariable("InPerson", false);
                } else if(options.value.includes("In person")){
                    // console.log('has person');
                    this.survey.setVariable("InPerson", true);
                } else {
                    this.survey.setVariable("InPerson", false);
                }
            } 
            
            if (this.survey.data.childrenRequireContactChoices){
                if (this.survey.data.childrenRequireContactChoices.length>1){
                    this.survey.setVariable("selectedChildWording", "children");                    
                } else {
                    this.survey.setVariable("selectedChildWording", "child");
                }
            }
        })
    }

    public adjustSurveyForChildren(){

        this.surveyJsonCopy = JSON.parse(JSON.stringify(surveyJson));                
        this.surveyJsonCopy.pages[0].elements[3].elements[0]["choices"]=[];        

        if (this.step.result && this.step.result['childData']) {
            const childData = this.step.result['childData'].data;            
            for (const child of childData){
                this.surveyJsonCopy.pages[0].elements[3].elements[0]["choices"].push(Vue.filter('getFullName')(child.name));
            }                       
        }        
    }
    
    public reloadPageInformation() {
        //console.log(this.step.result)
        if (this.step.result && this.step.result['aboutContactWithChildSurvey'] && this.step.result['aboutContactWithChildSurvey'].data) {
            this.survey.data = this.step.result['aboutContactWithChildSurvey'].data;
            Vue.filter('scrollToLocation')(this.$store.state.Application.scrollToLocationName);

            if (this.survey.data.childrenRequireContactChoices){
                if (this.survey.data.childrenRequireContactChoiceslength>1){
                    this.survey.setVariable("selectedChildWording", "children");                    
                } else {
                    this.survey.setVariable("selectedChildWording", "child");
                }
            }

            if (this.survey.data.contactTypeChoices && this.survey.data.contactTypeChoices.includes("In person")){                    
                    this.survey.setVariable("InPerson", true);
                } else {
                    this.survey.setVariable("InPerson", false);
            }            
        }

        if (this.step.result && this.step.result['flmBackgroundSurvey'] && this.step.result['flmBackgroundSurvey'].data){
            const backgroundSurveyData = this.step.result['flmBackgroundSurvey'].data;
            if (backgroundSurveyData.ExistingOrdersFLM == 'y' && backgroundSurveyData.existingOrdersListFLM 
                && backgroundSurveyData.existingOrdersListFLM.length > 0 
                && backgroundSurveyData.existingOrdersListFLM.includes("Contact with a Child")){
                    this.survey.setVariable("existing", true);                    
            } else {
                this.survey.setVariable("existing", false);
            }
        }
        this.survey.setVariable("selectedChildWording", "child");

        if (this.step.result && this.step.result['childData'] && this.step.result['childData'].data) { 
            const childData = this.step.result['childData'].data;            
            if (childData.length>1){
                this.survey.setVariable("childWording", "children");                    
            } else {
                this.survey.setVariable("childWording", "child");
                this.survey.setValue("childrenRequireContactChoices", [Vue.filter('getFullName')(childData[0].name)]);
                this.survey.setVariable("selectedChildWording", "child");
            }
        }       

        this.currentStep = this.$store.state.Application.currentStep;
        this.currentPage = this.$store.state.Application.steps[this.currentStep].currentPage;
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
        Vue.filter('setSurveyProgress')(this.survey, this.currentStep, this.currentPage, 50, true);
        
        this.UpdateStepResultData({step:this.step, data: {aboutContactWithChildSurvey: Vue.filter('getSurveyResults')(this.survey, this.currentStep, this.currentPage)}})

    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import "../../../../styles/survey";
</style>
