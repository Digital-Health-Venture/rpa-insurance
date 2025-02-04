<template>
  <div
    class="flex flex-col w-full border-blue-100 border-[1px] rounded-[25px] py-4 px-6 bg-blue-50 max-h-[300px] overflow-y-scroll mb-[22px]"
  >
    <HeaderInfoCard :name="name" :hn="hn" />
    <div class="border-[1px] border-gray-300 my-2"></div>
    
    <!-- InfoDetailBox for each date and detail -->
    <div v-for="(records, date) in details" :key="date" class="mt-2">
      <InfoDetailBox :date="date" :detail="records" />
    </div>
  </div>
</template>

<script lang="ts">
import HeaderInfoCard from './HeaderInfoCard.vue'
import InfoDetailBox from './InfoDetailBox.vue'

export default {
  setup() {},
  components: { HeaderInfoCard, InfoDetailBox },
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
  },
}
</script>

<style scoped></style>
