<template>
  <div>
    <h1>User List</h1>
    <ul>
      <li v-for="user in users" :key="user._id">{{ user.name }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      users: [],
    };
  },
  mounted() {
    this.fetchUsers();
  },
  methods: {
    async fetchUsers() {
      try {
        const response = await fetch("http://localhost:3000/api/user/find");
        const data = await response.json();
        this.users = data;
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
