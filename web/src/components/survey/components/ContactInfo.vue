<template>
  <div class="survey-contactinfo">
    <div class="row">
      <div
        class="col-sm-4"
        :class="{ 'pb-1': !field.desc }"
        v-for="field of fields"
        :key="field.name"
      >
        <label class="survey-sublabel" :for="field.id">{{ field.label }}</label>
        <input
          class="form-control"
          :id="field.id"
          :data-test-id="field.name"
          v-model="pendingValue[field.name]"
        />
        <p v-if="field.desc" class="survey-desc small">{{ field.desc }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { Question } from "survey-vue";

export default {
  props: {
    question: Question
  },
  data() {
    return {
      fields: this.makeFields(),
      pendingValue: Object.assign({}, this.question.value),
      value: this.question.value
    };
  },
  watch: {
    pendingValue: {
      handler(val) {
        const currentVal = this.question.value || {};
        let updatedVal = {};
        let empty = true;
        let changed = false;
        for (const field of this.fields) {
          const v = (updatedVal[field.name] = (val[field.name] || "").trim());
          if (v.length) empty = false;
          if ((currentVal[field.name] || "") !== v) changed = true;
        }
        if (this.question.isRequired && !updatedVal["phone"]) empty = true; // require phone number
        if (changed) this.question.value = empty ? null : updatedVal;
      },
      deep: true
    }
  },
  methods: {
    makeFields() {
      const q = this.question;
      const fields = [
        {
          name: "phone",
          label: q.labelPhone || "Phone",
          id: q.inputId,
          desc: q.descPhone
        },
        {
          name: "email",
          label: q.labelEmail || "Email",
          id: q.inputId + "-email",
          desc: q.descEmail
        },
        {
          name: "fax",
          label: q.labelFax || "Fax",
          id: q.inputId + "-fax",
          desc: q.descFax
        }
        
      ];
      return fields;
    }
  },
  mounted() {
    const q = this.question;
    q.valueChangedCallback = () => {
      if (q.value) {
        this.pendingValue = Object.assign({}, q.value);
      }
      this.value = q.value;
    };
  }
};
</script>
