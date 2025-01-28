<template>
  <v-dialog v-model="isVisible" max-width="433px" max-height="254px" persistent>
    <v-card rounded="xl">
      <div class="flex flex-col justify-center items-center">
      <v-card-text>
        <div class="text-black font-prompt text-center text-[20px] font-normal leading-normal mt-[14px]">
          {{ header }}
        </div>
      </v-card-text>
      <v-card-text
        ><div class="text-center text-black font-prompt text-[16px] font-normal leading-normal max-w-[228px]">
          {{ description }}
        </div></v-card-text
      >
      <v-card-actions class="flex flex-col-reverse sm:flex-row justify-center px-4 py-4 mb-[14px]">
        <v-btn
          variant="flat"
          color="#BFBFBF"
          class="text-white w-[180px] min-h-[50px]"
          rounded="pill"
          @click="cancel"
        >
          ยกเลิก
        </v-btn>
        <v-btn
          variant="flat"
          color="#55C1BB"
          class="text-white w-[180px] min-h-[50px]"
          rounded="pill"
          @click="confirm"
        >
          {{ confirmButtonText }}
        </v-btn>
      </v-card-actions>
    </div>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'ConfirmationModal',
  props: {
    header: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    confirmButtonText: {
      type: String,
      required: true,
    },
  },
  emits: ['cancel', 'confirm'],
  setup(_, { emit }) {
    const isVisible = ref(true)

    const cancel = () => {
      isVisible.value = false
      emit('cancel')
    }

    const confirm = () => {
      isVisible.value = false
      emit('confirm')
    }

    return {
      isVisible,
      cancel,
      confirm,
    }
  },
})
</script>

<style scoped></style>
