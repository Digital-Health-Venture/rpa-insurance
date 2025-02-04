<template>
  <div class="flex flex-col gap-y-2 w-full">
    <span class="text-black font-prompt text-[18px] font-normal leading-normal"
      >ประเภทการรักษา</span
    >
    <v-select
      v-model="localTreatmentTypeCode"
      :items="TREATMENT_TYPE_OPTIONS"
      item-title="label"
      item-value="code"
      variant="outlined"
      rounded="xl"
      placeholder="ประเภทการรักษา"
      color="#4BAEC5"
      menu-icon="mdi-chevron-down"
      @update:modelValue="updateTreatmentTypeCode"
    >
    </v-select>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import { TREATMENT_TYPE_OPTIONS } from '../../constants/options'

export default defineComponent({
  setup() {
    return {
      TREATMENT_TYPE_OPTIONS,
    }
  },
  props: {
    treatmentTypeCode: { type: String },
  },
  data() {
    return {
      localTreatmentTypeCode: this.treatmentTypeCode,
    }
  },
  created() {
    this.localTreatmentTypeCode = this.treatmentTypeCode
  },
  watch: {
    treatmentTypeCode(newVal) {
      this.localTreatmentTypeCode = newVal
    },
  },
  methods: {
    updateTreatmentTypeCode(newValue: string) {
      this.localTreatmentTypeCode = newValue
      this.$emit('recieve-treatment-type-code', newValue) // Emit the updated value
    },
  },
})
</script>
