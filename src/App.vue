<template>
  <div class="app">
    <v-app>
      <v-layout justify-center v-if="loading">
        <v-progress-circular indeterminate color="blue"></v-progress-circular>
      </v-layout>
      <router-view v-else />
    </v-app>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      loading: true,
    };
  },
  created() {
    let person = localStorage.getItem("user");
    if (null != person) {
      this.$store.commit("auth/SET_USER_PROFILE", person);
      if (this.$route.path == "/login") this.$router.push("/");
      this.loading = false;
    } else {
      if (this.$route.path != "/login") this.$router.push("/login");
      this.loading = false;
    }
  },
};
</script>

<style lang="scss">
.app {
  height: 100%;
  width: 100%;
}
</style>
