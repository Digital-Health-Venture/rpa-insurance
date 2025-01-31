<template>
  <v-menu>
    <template v-slot:activator="{ props }">
      <div class="flex gap-x-[10px] sm:gap-x-[23px] items-center cursor-pointer" v-bind="props">
        <span class="font-avenir text-black text-[14px] sm:text-[16px] font-medium leading-normal"
          >Lorem ipsum</span
        >
        <ChevronDown color="#000" :size="24" />
      </div>
    </template>
    <!-- <v-list class="w-[300px] mt-6 py-0">
      <div class="flex flex-col ml-3 justify-center h-[95px]">
        <div class="flex gap-x-4">
          <CircleUserRound :size="42" class="text-gray-500" />
          <div class="flex flex-col">
            <span>{{ name }}</span>
            <span class="text-gray-400 text-wrap">{{ email }}</span>
            <div
              class="underline text-blue-400 text-sm mt-2 cursor-pointer"
              @click="navigateToUpdatePassword"
            >
              เปลี่ยนรหัสผ่าน
            </div>
          </div>
        </div>
      </div>
      <div class="border-b border-gray-600 rounded-lg"></div>
      <v-list-item @click="logout" class="hover:bg-[#ecfff2] h-[52px]">
        <v-list-item-title>
          <CustomIconButton name="LogOut" label="ออกจากระบบ" />
        </v-list-item-title>
      </v-list-item>
    </v-list> -->
  </v-menu>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
// import { useRouter } from "vue-router";

import { ChevronDown } from 'lucide-vue-next'

// import CustomIconButton from "./CustomIconButton.vue";

// import { useAuthentication } from "../stores/authentication";

// import { fetchUserDataById } from "../api/userApi";

export default defineComponent({
  components: {
    ChevronDown,
    // CircleUserRound,
    // CustomIconButton,
  },
  data() {
    return {
      name: '',
      firstName: '',
      lastName: '',
      email: '',
    }
  },
  // setup() {
  //   const router = useRouter();
  //   const { logout } = useAuthentication();

  //   const navigateToUpdatePassword = () => {
  //     router.push("/update-password");
  //   };

  //   return {
  //     logout,
  //     navigateToUpdatePassword,
  //   };
  // },
  // methods: {
  //   async fetchUserData(userId: string) {
  //     try {
  //       const userData = await fetchUserDataById(userId);
  //       if (userData) {
  //         this.name = userData.name;
  //         this.firstName = userData.firstName;
  //         this.lastName = userData.lastName;
  //         this.email = userData.email;
  //       }
  //     } catch (error) {
  //       console.error("Error fetching user data:", error);
  //     }
  //   },
  // },
  // mounted() {
  //   const userId = localStorage.getItem("id");
  //   if (userId) {
  //     this.fetchUserData(userId);
  //   }
  // },
})
</script>
