<template>
  <div class="flex flex-col gap-y-2">
    <span class="text-black font-prompt text-[18px] font-medium leading-normal">{{ date }}</span>
    <div
      v-for="(record, index) in detail"
      :key="index"
      class="text-black font-prompt text-[18px] font-normal leading-normal"
    >
      {{ record.time }} {{ record.list }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {},
  props: {
    date: {
      type: String,
      required: true,
    },
    detail: {
      type: Array as () => { time: string; list: string }[],
      required: true,
    },
  },
})
</script>
