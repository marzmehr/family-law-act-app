<template>
  <page-base v-on:onPrev="onPrev()" v-on:onNext="onNext()" v-on:onComplete="onComplete()">
    <survey v-bind:survey="survey"></survey>
  </page-base>
</template>

<script>
import * as SurveyVue from "survey-vue";
import * as surveyEnv from "@/components/survey-glossary.ts"
import surveyJson from "@/assets/POForm/safetyNeeds/weaponsFirearms.json";
import PageBase from "../../PageBase.vue";
import { Step } from "@/models/step";

export default {
  name: "weapons-firearms",
  components: {
    PageBase
  },
  data() {
    var survey = new SurveyVue.Model(surveyJson);

    survey.commentPrefix = "Comment";
    survey.showQuestionNumbers = "off";
    survey.showNavigationButtons = false;

    let applicantNameObject = this.$store.getters[
      "application/getApplicantName"
    ];
    if (applicantNameObject) {
      let applicantName =
        applicantNameObject.first +
        " " +
        applicantNameObject.middle +
        " " +
        applicantNameObject.last;
      survey.setVariable("ApplicantName", applicantName);
    }

    let respondentNameObject = this.$store.getters[
      "application/getRespondentName"
    ];
    if (respondentNameObject) {
      let respondentName =
        respondentNameObject.first +
        " " +
        respondentNameObject.middle +
        " " +
        respondentNameObject.last;
      survey.setVariable("RespondentName", respondentName);
    }

    surveyEnv.setGlossaryMarkdown(survey);
    
    return {
      survey: survey
    };
  },
  beforeCreate() {
    const Survey = SurveyVue;
    surveyEnv.setCss(Survey);
  },
  created() {
    if (this.step.result.weaponsSurvey){
      this.survey.data = this.step.result.weaponsSurvey;
    }  
  },
  methods: {
    onPrev() {
      this.$store.dispatch("application/gotoPrevStepPage");
    },

    onNext() {
      if(!this.survey.isCurrentPageHasErrors) {
        this.$store.dispatch("application/gotoNextStepPage");
      }
    },

    onComplete() {
      this.$store.dispatch("application/setAllCompleted", true);
    }
  },
  props: {
    step: Step | Object,
  },
  watch: {
    pageIndex: function(newVal) {
      this.survey.currentPageNo = newVal;
    }
  },
  beforeDestroy() {
     this.$store.dispatch("application/updateStepResultData",{
      step: this.step,
      data:{weaponsSurvey: this.survey.data}
    })
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import "src/styles/common";
</style>