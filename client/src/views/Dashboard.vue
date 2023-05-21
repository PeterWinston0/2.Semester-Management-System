
<template>
  <div>
    <Navigation />
    <h1>Dashboard</h1>
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



<!-- <template>
  <div>
    <Navigation />
    <h1>Dashboard</h1>
    <p>Welcome, {{ userName }}</p>
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
    userName() {
      return useAuthStore().name; // Access the name property from the auth store
    },
  },
};
</script>

<style lang="scss" scoped></style> -->

<!-- <template>
  <div>
    <Navigation />
    <h1>Dashboard</h1>
    <ProjectList />
    <p v-if="isAuthenticated">Logged in as: {{ name }}</p> 
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
    isAuthenticated() {
      const auth = useAuthStore();
      return auth.isAuthenticated;
    },
    name() {
      const auth = useAuthStore();
      return auth.name;
    },
  },
};
</script>

<style lang="scss" scoped></style> -->



<!-- <template>
  <div>
    <Navigation />
    <h1>Dashboard</h1>
    <ProjectList />
  </div>
</template>

<script>
import Navigation from "../components/Navigation.vue";
import ProjectList from "../views/ProjectList.vue";
export default {
  components: {
    Navigation,
    ProjectList,
  },
};
</script>

<style lang="scss" scoped></style> -->
