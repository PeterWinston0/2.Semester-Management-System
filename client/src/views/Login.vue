<template>
    <h1>Login</h1>
    <form @submit.prevent="login">
      <input type="text" v-model="email" placeholder="Email" />
      <input type="password" v-model="password" placeholder="Password" />
      <button type="submit">Login</button>
    </form>
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
          this.$router.push('/dashboard');
        } catch (error) {
          console.error(error);
          // Handle login error
        }
      },
    },
  };
  </script>
  

<style lang="scss" scoped>

</style>