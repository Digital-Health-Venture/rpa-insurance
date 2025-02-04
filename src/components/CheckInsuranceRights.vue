<template>
  <div class="flex flex-col gap-y-[10px] justify-center items-center w-full">
    <span
      class="font-prompt text-[18px] text-black font-medium leading-normal mb-[22px]"
      v-if="!showConclusion && !isSent"
      >ตรวจสอบสิทธิ์ประกัน</span
    >

    <!-- Camera Preview -->
    <div class="camera-container">
      <v-dialog v-model="isCameraOpen" max-width="750px" persistent>
        <v-card>
          <v-card-title
            class="text-[14px] md:text-[18px] text-blue-100 font-prompt font-medium leading-normal ml-4 mt-4 text-center text-wrap"
          >
            กรุณาวาง Visit-Slip ไว้ตรงกลางหน้าจอ
          </v-card-title>

          <v-card-text class="relative">
            <!-- Camera Preview -->
            <video ref="video" class="w-full"></video>

            <!-- Scan Frame Corners -->
            <ScanFrame />

            <!-- Red Line for Guideline -->
            <div
              class="absolute top-1/2 left-6 right-6 border-t-[1px] border-red-500"
              style="transform: translateY(-50%)"
            ></div>

            <!-- Hidden Canvas -->
            <canvas ref="canvas" class="hidden"></canvas>
          </v-card-text>
          <v-card-actions class="mb-4 justify-center">
            <!-- Controls -->
            <v-btn
              variant="flat"
              color="#55C1BB"
              class="text-white font-prompt text-[18px] font-medium leading-8"
              rounded="pill"
              height="45"
              width="120"
              @click="closeCamera"
              >ปิด</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
    <div
      class="flex flex-col items-center sm:items-start mb-[22px] sm:mb-0 sm:flex-row gap-x-4 w-full"
      v-if="!showConclusion && !isSent"
    >
      <v-text-field
        class="search-field w-full text-black"
        variant="outlined"
        v-model="search"
        label="ค้นหาด้วย HN Number"
        prepend-inner-icon="mdi-magnify"
        rounded="xl"
        clearable
        @click:clear="search = ''"
        @focus="isFocused = true"
        @blur="isFocused = false"
        color="#4BAEC5"
        :error-messages="searchError ? [searchError] : []"
      >
        <template v-slot:append-inner>
          <div class="flex items-center">
            <!-- Vertical line -->
            <div v-if="isFocused" class="border-l border-gray-200 h-6 mx-2"></div>
            <!-- QR Scan Icon -->
            <v-icon
              class="cursor-pointer text-blue-100"
              :size="18"
              color="#4BAEC5"
              @click="handleCameraScanClick"
            >
              mdi-line-scan
            </v-icon>
          </div>
        </template>
      </v-text-field>

      <v-btn
        variant="flat"
        color="#55C1BB"
        class="text-white font-prompt text-[18px] font-medium leading-8"
        rounded="pill"
        height="56"
        width="222"
        @click="handleSearchConfirmClick"
      >
        ยืนยัน
      </v-btn>
    </div>

    <InformationCard
      :name="mockPatientData[0].name"
      :hn="mockPatientData[0].hn"
      :details="mockPatientData[0].details"
      v-if="!showConclusion && !isSent"
    />
    <TreatmentTypeDropdown
      :treatmentTypeCode="mockPatientData[0].treatmentTypeCode"
      @recieve-treatment-type-code="receiveTreatmentTypeCode"
      v-if="!showConclusion && !isSent"
    />
    <InsuranceCompanyDropdown
      @updateImages="handleImagesUpdate"
      v-if="!showConclusion && !isSent"
    />

    <div
      class="w-full bottom-0 bg-white shadow-m h-[118px] fixed flex justify-center items-center"
      v-if="hasImages"
    >
      <v-btn
        variant="flat"
        color="#55C1BB"
        class="text-white font-prompt text-[18px] font-medium leading-8 w-[280px] md:w-[421px]"
        rounded="pill"
        height="59"
        @click="handleConfirmClick"
      >
        ยืนยัน
      </v-btn>
    </div>

    <!-- Conclusion Section -->
    <img
      alt="back-button"
      src="@/assets/components/back-button.svg"
      width="62"
      height="62"
      class="cursor-pointer self-start"
      @click="goBack"
      v-if="showConclusion && !isSent"
    />
    <span
      class="text-center text-black font-prompt text-[24px] font-medium leading-normal mb-8"
      v-if="showConclusion && !isSent"
      >ตรวจสอบข้อมูล</span
    >
    <ConclusionCard
      v-if="showConclusion && !isSent"
      :name="mockPatientData[0].name"
      :hn="mockPatientData[0].hn"
      :details="mockPatientData[0].details"
      :treatmentTypeCode="selectedTreatmentTypeCode"
      :companies="updatedCompanies"
    />

    <div v-if="isSent" class="flex justify-center items-center mt-[100px]">
      <SuccessfullySentIcon />
    </div>
  </div>
</template>

<script lang="ts">
import { onUnmounted, ref, toRaw, watchEffect } from 'vue'

import InformationCard from './infoCard/InformationCard.vue'
import ConclusionCard from './infoCard/ConclusionCard.vue'

import TreatmentTypeDropdown from './dropdowns/TreatmentTypeDropdown.vue'
import InsuranceCompanyDropdown from './dropdowns/InsuranceCompanyDropdown.vue'

import SuccessfullySentIcon from './SuccessfullySentIcon.vue'

import ScanFrame from './ScanFrame.vue'

import { mockPatientData } from '../mocks/mockData'

import Quagga from '@ericblade/quagga2'

export default {
  data() {
    return {
      searchError: '', // waiting to set to be = ERROR_NOT_FOUND when no result from api
    }
  },
  setup() {
    const search = ref('')
    const isFocused = ref(false)

    const hasImages = ref(false)
    const showConclusion = ref(false) // Show conclusion card after confirmation
    const isSent = ref(false)

    const selectedTreatmentTypeCode = ref('')
    const updatedCompanies = ref<{ label: string; src: string; images: string[] }[]>([])

    const video = ref<HTMLVideoElement | null>(null)
    const canvas = ref<HTMLCanvasElement | null>(null)
    const isCameraOpen = ref(false)
    let stream: MediaStream | null = null

    const handleCameraScanClick = async () => {
      isCameraOpen.value = true
      try {
        stream = await navigator.mediaDevices.getUserMedia({ video: true })
        if (video.value) {
          video.value.srcObject = stream
          video.value.play() // Ensure the video starts playing
        }
        startScanning()
      } catch (err) {
        console.error('Error accessing the camera:', err)
      }
    }

    const startScanning = () => {
      if (!video.value) return

      Quagga.init(
        {
          inputStream: {
            type: 'LiveStream',
            target: video.value,
            constraints: {
              facingMode: 'environment', // Use back camera
            },
          },
          decoder: {
            readers: ['code_128_reader', 'ean_reader', 'ean_8_reader'],
          },
        },
        (err: any) => {
          if (err) {
            console.error('Error starting Quagga:', err)
            return
          }
          Quagga.start()
        },
      )

      Quagga.onDetected((result: any) => {
        if (result && result.codeResult) {
          console.log('Code detected:', result.codeResult.code)
          stopScanning()
        }
      })
    }

    const stopScanning = () => {
      Quagga.stop()
      closeCamera()
    }

    const closeCamera = () => {
      isCameraOpen.value = false
      if (stream) {
        stream.getTracks().forEach((track: any) => track.stop())
      }
      Quagga.stop()
    }

    onUnmounted(() => {
      Quagga.stop()
    })

    watchEffect(() => {
      if (!selectedTreatmentTypeCode.value) {
        selectedTreatmentTypeCode.value = mockPatientData[0].treatmentTypeCode
      }
    })

    function receiveTreatmentTypeCode(treatmentTypeCode: string) {
      selectedTreatmentTypeCode.value = treatmentTypeCode
    }

    function handleImagesUpdate(companies: { label: string; src: string; images: string[] }[]) {
      const rawCompanies = toRaw(companies)
      updatedCompanies.value = rawCompanies

      hasImages.value = companies.some((company) => company.images && company.images.length > 0)
    }
    function handleConfirmClick() {
      if (showConclusion.value) {
        // Send data to API after conclusion is shown
        sendConclusionDataToAPI()
      } else {
        showConclusion.value = true
      }
    }
    function sendConclusionDataToAPI() {
      // Data to be sent to the API
      const conclusionData = {
        name: mockPatientData[0].name,
        hn: mockPatientData[0].hn,
        details: mockPatientData[0].details,
        treatmentTypeCode: selectedTreatmentTypeCode.value,
        companies: updatedCompanies.value,
      }

      console.log('Payload sent to API:', conclusionData)
      // Call API
      // axios.post('/api/endpoint', conclusionData)
      //   .then(response => {
      //     console.log('Data successfully sent:', response.data)
      //   })
      //   .catch(error => {
      //     console.error('Error sending data:', error)
      //   })

      // Simulating a successful API call response
      setTimeout(() => {
        isSent.value = true
        console.log('Data successfully sent!')
      }, 1000)

      // After successful API call response >> clear state and back to home page
      setTimeout(() => {
        isSent.value = false
        showConclusion.value = false
        hasImages.value = false
        console.log('Back to home page')
      }, 2000)
    }

    function goBack() {
      showConclusion.value = false
      hasImages.value = false
    }

    return {
      search,
      isFocused,
      mockPatientData,
      updatedCompanies,
      hasImages,
      showConclusion,
      selectedTreatmentTypeCode,
      receiveTreatmentTypeCode,
      handleImagesUpdate,
      handleConfirmClick,
      goBack,
      isSent,
      video,
      canvas,
      isCameraOpen,
      handleCameraScanClick,
      closeCamera,
    }
  },
  methods: {
    handleSearchConfirmClick() {
      console.log('Search confirmed')
    },
  },
  components: {
    InformationCard,
    TreatmentTypeDropdown,
    InsuranceCompanyDropdown,
    ConclusionCard,
    SuccessfullySentIcon,
    ScanFrame,
  },
}
</script>
