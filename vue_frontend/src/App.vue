<template>
  <div id="app">
    <nav class="navbar navbar-expand navbar-dark bg-dark">
      <router-link v-if="isLoggedIn()" to="/" class="navbar-brand">Erik</router-link>
      <div class="navbar-nav mr-auto">
        <li v-if="isLoggedIn()" class="nav-item">
          <router-link to="/texts" class="nav-link">Texts</router-link>
        </li>
        <li v-if="isLoggedIn()" class="nav-item">
          <router-link to="/add" class="nav-link">Add</router-link>
        </li>
        <li v-if="!isLoggedIn()" class="nav-item">
          <router-link to="/login" class="nav-link">Log in</router-link>
        </li>
        <li v-if="!isLoggedIn()" class="nav-item">
          <router-link to="/register" class="nav-link">Create account</router-link>
        </li>
        <li v-if="isLoggedIn()" class="nav-item">
          <router-link to="/graph" class="nav-link">Graphql</router-link>
        </li>
        <li v-if="isLoggedIn()" class="nav-item">
          <router-link to="/invite" class="nav-link">Mail invite</router-link>
        </li>
        <li v-if="isLoggedIn()">
          <button type="submit" class="btn btn-link"
              @click="logout();">
              Logout
              </button>
        </li>
      </div>
    </nav>

    <div class="container mt-3">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  name: "app",
  methods: {
    logout() {
      localStorage.removeItem('user');
      this.$router.push("/login");
    },

    isLoggedIn() {
      return localStorage.getItem("user") !== null;
    }
  }
};
</script>
