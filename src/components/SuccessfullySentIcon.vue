<template>
  <div
    class="w-full overflow-scroll flex flex-col items-center justify-center gap-y-[22px]"
  >
    <img alt="check-icon" src="@/assets/icons/check-icon.svg" width="71" height="71" />
    <div class="text-green-700 font-prompt text-[24px] font-medium leading-normal">
      บันทึกข้อมูลสำเร็จ
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {},
  props: {},
})
</script>
