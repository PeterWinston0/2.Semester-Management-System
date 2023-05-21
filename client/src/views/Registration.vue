<template>
  <div>
    <h1>Registration</h1>
    <form @submit.prevent="register">
      <input type="text" v-model="name" placeholder="Name" />
      <input type="text" v-model="email" placeholder="Email" />
      <input type="password" v-model="password" placeholder="Password" />
      <button type="submit">Register</button>
    </form>
    <p>Already have an account? <router-link to="/login">Login</router-link></p>
  </div>
</template>

<script>
import { useAuthStore } from '../stores/auth';

export default {
  data() {
    return {
      name: '',
      email: '',
      password: '',
    };
  },
  methods: {
    async register() {
      const auth = useAuthStore();
      try {
        await auth.register({
          name: this.name,
          email: this.email,
          password: this.password,
        });
        this.$router.push('/dashboard');
      } catch (error) {
        console.error(error);
        // Handle registration error
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
