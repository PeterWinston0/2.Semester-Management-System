<template>
  <div>
    <nav>
      <!--<RouterLink to="/">Home</RouterLink>-->
      <RouterLink to="/dashboard">Dashboard</RouterLink>
      <RouterLink to="/create">Create</RouterLink>
      <RouterLink to="/userlist">Userlist</RouterLink>
      <!--<RouterLink to="/list">Projects</RouterLink>-->
      
      <Logout />
    </nav>
  </div>
</template>

<script setup>
import Logout from '../components/Logout.vue'

</script>

<style lang="scss" scoped></style>
