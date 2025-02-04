<template>
  <div
    class="flex flex-col gap-y-4 w-full border-blue-100 border-[1px] rounded-[25px] py-4 px-6 bg-blue-50 overflow-y-scroll mb-[150px]"
  >
    <span class="text-black font-prompt text-[24px] font-normal leading-norma">ข้อมูลลูกค้า</span>
    <span class="text-black font-prompt text-[18px] font-normal leading-normal"
      >คุณ {{ name }}</span
    >
    <span class="text-blue-100 font-prompt text-[20px] font-medium leading-normal">{{ hn }}</span>

    <div class="border-[1px] border-gray-300"></div>

    <div v-for="(records, date) in details" :key="date" class="mt-2">
      <span class="text-black font-prompt text-[18px] font-medium leading-normal">{{ date }}</span>

      <div
        v-for="(record, index) in records"
        :key="index"
        class="text-black font-prompt text-[18px] font-normal leading-normal"
      >
        {{ record.time }} {{ record.list }}
      </div>
    </div>

    <span class="text-black font-prompt text-[24px] font-normal leading-norma">ประเภทการรักษา</span>
    <div class="text-black font-prompt text-[18px] font-normal leading-normal">
      {{ treatmentTypeLabel }}
    </div>

    <span class="text-black font-prompt text-[24px] font-normal leading-norma">บริษัทประกัน</span>

    <div v-for="(company, index) in companies" :key="index" class="flex flex-row gap-x-2">
      <img alt="company-icon" :src="company.src" width="35" height="35" />
      <span class="text-black font-prompt text-[18px] font-normal leading-norma">{{
        company.label
      }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'

import { TREATMENT_TYPE_OPTIONS } from '../../constants/options'

export default defineComponent({
  setup(props) {
    const treatmentTypeLabel = computed(() => {
      const type = TREATMENT_TYPE_OPTIONS.find((option) => option.code === props.treatmentTypeCode)
      return type ? type.label : 'ไม่ทราบประเภทการรักษา'
    })

    return {
      treatmentTypeLabel,
    }
  },
  props: {
    name: {
      type: String,
      required: true,
    },
    hn: {
      type: String,
      required: true,
    },
    details: {
      type: Object as () => Record<string, { time: string; list: string }[]>,
      required: true,
    },
    treatmentTypeCode: {
      type: String,
      required: true,
    },
    companies: {
      type: Array as () => { label: string; src: string }[],
      required: true,
    },
  },
})
</script>
