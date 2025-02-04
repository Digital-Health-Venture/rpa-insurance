<template>
  <!-- QR Scan Frame Corners -->
  <div class="absolute inset-0 pointer-events-none hidden md:flex">
    <!-- Top-Left Corner -->
    <div
      class="absolute top-20 left-20 w-6 h-6 md:w-8 md:h-8 border-t-2 border-l-2 border-white"
    ></div>
    <!-- Top-Right Corner -->
    <div
      class="absolute top-20 right-20 w-6 h-6 md:w-8 md:h-8 border-t-2 border-r-2 border-white"
    ></div>
    <!-- Bottom-Left Corner -->
    <div
      class="absolute bottom-20 left-20 w-6 h-6 md:w-8 md:h-8 border-b-2 border-l-2 border-white"
    ></div>
    <!-- Bottom-Right Corner -->
    <div
      class="absolute bottom-20 right-20 w-6 h-6 md:w-8 md:h-8 border-b-2 border-r-2 border-white"
    ></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    return {}
  },
})
</script>
