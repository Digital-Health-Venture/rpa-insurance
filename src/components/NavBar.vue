<template>
  <div
    class="fixed top-0 left-0 right-0 bg-teal-50 flex items-center justify-center h-[63px] z-10"
  >
    <div class="flex justify-between w-full h-full items-center max-w-[834px] min-w-[320px] px-[20px] sm:px-[61.5px]">
      <!-- Samitivej Logo -->
      <img alt="samitivej-logo" src="@/assets/logo/Samitivej_Logo.svg" width="108" height="43" />

      <!-- Profile Section -->
      <div class="flex flex-row gap-x-[10px] sm:gap-x-[23px]">
        <div class="hidden sm:flex">
          <img alt="avatar" src="@/assets/icons/avatar.svg" width="34" height="34" />
        </div>
        <!-- User Dropdown Menu -->
        <UserDropdown />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import UserDropdown from './dropdowns/UserDropdown.vue'

export default {
  components: { UserDropdown },
}
</script>

<style scoped></style>
