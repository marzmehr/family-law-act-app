<template>
    <step-base v-bind:step="step">
        <getting-started v-bind:step="step" v-if="step.currentPage == 0"></getting-started>        
    </step-base>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
  
import StepBase from "../StepBase.vue";
import GettingStarted from "./GettingStarted.vue";
import { stepInfoType } from "@/types/Application";


@Component({
    components:{
        StepBase,
        GettingStarted
    }
})

export default class GetStarted extends Vue {
    
    @Prop({required: true})
    step!: stepInfoType;

    forms = []
    selectedForms = []
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import "../../../styles/survey";
</style>
