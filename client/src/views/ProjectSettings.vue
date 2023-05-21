<template>
  <div>
    <h2>Project Settings</h2>

    <label for="title">Title:</label>
    <input type="text" id="title" v-model="title" />

    <label for="description">Description:</label>
    <textarea id="description" v-model="description"></textarea>

    <label for="dropbox">Dropbox:</label>
    <input type="text" id="dropbox" v-model="dropbox" />

    <label for="github">GitHub:</label>
    <input type="text" id="github" v-model="github" />

    <h3>Technologies:</h3>
    <ul>
      <li v-for="(tech, index) in techs" :key="index">
        {{ tech.name }}
        <button type="button" @click="removeTech(index)">Remove</button>
      </li>
    </ul>

    <input type="text" v-model="newTechnology" placeholder="Add new technology" />
    <button type="button" @click="addTech">Add Technology</button>

    <button @click="saveProjectSettings">Save</button>
    <button @click="cancelProjectSettings">Cancel</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: "",
      description: "",
      dropbox: "",
      github: "",
      techs: [],
      newTechnology: "",
    };
  },

  async mounted() {
    try {
      const projectId = this.$route.params.id;
      const response = await fetch(
        `http://localhost:3000/api/project/${projectId}`
      );
      const data = await response.json();
      this.title = data.title;
      this.description = data.description;
      this.dropbox = data.dropbox;
      this.github = data.github;
      this.techs = data.techs;
    } catch (error) {
      console.error("Error fetching project:", error);
    }
  },

  methods: {
    addTech() {
      if (this.newTechnology.trim() !== "") {
        this.techs.push({ name: this.newTechnology.trim() });
        this.newTechnology = ""; // Clear the input field
      }
    },

    removeTech(index) {
      this.techs.splice(index, 1);
    },

    async saveProjectSettings() {
      try {
        const projectId = this.$route.params.id;
        const payload = {
          title: this.title,
          description: this.description,
          dropbox: this.dropbox,
          github: this.github,
          techs: this.techs,
        };
        await fetch(`http://localhost:3000/api/project/${projectId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });
        console.log('Project settings saved successfully.');
      } catch (error) {
        console.error('Error saving project settings:', error);
      }
    },

    cancelProjectSettings() {
      this.$router.go(-1); // Navigates back to the previous page
      console.log("Project settings editing cancelled.");
    },
  },
};
</script>
