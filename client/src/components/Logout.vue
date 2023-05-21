<template>
  <button @click="logout">Logout</button>
</template>

<script>
import { useAuthStore } from "../stores/auth";

export default {
  methods: {
    logout() {
      const auth = useAuthStore();
      auth.logout();
      this.$router.push("/login");
    },
  },
};
</script>
