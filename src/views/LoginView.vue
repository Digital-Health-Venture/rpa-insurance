<template>
  <div class="w-full h-screen overflow-scroll flex flex-col justify-center bg-[#FFFFFF]">
    <!-- <LoginForm /> -->
    <img alt="doctor-frame" src="@/assets/components/doctor-frame.svg" width="393" height="311" />
    <div class="text-black font-avenir">Login</div>
    <!-- Login with BDMS Email -->
    <div class="flex flex-col gap-y-4 items-center">
      <div
        class="w-[591px] h-[67px] bg-white rounded-[15px] shadow-s flex justify-center items-center"
      >
        <img alt="app-logo" src="@/assets/logo/bdms.svg" width="79" height="29" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
// import LoginForm from "../components/forms/LoginForm.vue";

export default {
  name: 'loginView',
  components: {
    // LoginForm,
  },
}
</script>
