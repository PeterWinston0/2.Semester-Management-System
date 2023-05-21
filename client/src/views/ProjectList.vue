<template>
  <div class="p-4">
    <!--<Navigation />-->
    <h2 class="text-2xl font-bold mb-4">Project List</h2>
    <div class="flex flex-wrap -mx-4">
      <div v-for="project in projects" :key="project._id" class="w-full md:w-1/2 lg:w-1/4 px-4 mb-4 relative">
        <div class="border h-full p-4 flex flex-col">
          <router-link :to="`/${project._id}`" class="text-blue-500 hover:underline">{{ project.title }}</router-link>
          <p class="mt-1">End Date: {{ project.end_date }}</p>
          <p class="mt-1">Status: {{ getProjectStatus(project.end_date) }}</p>
          <div class="mt-auto">
            <button @click="deleteProject(project._id)" class="px-4 py-2 bg-red-500 text-white rounded">Delete</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//import Navigation from "../components/Navigation.vue";
export default {
  components: {
    //Navigation,
  },
  data() {
    return {
      projects: [],
    };
  },
  mounted() {
    this.fetchProjects();
  },
  methods: {
    fetchProjects() {
      fetch("http://localhost:3000/api/project")
        .then((response) => response.json())
        .then((data) => {
          this.projects = data;
        })
        .catch((error) => {
          console.error("Error fetching projects:", error);
        });
    },
    deleteProject(projectId) {
      fetch(`http://localhost:3000/api/project/${projectId}`, {
        method: "DELETE",
      })
        .then((response) => {
          if (response.ok) {
            console.log("Project deleted successfully!");
            this.projects = this.projects.filter((project) => project._id !== projectId);
          } else {
            console.error("Failed to delete project.");
          }
        })
        .catch((error) => {
          console.error("Error deleting project:", error);
        });
    },
    getProjectStatus(endDate) {
      const today = new Date();
      const projectEndDate = new Date(endDate);

      if (projectEndDate < today) {
        return "Overdue";
      } else {
        return "Ongoing";
      }
    },
  },
};
</script>

<style>
/* Styles for the project list */
</style>
