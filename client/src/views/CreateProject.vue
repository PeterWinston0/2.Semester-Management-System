<template>
  <div>
    <Navigation />
    <h2>Create Project</h2>
    <form @submit.prevent="createProject">
      <!-- Step 1 -->
      <div v-if="currentStep === 1">
        <div>
          <label for="title">Title:</label>
          <input type="text" id="title" v-model="newProject.title" required />
        </div>
        <div>
          <label for="description">Description:</label>
          <textarea id="description" v-model="newProject.description" required></textarea>
        </div>
        <div>
          <label for="start_date">Start Date:</label>
          <datepicker v-model="newProject.start_date" required></datepicker>
        </div>
        <div>
          <label for="end_date">End Date:</label>
          <datepicker v-model="newProject.end_date" required></datepicker>
        </div>
        <button type="button" @click="nextStep">Next</button>
      </div>
      <!-- Step 2 -->
      <div v-else-if="currentStep === 2">
        <div>
          <label for="dropbox">Dropbox:</label>
          <input type="text" id="dropbox" v-model="newProject.dropbox" required />
        </div>
        <div>
          <label for="github">Github:</label>
          <input type="text" id="github" v-model="newProject.github" required />
        </div>
        <div>
          <label for="tech">Tech:</label>
          <input type="text" id="tech" v-model="newTech" />
          <button type="button" @click="addTech">Add</button>
        </div>
        <ul>
          <li v-for="(tech, index) in newProject.techs" :key="index">
            {{ tech.name }}
            <button type="button" @click="removeTech(index)">Remove</button>
          </li>
        </ul>
        <button type="button" @click="prevStep">Previous</button>
        <button type="submit">Create</button>
      </div>
    </form>
    <p v-if="successMessage" class="success-message">{{ successMessage }}</p>
  </div>
</template>

<script>
import Datepicker from "vue3-datepicker";
import Navigation from "../components/Navigation.vue";
import { useAuthStore } from "@/stores/auth";

export default {
  components: {
    Datepicker,
    Navigation,
  },
  data() {
    return {
      currentStep: 1,
      newProject: {
        title: "",
        description: "",
        start_date: null,
        end_date: null,
        dropbox: "",
        github: "",
        techs: [],
        userId: null, // Add userId field to the newProject data
      },
      newTech: "",
      successMessage: "",
    };
  },
  methods: {
    nextStep() {
      this.currentStep += 1;
    },
    prevStep() {
      this.currentStep -= 1;
    },
    addTech() {
      if (this.newTech) {
        this.newProject.techs.push({ name: this.newTech });
        this.newTech = "";
      }
    },
    removeTech(index) {
      this.newProject.techs.splice(index, 1);
    },
    async createProject() {
      try {
        const formattedStartDate = this.formatDate(this.newProject.start_date);
        const formattedEndDate = this.formatDate(this.newProject.end_date);

        const projectData = {
          ...this.newProject,
          start_date: formattedStartDate,
          end_date: formattedEndDate,
        };

        const response = await fetch("http://localhost:3000/api/project", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(projectData),
        });

        if (response.ok) {
          this.successMessage = "Project created successfully!";
          this.clearForm();

          const project = await response.json();
          this.$router.push({ name: "detail", params: { id: project._id } });
        } else {
          console.error("Failed to create project");
        }
      } catch (error) {
        console.error("Error creating project:", error);
      }
    },
    clearForm() {
      this.newProject.title = "";
      this.newProject.description = "";
      this.newProject.start_date = null;
      this.newProject.end_date = null;
      this.newProject.dropbox = "";
      this.newProject.github = "";
      this.newProject.techs = [];
    },
    formatDate(date) {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    },
  },
};
</script>

<style>
.success-message {
  color: green;
}
</style>