<template>
  <v-dialog v-model="isVisible" max-width="433px" max-height="254px" persistent>
    <v-card rounded="xl">
      <div class="flex flex-col justify-center items-center">
        <v-card-text>
          <div
            class="text-black font-prompt text-center text-[20px] font-normal leading-normal mt-[14px] text-wrap"
          >
            เกิดข้อผิดพลาด
          </div>
        </v-card-text>
        <v-card-text
          ><div
            class="text-center text-black font-prompt text-[16px] font-normal leading-normal max-w-[320px] text-wrap"
          >
            กรุณาลองใหม่อีกครั้งหรือใช้วิธีกรอกข้อมูลแทน
          </div></v-card-text
        >
        <v-card-actions class="w-full flex justify-center px-4 py-4 mb-[14px]">
          <v-btn
            variant="flat"
            color="#55C1BB"
            class="text-white w-[359px] min-h-[50px]"
            rounded="pill"
            @click="confirm"
          >
            ยืนยัน
          </v-btn>
        </v-card-actions>
      </div>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'ErrorModal',
  emits: ['confirm'],
  setup(_, { emit }) {
    const isVisible = ref(true)

    const confirm = () => {
      isVisible.value = false
      emit('confirm')
    }

    return {
      isVisible,
      confirm,
    }
  },
})
</script>

<style scoped></style>
