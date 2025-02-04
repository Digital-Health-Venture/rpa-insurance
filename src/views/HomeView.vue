<template>
  <div
    class="flex flex-col items-center justify-center px-[20px] sm:px-[61.5px] max-w-[834px] min-w-[320px] w-full"
  >
    <div class="flex flex-row justify-between items-center w-full mt-[20px] mb-[57.5px]">
      <div class="flex flex-row gap-x-[11.27px]">
        <img alt="map-pin" src="@/assets/icons/map-pin.svg" width="15" height="18" />
        <span
          class="font-avenir text-teal-200 text-[14px] sm:text-[16px] font-normal leading-normal"
          >Samitivej Srinakarin</span
        >
      </div>
      <span class="font-prompt text-[12px] sm:text-[14px] text-black font-normal leading-normal"
        >14 มิ.ย. 67 : 09.00 น.</span
      >
    </div>
    <div class="w-full"><CheckInsuranceRights /></div>
  </div>
</template>

<script lang="ts">
import CheckInsuranceRights from '../components/CheckInsuranceRights.vue'

import { defineComponent } from 'vue'

export default defineComponent({
  name: 'homeView',
  components: { CheckInsuranceRights },
})
</script>

<style scoped></style>
