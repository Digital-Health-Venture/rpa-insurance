<script lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";

import NavBar from "./components/NavBar.vue";

export default {
  components: {
    NavBar,
  },
  setup() {
    const route = useRoute();
    const isLoginPage = computed(() => route.name === "loginView");

    return {
      isLoginPage,
    };
  },
};
</script>

<template>
  <div class="max-w-[834px] h-screen flex overflow-x-scroll min-w-[320px] w-full">
    <div class="flex flex-col w-full items-center h-screen">
      <NavBar v-if="!isLoginPage" class="w-full" />
      <!-- Main content area -->
      <router-view :class="{ 'mt-[63px] w-full': !isLoginPage }" />
    </div>
  </div>
</template>
