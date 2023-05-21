<!-- <template>
  <div>
    <Navigation />
    <h1 class="text-purple-600">Dashboard</h1>
    <p>Welcome, {{ name }}</p>
    <ProjectList />
  </div>
</template>

<script>
import { useAuthStore } from '../stores/auth';
import ProjectList from "../views/ProjectList.vue";
import Navigation from "../components/Navigation.vue";

export default {
  components: {
    ProjectList,
    Navigation,
  },
  computed: {
    name() {
      const authStore = useAuthStore(); // Access the auth store
      return authStore.getName;
    },
  },
};
</script>

<style lang="scss" scoped></style> -->





<template>
  <div>
    <Navigation />
    <h1 class="text-purple-600">Dashboard</h1>
    <p>Welcome, {{ name }}</p>
    <ProjectList />
  </div>
</template>

<script>
import { useAuthStore } from '../stores/auth';
import Navigation from "../components/Navigation.vue";
import ProjectList from "../views/ProjectList.vue";

export default {
  components: {
    Navigation,
    ProjectList,
  },
  computed: {
    name() {
      return useAuthStore().$state.name; // Access the name property from the auth store state
    },
  },
};
</script>

<style lang="scss" scoped></style>

