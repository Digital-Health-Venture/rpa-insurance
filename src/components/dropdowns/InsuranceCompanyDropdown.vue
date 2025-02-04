<template>
  <div
    class="flex flex-col gap-y-2 w-full"
    :class="{
      'mb-[118px]': hasImage,
    }"
  >
    <span class="text-black font-prompt text-[18px] font-normal leading-normal">บริษัทประกัน</span>
    <div
      class="flex flex-col items-center sm:items-start mb-[22px] sm:mb-0 sm:flex-row gap-x-4 w-full"
    >
      <v-combobox
        v-model="selectedCompany"
        clearable
        :items="INSURANCE_COMPANY_OPTIONS"
        item-title="label"
        item-value="label"
        variant="outlined"
        rounded="xl"
        placeholder="กรอกชื่อบริษัทประกัน"
        color="#4BAEC5"
        prepend-inner-icon="mdi-magnify"
        @focus="isFocused = true"
        @blur="isFocused = false"
        menu-icon=""
        class="w-full"
        :error-messages="searchError ? [searchError] : []"
      >
        <template v-slot:append-inner>
          <div class="flex items-center">
            <!-- Vertical line -->
            <div v-if="isFocused" class="border-l border-gray-200 h-6 mx-2"></div>
            <!-- Camera scan icon -->
            <v-icon
              class="cursor-pointer text-blue-100"
              :size="18"
              color="#4BAEC5"
              @click="handleCameraClick"
            >
              mdi-camera-outline
            </v-icon>

            <!-- Camera Preview for เพิ่มประกัน -->
            <div class="camera-container">
              <v-dialog v-model="isCameraOpen" max-width="750px" persistent>
                <v-card>
                  <v-card-title
                    class="text-[18px] text-blue-100 font-prompt font-medium leading-normal ml-4 mt-4"
                  >
                    เพิ่มประกัน
                  </v-card-title>

                  <div v-if="!capturedImage">
                    <v-card-text class="relative">
                      <video ref="video" class="w-full"></video>

                      <!-- Hidden Canvas -->
                      <canvas ref="canvas" class="hidden"></canvas>

                      <!-- Scan Frame Corners -->
                      <ScanFrame />
                    </v-card-text>
                    <v-card-actions class="mb-4 justify-center">
                      <v-btn
                        variant="flat"
                        color="#BFBFBF"
                        class="text-white font-prompt text-[18px] font-medium leading-8 w-[90px] md:w-[120px]"
                        rounded="pill"
                        height="45"
                        @click="closeCamera"
                        >ปิด</v-btn
                      >
                      <v-btn
                        variant="flat"
                        color="#55C1BB"
                        class="text-white font-prompt text-[18px] font-medium leading-8 w-[90px] md:w-[120px]"
                        rounded="pill"
                        height="45"
                        @click="captureImage"
                        >ถ่ายภาพ</v-btn
                      >
                    </v-card-actions>
                  </div>
                  <div class="relative w-full" v-else>
                    <v-card-text class="relative">
                      <img :src="capturedImage" class="w-full object-cover" />
                    </v-card-text>
                    <v-card-actions class="mb-4 justify-center">
                      <v-btn
                        variant="flat"
                        color="#BFBFBF"
                        class="text-white font-prompt text-[18px] font-medium leading-8 w-[90px] md:w-[120px]"
                        rounded="pill"
                        height="45"
                        @click="cancelCapture"
                        >ยกเลิก</v-btn
                      >
                      <v-btn
                        variant="flat"
                        color="#55C1BB"
                        class="text-white font-prompt text-[18px] font-medium leading-8 w-[90px] md:w-[120px]"
                        rounded="pill"
                        height="45"
                        @click="confirmCapture"
                        >ยืนยัน</v-btn
                      >
                    </v-card-actions>
                  </div>
                </v-card>
              </v-dialog>
            </div>
          </div>
        </template>
        <!-- Companies Options -->
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
      <v-btn
        variant="flat"
        color="#55C1BB"
        class="text-white font-prompt text-[18px] font-medium leading-8"
        rounded="pill"
        height="56"
        width="222"
        @click="handleAddCompanyClick"
        :disabled="!selectedCompany"
      >
        เพิ่มประกัน
      </v-btn>
    </div>

    <!-- Render cards for selected insurance companies -->
    <div
      v-for="(company, index) in selectedCompanies"
      :key="company.label"
      class="mb-4 p-4 border-[1px] border-blue-100 rounded-[25px] px-6 py-4 bg-blue-50"
    >
      <div class="flex flex-col sm:flex-row items-center justify-between py-2 gap-y-2 sm:gap-y-0">
        <div class="flex items-center gap-x-2">
          <img :src="company.src" width="35" height="35" />
          <span class="text-black text-[18px] font-normal font-prompt leading-normal mr-4">{{
            company.label
          }}</span>
          <div
            class="text-[18px] text-blue-100 font-prompt font-medium leading-normal cursor-pointer hover:underline"
            @click="openModal(company)"
          >
            {{ company.label === 'กรุณาเพิ่มข้อมูล' ? 'เพิ่มข้อมูล' : 'แก้ไข' }}
          </div>
        </div>
        <div class="flex items-center">
          <div
            class="text-[18px] text-blue-100 font-prompt font-medium leading-normal cursor-pointer hover:underline"
          >
            <span @click="openCamera(company)">+ เพิ่มรูปภาพ</span>
          </div>

          <div class="border-l border-gray-200 h-6 mx-[17px]"></div>
          <img
            alt="del-cross-icon"
            src="@/assets/icons/del-cross-icon.svg"
            width="24"
            height="24"
            class="cursor-pointer"
            @click="removeCompany(index)"
          />
        </div>
      </div>

      <div class="border-[1px] border-gray-200 my-2" v-if="company.images.length"></div>
      <div
        class="font-prompt text-black text-[18px] font-normal leading-normal mb-2"
        v-if="company.images.length"
      >
        รูปแนบ
        <span
          :class="{
            'text-red-500': company.images.length === 4,
            'text-black': company.images.length !== 4,
          }"
        >
          ({{ company.images.length }}/4)
        </span>
      </div>

      <!-- Small Size Image Previewer  -->
      <div v-if="company.images.length" class="flex flex-row w-full gap-x-2">
        <div
          v-for="(image, imgIndex) in company.images"
          :key="imgIndex"
          class="relative border-[1px] border-blue-100 rounded-[15px] w-[99px] h-[99px] flex justify-center items-center"
        >
          <img
            :src="image"
            alt="Uploaded"
            width="91"
            height="91"
            @click="openFullPreview(company, imgIndex)"
          />
          <img
            alt="del-cross-icon"
            src="@/assets/icons/del-cross-icon.svg"
            width="24"
            height="24"
            class="absolute top-1 right-1 cursor-pointer"
            @click="((showModal = true), (imageToDelete = { company, imgIndex }))"
          />
        </div>
      </div>
    </div>

    <!-- Camera preview for เพิ่มรูปภาพ -->
    <v-dialog v-model="cameraDialog" max-width="750px" persistent>
      <v-card>
        <v-card-title
          class="text-[18px] text-blue-100 font-prompt font-medium leading-normal ml-4 mt-4"
        >
          เพิ่มรูปภาพ
        </v-card-title>
        <v-card-text class="relative">
          <!-- Video Element -->
          <video ref="videoElement" autoplay class="w-full"></video>
          <!-- Scan Frame Corners -->
          <ScanFrame />
        </v-card-text>
        <v-card-actions class="mb-4 justify-center">
          <v-btn
            variant="flat"
            color="#BFBFBF"
            class="text-white font-prompt text-[18px] font-medium leading-8 w-[90px] md:w-[120px]"
            rounded="pill"
            height="45"
            @click="closeCameraDialog"
          >
            ยกเลิก
          </v-btn>
          <v-btn
            variant="flat"
            color="#55C1BB"
            class="text-white font-prompt text-[18px] font-medium leading-8 w-[90px] md:w-[120px]"
            rounded="pill"
            height="45"
            @click="takePhoto"
          >
            ถ่ายภาพ
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Full-Size Image Previewer -->
    <v-dialog v-model="isFullPreviewOpen" max-width="750px">
      <v-card>
        <v-card-title>
          <div class="flex justify-between items-center mx-4 mt-4">
            <span
              class="text-[14px] md:text-[18px] text-blue-100 font-prompt font-medium leading-normal text-center text-wrap"
              >ตัวอย่างรูปภาพ</span
            >

            <v-icon class="cursor-pointer" @click="closeFullPreview">mdi-close</v-icon>
          </div>
        </v-card-title>

        <v-card-text class="relative">
          <img :src="currentCompany?.images[currentImageIndex]" class="w-full object-contain" />
        </v-card-text>
        <v-card-actions>
          <div class="grid grid-cols-3 mb-4 justify-center w-full">
            <div class="flex flex-row gap-x-2 items-center col-start-2 justify-center">
              <v-icon
                class="cursor-pointer"
                @click="prevImage"
                :disabled="currentImageIndex === 0"
                size="32"
              >
                mdi-chevron-left
              </v-icon>
              <span
                class="text-[14px] md:text-[18px] text-gray-300 font-prompt font-medium leading-normal text-center text-wrap"
              >
                {{ currentImageIndex + 1 }}/{{ currentCompany?.images.length }}
              </span>
              <v-icon
                class="cursor-pointer"
                @click="nextImage"
                :disabled="currentImageIndex === (currentCompany?.images?.length || 0) - 1"
                size="32"
              >
                mdi-chevron-right
              </v-icon>
            </div>

            <v-icon
              class="cursor-pointer col-start-3 justify-self-end mr-4"
              @click="openDeleteModal(currentImageIndex)"
              color="#ef4444"
              size="32"
            >
              mdi-trash-can-outline
            </v-icon>
          </div>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Confirmation Modal -->
    <ConfirmationModal
      v-if="showModal"
      :header="'ยืนยันการลบข้อมูล'"
      description="โปรดตรวจสอบข้อมูลอีกครั้ง การลบข้อมูลไม่สามารถย้อนกลับได้"
      confirmButtonText="ยืนยัน"
      @cancel="handleCancel"
      @confirm="handleConfirm"
    />

    <!-- AddInsuranceInfoModal component for adding/editing the insurance company -->
    <AddInsuranceInfoModal
      v-if="isModalVisible"
      @cancel="closeModal"
      @confirm="handleAddCompanyClick"
    />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onUnmounted, ref } from 'vue'

import { INSURANCE_COMPANY_OPTIONS } from '../../constants/options'

import type { Company, SelectedCompany } from '../../types/Company'

import ConfirmationModal from '../modals/ConfirmationModal.vue'
import AddInsuranceInfoModal from '../modals/AddInsuranceInfoModal.vue'

import ScanFrame from '../ScanFrame.vue'

export default defineComponent({
  components: { ConfirmationModal, AddInsuranceInfoModal, ScanFrame },
  setup(_, { emit }) {
    const searchError = ref('') // waiting to set to be = ERROR_NOT_FOUND when no result from api
    const isFullPreviewOpen = ref(false)
    const currentImageIndex = ref(0)
    const currentCompany = ref<SelectedCompany | null>(null)

    const isEditing = ref(false) // Flag to track if editing an existing company

    // Image Fullsize preview
    const openFullPreview = (company: any, index: number) => {
      currentCompany.value = company
      currentImageIndex.value = index
      isFullPreviewOpen.value = true
    }

    const closeFullPreview = () => {
      isFullPreviewOpen.value = false
      currentCompany.value = null
    }

    const nextImage = () => {
      if (
        currentCompany.value &&
        currentImageIndex.value < currentCompany.value.images.length - 1
      ) {
        currentImageIndex.value++
      }
    }

    const prevImage = () => {
      if (currentImageIndex.value > 0) {
        currentImageIndex.value--
      }
    }

    const handleDeleteImage = () => {
      if (currentCompany.value) {
        currentCompany.value.images.splice(currentImageIndex.value, 1)
        closeFullPreview()
      }
      showModal.value = false
    }

    const isFocused = ref(false) // Flag for checking vertical line in search bar
    const showModal = ref(false) // Flag for checking state opening confirmation modal

    const selectedCompany = ref<Company | null>(null)
    const companyToRemoveIndex = ref<number | null>(null) // Store the index of the company to remove
    const selectedCompanies = ref<SelectedCompany[]>([])

    // Camera preview for เพิ่มรูปภาพ
    const cameraDialog = ref(false)
    const videoElement = ref<HTMLVideoElement | null>(null)
    let stream: MediaStream | null = null

    const emitUpdatedImages = () => {
      emit('updateImages', selectedCompanies.value)
    }

    const handleAddCompanyClick = (updatedCompany: any) => {
      if (isEditing.value) {
        // Editing an existing company
        const index = selectedCompanies.value.findIndex(
          (company) => company.label === currentCompany.value?.label,
        )

        if (index !== -1 && updatedCompany) {
          selectedCompanies.value[index] = { ...updatedCompany, images: [] } // Replace company
        }
      } else {
        // Adding a new company
        const company = INSURANCE_COMPANY_OPTIONS.find(
          (item) => item.label === selectedCompany.value?.label,
        )

        if (company) {
          selectedCompanies.value.push({
            ...company,
            images: [],
          })
        } else {
          selectedCompanies.value.push({
            label: 'กรุณาเพิ่มข้อมูล',
            src: '@/assets/icons/no-data.svg', // No data icon
            images: [],
          })
        }
      }

      emitUpdatedImages()
      selectedCompany.value = null
      isModalVisible.value = false
      isEditing.value = false
    }

    const handleEditClick = (company: SelectedCompany) => {
      console.log('Edit clicked for:', company.label)
    }

    const handleCaptureImage = (event: Event, company: SelectedCompany) => {
      if (company.images.length >= 4) {
        alert('You can only upload up to 4 images.')
        return // Prevent limit is reached
      }

      const input = event.target as HTMLInputElement
      if (input.files && input.files[0]) {
        const reader = new FileReader()
        reader.onload = () => {
          company.images.push(reader.result as string)
          emitUpdatedImages()
        }
        reader.readAsDataURL(input.files[0]) // image file as a data URL
      }
    }

    const removeCompany = (index: number) => {
      companyToRemoveIndex.value = index // Store the index of the company to remove
      showModal.value = true // Show the confirmation modal
    }

    const removeImage = (company: SelectedCompany, imgIndex: number) => {
      company.images.splice(imgIndex, 1)
      emitUpdatedImages()
    }

    const openCamera = async (company: any) => {
      if (company.images.length >= 4) {
        alert('You can only upload up to 4 images.')
        return
      }

      currentCompany.value = company
      cameraDialog.value = true

      try {
        stream = await navigator.mediaDevices.getUserMedia({ video: true })
        if (videoElement.value) {
          videoElement.value.srcObject = stream
        }
      } catch (error) {
        console.error('Error opening camera:', error)
      }
    }

    const takePhoto = () => {
      if (!videoElement.value) return

      const canvas = document.createElement('canvas')
      canvas.width = videoElement.value.videoWidth
      canvas.height = videoElement.value.videoHeight

      const ctx = canvas.getContext('2d')
      ctx?.drawImage(videoElement.value, 0, 0, canvas.width, canvas.height)

      const imageData = canvas.toDataURL('image/png')
      currentCompany.value?.images.push(imageData)
      emit('updateImages', selectedCompanies.value)

      closeCameraDialog()
    }

    const closeCameraDialog = () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop())
      }
      cameraDialog.value = false
      stream = null
    }

    const isDeleteImage = ref(false) // Flag to check delete for modal confirmation
    const imageToDelete = ref<{ company: any; imgIndex: number } | null>(null)

    const handleConfirm = () => {
      if (isDeleteImage.value && currentCompany.value) {
        // Handle image deletion
        removeImage(currentCompany.value, currentImageIndex.value)
        isDeleteImage.value = false
        closeFullPreview()
      } else if (!isDeleteImage.value && companyToRemoveIndex.value !== null) {
        selectedCompanies.value.splice(companyToRemoveIndex.value, 1) // Remove the company
        companyToRemoveIndex.value = null // Reset the index
        emitUpdatedImages()
      } else if (imageToDelete.value) {
        const { company, imgIndex } = imageToDelete.value
        removeImage(company, imgIndex)
      }
      showModal.value = false // Close the modal
      imageToDelete.value = null
    }

    // Cancel modal
    const handleCancel = () => {
      companyToRemoveIndex.value = null // Reset the index
      showModal.value = false // Close the modal
    }

    const handleCapturedImage = (image: string) => {
      const companyIndex = selectedCompanies.value.findIndex(
        (company) => company.label === selectedCompany.value?.label,
      )

      if (companyIndex !== -1) {
        // Ensure the company does not exceed the image limit
        if (selectedCompanies.value[companyIndex].images.length < 4) {
          selectedCompanies.value[companyIndex].images.push(image)
          emitUpdatedImages() // Emit updated images
        } else {
          console.warn('Image limit reached for this company.')
        }
      } else {
        console.warn('Company not found to add image.')
      }
    }

    // Camera Preview for เพิ่มประกัน
    const video = ref<HTMLVideoElement | null>(null)
    const canvas = ref<HTMLCanvasElement | null>(null)
    const isCameraOpen = ref(false)
    const capturedImage = ref<string | null>(null)
    let mediaStream: MediaStream | null = null

    const handleCameraClick = async () => {
      if (mediaStream) {
        mediaStream.getTracks().forEach((track) => track.stop())
      }

      isCameraOpen.value = true
      try {
        mediaStream = await navigator.mediaDevices.getUserMedia({
          video: true,
        })
        if (video.value) {
          video.value.srcObject = mediaStream
          video.value.play()
        }
      } catch (err) {
        console.error('Error accessing the camera:', err)
      }
    }

    const closeCamera = () => {
      isCameraOpen.value = false
      if (mediaStream) {
        mediaStream.getTracks().forEach((track) => track.stop())
      }
    }

    const captureImage = () => {
      if (canvas.value && video.value) {
        const ctx = canvas.value.getContext('2d')
        if (ctx) {
          canvas.value.width = video.value.videoWidth
          canvas.value.height = video.value.videoHeight
          ctx.drawImage(video.value, 0, 0)
          capturedImage.value = canvas.value.toDataURL('image/png')
        }
      }
      if (mediaStream) {
        mediaStream.getTracks().forEach((track) => track.stop())
      }
    }

    const confirmCapture = () => {
      console.log('Captured Image Confirmed:', capturedImage.value)
      closeCamera()
    }

    const cancelCapture = () => {
      capturedImage.value = null
      handleCameraClick()
    }

    onUnmounted(() => {
      closeCamera()
    })

    // AddInsuranceInfoModal modal
    const isModalVisible = ref(false) // Flag for checking state opening AddInsuranceInfoModal modal

    const openModal = (company: SelectedCompany | null) => {
      if (company) {
        // Set the selected company for editing
        currentCompany.value = company
        isEditing.value = true
      } else {
        isEditing.value = false // Not editing, adding a new company
      }
      isModalVisible.value = true
    }

    const closeModal = () => {
      isModalVisible.value = false
      isEditing.value = false
    }

    const hasImage = computed(() =>
      selectedCompanies.value.some((company) => company.images.length > 0),
    )

    const openDeleteModal = (index: number) => {
      currentImageIndex.value = index
      isDeleteImage.value = true
      showModal.value = true // Show the confirmation modal
    }

    return {
      isFocused,
      selectedCompany,
      selectedCompanies,
      handleAddCompanyClick,
      handleEditClick,
      handleCaptureImage,
      removeCompany,
      removeImage,
      INSURANCE_COMPANY_OPTIONS,
      openCamera,
      showModal,
      handleCancel,
      handleConfirm,
      handleCapturedImage,
      video,
      canvas,
      isCameraOpen,
      handleCameraClick,
      closeCamera,
      captureImage,
      capturedImage,
      confirmCapture,
      cancelCapture,
      hasImage,
      takePhoto,
      closeCameraDialog,
      cameraDialog,
      videoElement,
      isModalVisible,
      openModal,
      closeModal,
      openDeleteModal,
      openFullPreview,
      closeFullPreview,
      nextImage,
      prevImage,
      handleDeleteImage,
      searchError,
      isFullPreviewOpen,
      currentImageIndex,
      currentCompany,
      imageToDelete,
    }
  },
})
</script>
