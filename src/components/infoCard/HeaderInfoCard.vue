<template>
  <div class="flex flex-col gap-y-2">
    <span class="text-black font-prompt text-[18px] font-normal leading-normal"
      >คุณ {{ name }}</span
    >
    <span class="text-blue-100 font-prompt text-[20px] font-medium leading-normal">{{ hn }}</span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {},
  props: {
    name: {
      type: String,
      required: true,
    },
    hn: {
      type: String,
      required: true,
    },
  },
})
</script>
