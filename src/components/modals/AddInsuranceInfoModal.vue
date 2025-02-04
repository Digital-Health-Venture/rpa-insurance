<template>
  <v-dialog v-model="isVisible" max-width="554px" max-height="345px" persistent>
    <v-card rounded="xl">
      <div class="flex flex-col justify-center items-center">
        <v-card-text>
          <div
            class="text-black font-prompt text-center text-[20px] font-normal leading-normal mt-[14px]"
          >
            ข้อมูลประกัน
          </div>
        </v-card-text>

        <div class="flex flex-col gap-y-[11px] w-full px-[31px]">
          <span class="text-black font-prompt text-[18px] font-normal leading-normal"
            >บริษัทประกัน</span
          >
          <v-combobox
            v-model="selectedCompany"
            clearable
            :items="INSURANCE_COMPANY_OPTIONS"
            item-title="label"
            item-value="label"
            variant="outlined"
            rounded="xl"
            placeholder="ค้นหาเลือกบริษัทประกัน"
            color="#4BAEC5"
            prepend-inner-icon="mdi-magnify"
            menu-icon=""
            class="w-full"
            :error-messages="searchError ? [searchError] : []"
          >
            <template #item="{ item, props }">
              <v-list-item v-bind="props">
                <template #title>
                  <div class="flex flex-row items-center gap-x-2">
                    <img :src="item.raw.src" width="35" height="35" /> {{ item.raw.label }}
                  </div>
                </template>
              </v-list-item>
            </template>
          </v-combobox>
        </div>

        <v-card-actions
          class="flex flex-col-reverse sm:flex-row justify-center gap-x-[25px] px-4 py-4 mb-[14px] w-full"
        >
          <v-btn
            variant="flat"
            color="#BFBFBF"
            class="text-white w-[230px] min-h-[50px]"
            rounded="pill"
            @click="cancel"
          >
            ยกเลิก
          </v-btn>
          <v-btn
            variant="flat"
            color="#55C1BB"
            class="text-white w-[230px] min-h-[50px]"
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

import { INSURANCE_COMPANY_OPTIONS } from '../../constants/options'

import type { Company } from '../../types/Company'

export default defineComponent({
  name: 'AddInsuranceInfoModal',
  emits: ['cancel', 'confirm'],
  data() {
    return {
      searchError: '', // waiting to set to be = ERROR_NOT_FOUND when no result from api
    }
  },
  setup(_, { emit }) {
    const isVisible = ref(true)

    const selectedCompany = ref<Company | null>(null)

    const cancel = () => {
      isVisible.value = false
      emit('cancel')
    }

    const confirm = () => {
      isVisible.value = false
      emit('confirm', selectedCompany.value);
    }

    return {
      isVisible,
      cancel,
      confirm,
      INSURANCE_COMPANY_OPTIONS,
      selectedCompany,
    }
  },
})
</script>

<style scoped></style>
