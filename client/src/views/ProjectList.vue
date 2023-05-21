<template>
  <div>
    <h2>Project List</h2>
    <ul>
      <li v-for="project in projects" :key="project._id">
        <router-link :to="`/${project._id}`">{{ project.title }}</router-link>
        <p>End Date: {{ project.end_date }}</p>
        <p>Status: {{ getProjectStatus(project.end_date) }}</p>
        <button @click="deleteProject(project._id)">Delete</button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
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
