<template>
  <div>
    <h1>Login</h1>
    <form @submit.prevent="login">
      <input type="text" v-model="email" placeholder="Email" />
      <input type="password" v-model="password" placeholder="Password" />
      <button type="submit">Login</button>
    </form>
    <p>Don't have an account? <router-link to="/registration">Register</router-link></p>
  </div>
</template>

<script>
import { useAuthStore } from '../stores/auth';

export default {
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    async login() {
      const auth = useAuthStore();
      try {
        await auth.login({
          email: this.email,
          password: this.password,
        });
        // Store the user's name in the authentication store
        this.$router.push('/dashboard');
      } catch (error) {
        console.error(error);
        // Handle login error
      }
    },
  },
};
</script>

<style scoped>
/* Your scoped styles here */
</style>