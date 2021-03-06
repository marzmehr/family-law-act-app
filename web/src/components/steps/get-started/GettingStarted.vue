<template>
  <page-base v-on:onPrev="onPrev()" v-on:onNext="onNext()" v-on:onComplete="onComplete()">
    <div v-if="dataReady" class="row">
      <div class="col-md-12 order-heading">
        <div v-if="returningUser">
            <h1 >I need help with the following family law issues:</h1>          
            <p>Select all that apply.</p>
        </div>
        <div v-else>          
            <h1 >What are you asking for (Orders)?</h1>
            <p>Please select each option you want to ask the court for an order about. You will be asked to give more details later.</p>
        </div>
        <div>
            <div class="m-4 text-primary" @click="showLegalAssistance= !showLegalAssistance" style="border-bottom:1px solid; width:19rem;">
                <span style='font-size:1.2rem;' class="fa fa-question-circle" /> Where can I get legal assistance? 
                <span v-if="showLegalAssistance" class='ml-2 fa fa-chevron-up'/>
                <span v-if="!showLegalAssistance" class='ml-2 fa fa-chevron-down'/>
            </div>
            <div v-if="showLegalAssistance" class="mx-4 mb-5 mt-3">
                Understanding the law and making sure you get correct information is important. If you get the wrong information or do not know how the law applies to your situation, it can be harder to resolve your case. Getting advice from a lawyer can help.<br/><br/><b>Lawyers:</b> To find a lawyer or to have a free consultation with a lawyer for up to 30 minutes, contact the <a href='https://www.cbabc.org/For-the-Public/Lawyer-Referral-Service' target="_blank">Lawyer Referral Service</a> at 1-800-663-1919<br/><br/><b>Legal Aid, Duty Counsel and Family Advice Lawyers:</b> To find out if you qualify for free legal advice or representation, contact <a href='https://lss.bc.ca/legal_aid/howToApply.php' target="_blank">Legal Aid BC</a> at <p style='display:inline-block'>1-866-577-2525.</p><br/><br/><b>Legal Services and Resources:</b> Visit <a href='https://www.clicklaw.bc.ca/helpmap' target="_blank">Clicklaw</a> at <a href='https://www.clicklaw.bc.ca/helpmap' target="_blank">www.clicklaw.bc.ca/helpmap</a> to find other free and low-cost legal services in your community
            </div>
        </div>
        <div>
            <b-form-group>
                <b-form-checkbox-group
                v-model="selected"
                @change="onChange"
                name="orders"
                stacked
                >
                <div class="checkbox-border">
                    <b-form-checkbox value="protectionOrder"><div class="checkbox-choices">Protection from family violence</div>
                    <p v-if="returningUser">
                        Applying for a protection order, to change an existing protection order or to terminate
                        an existing protection made under Part 9 of the Family Law Act.
                    </p>
                    <p v-else>
                        When a family member makes another family member feel unsafe, this is called <tooltip title="family violence" index="0" />.
                        A protection order is the order made by a court to help protect one family member from another family member.
                    </p>
                    </b-form-checkbox>
                </div>

                <div class="checkbox-border">
                    <b-form-checkbox value="familyLawMatter">  
                    <span v-if="returningUser"><div class="checkbox-choices">Family Law Matters including parenting arrangements, child support, contact with a 
                        child, guardianship of a child and spousal support under the <i>Family Law Act.</i></div>
                        <p>
                        Applying for an application for a new order, to change an order, or to cancel an order about
                        a Family Law Matter.
                        </p>
                    </span>
                    <span v-else><div class="checkbox-choices">Family law matter</div>
                        <p>
                        Family law matters include: parenting arrangements (<tooltip title="parental responsibilities" :index="0"/> and <tooltip title="parenting time" :index="0"/>), <tooltip title="child support" :index="0"/>, <tooltip title="contact with a child" :index="0"/>, 
                        <tooltip title="guardianship of a child" index="0"/> and <tooltip title="spousal support" index="0" />.
                        </p>
                    </span>
                    </b-form-checkbox>
                </div>

                <div class="checkbox-border">
                    <b-form-checkbox value="caseMgmt">
                    <div class="checkbox-choices">Case management</div>
                    <p>
                        Case management includes administrative or procedural things that need to be done in a court case (usually by a specific time or in a specific way).
                        Sometimes you need to get a case management order from the court to allow you to do something, or to make someone else do something so that you can continue the court case.
                    </p>
                    </b-form-checkbox>
                </div>

                <div class="checkbox-border">
                    <b-form-checkbox value="priorityParenting">
                    <div class="checkbox-choices">Priority parenting matter</div>
                    <p>
                        <tooltip title="Priority parenting matters" :index="0"/> are decisions about a child or children that require the agreement of each of the child's guardians or an order from the court and it is
                        priority to get the order before, or separate from, any family law matter order(s). There is a limited list of priority parenting matters. You can ask for other parenting matter orders you may need
                        under family law matters.
                    </p>
                    </b-form-checkbox>
                </div>

                <div class="checkbox-border">
                    <b-form-checkbox value="childReloc">
                    <div class="checkbox-choices">Relocation of a child</div>
                    <p>
                        If you have a written agreement or order about parenting arrangements for a child and the other guardian is relocating with a child, you can apply to the court
                        to prohibit the relocation. If you do not have a written agreement or order about parenting arrangements you may need an order about a family law matter or priority
                        parenting matter depending on your circumstances to prevent changes to a child's residence.
                    </p>
                    </b-form-checkbox>
                </div>

                <div class="checkbox-border">
                    <b-form-checkbox value="agreementEnfrc">
                    <div class="checkbox-choices">Enforcement of agreements and court orders</div>
                    <p>If you have a written agreement or court order that the other party is not following, you can ask the court to help enforce it.</p>
                    </b-form-checkbox>
                </div>
                </b-form-checkbox-group>
            </b-form-group>
        </div>
      </div>
    </div>

        <b-modal size="xl" v-model="preparationInfo" header-class="bg-white" no-close-on-backdrop hide-header-close>
            <template v-slot:modal-title>
                <h1 class="mb-0 text-primary">What you need to get started:</h1>
            </template>
            <div class="m-3">
                <p>Try to collect as much information as possible before you start to complete the pathway.</p>
                <p>The type of information and documents you need will depend on what you are asking the court for.</p>
                <p>You might need:</p>
                <ul>
                    <li>
                        birth dates, names, and other related information about the other party and your children
                    </li>
                    <li>
                        any agreements or court orders you already have about a family law matter
                    </li>
                    <li>
                        information about the date you got married, started living together, separated and got divorced, if applicable                       
                    </li>
                    <li>
                        if you are asking for child or spousal support, information about your income and, if you have it, the other party’s income                       
                    </li>
                    <li>
                        if you are asking for orders about children, information about your children’s living arrangements, schedules and expenses                       
                    </li>
                </ul>
            </div>
            <template v-slot:modal-footer>
                <b-button variant="primary" @click="closePreparationInfo">Continue</b-button>
            </template>            
        </b-modal>


    </page-base>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import PageBase from "../PageBase.vue";
import { stepInfoType, stepResultInfoType } from "@/types/Application";

import { namespace } from "vuex-class";   
import "@/store/modules/application";
const applicationState = namespace("Application");

import Tooltip from "@/components/survey/Tooltip.vue";

@Component({
    components:{
        PageBase,
        Tooltip
    }
})
export default class GettingStarted extends Vue {
    
    @Prop({required: true})
    step!: stepInfoType;

    @applicationState.State
    public steps!: any

    @applicationState.State
    public types!: string[]

    @applicationState.Action
    public UpdateApplicationType!: (newApplicationType: string[]) => void

    @applicationState.Action
    public UpdateGotoPrevStepPage!: () => void

    @applicationState.Action
    public UpdateGotoNextStepPage!: () => void

    @applicationState.Action
    public UpdateStepResultData!: (newStepResultData: stepResultInfoType) => void

    
    @applicationState.State
    public pathwayCompleted!: any
    
    @applicationState.Action
    public UpdatePathwayCompletedFull!: (changedpathway) => void
    
    @applicationState.Action
    public checkAllCompleted!: () => void
  
    selected = []
    returningUser = false
    showLegalAssistance = false
    preparationInfo = false
    poOnly = false;
    poIncluded = false;
    currentStep=0;
    currentPage=0;
    dataReady = false;

    mounted(){ 
        this.dataReady = false;
        this.preparationInfo = false;
        this.reloadPageInformation()
    }

    public reloadPageInformation(){               
        this.currentStep = this.$store.state.Application.currentStep;
        this.currentPage = this.$store.state.Application.steps[this.currentStep].currentPage;

        if (this.steps[0].result && this.steps[0].result['selectedForms']) {
            this.selected = this.steps[0].result['selectedForms'];
        }

        this.returningUser = (this.$store.state.Application.userType == 'returning');        

        const progress = this.selected.length==0? 50 : 100;
        Vue.filter('setSurveyProgress')(null, this.currentStep, this.currentPage, progress, false);
        
        //console.log(this.selected)

        this.dataReady = true;
    }
  
    public onChange(selectedForms) {
        //console.log(selectedForms)
        
        const applicationTypes = [];       
            
        for (const form of selectedForms){                    
            applicationTypes.push(this.getApplicationType(form));
        }
        // console.log(applicationTypes)
        // console.log(Array.from(new Set(applicationTypes)));
        this.UpdateApplicationType(Array.from(new Set(applicationTypes)));
        
        this.setSteps(selectedForms);
        this.resetSelectedFormsCompeleted(selectedForms);
        this.resetProgressOfAllPages(selectedForms);
    }

    public getApplicationType(selectedOrder){
        
        let orgFPOType = ''
        if (this.steps[1].result && this.steps[1].result.questionnaireSurvey && this.steps[1].result.questionnaireSurvey.orderType){
            orgFPOType = this.steps[1].result.questionnaireSurvey.orderType;
        } 

        return Vue.filter('getFullOrderName')(selectedOrder, orgFPOType);
    }

    public setSteps(selectedForms) {
        //console.log("GETTING STARTED")
        if (selectedForms !== undefined) {            
            //console.log(selectedForms)
            this.poOnly = (selectedForms.length == 1 && selectedForms.includes("protectionOrder"));
            this.poIncluded = selectedForms.includes("protectionOrder");           

            //this.toggleCommonSteps(selectedForms.length>0);
            this.toggleSteps(1, selectedForms.includes("protectionOrder"));
            this.toggleSteps(3, selectedForms.includes("familyLawMatter"));
            this.toggleSteps(4, selectedForms.includes("caseMgmt"));
            this.toggleSteps(5, selectedForms.includes("priorityParenting"));
            this.toggleSteps(6, selectedForms.includes("childReloc"));
            this.toggleSteps(7, selectedForms.includes("agreementEnfrc"));

            this.toggleSteps(8, selectedForms.length>0);//Review And Submit
            
            this.toggleSteps(2, selectedForms.includes("familyLawMatter"));//Common Your Information
            this.togglePages(2, [0], !this.poIncluded);//Safety Check
            this.$store.commit("Application/setCurrentStepPage", {currentStep: 2, currentPage: (this.poIncluded?1:0) });//correct Safety Check page in sidebar
            this.togglePages(2, [1,2,3], selectedForms.length>0 && !this.poOnly);//Your Information, Other Party, Filing Location
        }
    }

    public resetSelectedFormsCompeleted(selectedForms){
        const pathwayCompleted = this.pathwayCompleted
        //if(!selectedForms.includes("protectionOrder"))  {Vue.filter('setSurveyProgress')(null, 1, 13, 0, false);}
        pathwayCompleted["protectionOrder"] = false;
        //if(!selectedForms.includes("familyLawMatter"))   
        pathwayCompleted["familyLawMatter"] = false;
        //if(!selectedForms.includes("caseMgmt"))          
        pathwayCompleted["caseMgmt"] = false;
        //if(!selectedForms.includes("priorityParenting")) 
        pathwayCompleted["priorityParenting"] = false;
        //if(!selectedForms.includes("childReloc"))        
        pathwayCompleted["childReloc"] = false;
        //if(!selectedForms.includes("agreementEnfrc"))    
        pathwayCompleted["agreementEnfrc"] = false;
        this.UpdatePathwayCompletedFull(pathwayCompleted);
        this.checkAllCompleted();
        //this.$store.commit("Application/setAllCompleted", false)

    }

    public resetProgressOfAllPages(selectedForms){

        for(const step of this.$store.state.Application.steps){
            if(step.id == 2 && selectedForms.includes("protectionOrder"))
                this.$store.commit("Application/setCurrentStepPage", {currentStep: step.id, currentPage: 1 });   
            else 
                this.$store.commit("Application/setCurrentStepPage", {currentStep: step.id, currentPage: 0 });               

            for(const page of step.pages){               
               this.$store.commit("Application/setPageProgress", { currentStep: step.id, currentPage:page.key, progress:0 });
            }
        }

    }

    public toggleSteps(stepId, activeIndicator) {       
        this.$store.commit("Application/setStepActive", {
            currentStep: stepId,
            active: activeIndicator
        });
    }

    public togglePages(step, pages, activeIndicator) {
        for(let i=0; i<pages.length; i++) {
            
            this.$store.commit("Application/setPageActive", {
                currentStep: step,
                currentPage: pages[i],
                active: (activeIndicator)
            });
        }
    }

    public onPrev() {
        this.UpdateGotoPrevStepPage();
    }

    public onNext() {       
        if (this.selected.includes("familyLawMatter")){
            this.preparationInfo = true;
        } else {
            this.UpdateGotoNextStepPage();
        }               
    }

    public closePreparationInfo(){
        this.preparationInfo = false;
        this.UpdateGotoNextStepPage();
    }
  
    beforeDestroy() {
        const progress = this.selected.length==0? 50 : 100;
        Vue.filter('setSurveyProgress')(null, this.currentStep, this.currentPage, progress, true);
        this.UpdateStepResultData({step:this.step, data: {selectedForms: this.selected}})
    }
};
</script>

<style lang="scss">
@import "../../../styles/survey";
.checkbox-border {
  border: 1px solid rgba($gov-mid-blue, 0.3);
  border-radius: 15px;
  padding: 15px;
  margin-top: 10px;
  margin-bottom: 8px;
}
.checkbox-choices{
  margin-bottom: 10px;
  font-weight: bold;
  font-size: 17px;
}

input {
  padding-left: 20px;
}
</style>
