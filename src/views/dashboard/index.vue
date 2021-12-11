<template>
  <div class="dashboard-container"><router-view></router-view></div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  created() {
    const role = this.$store.state.user.roles[0];
    console.log(this.$store.state.user.roles[0]);
    if (role === "admin") {
      this.$router.replace("/dashboard-admin");
    } else if (role === "teacher") {
      this.$router.replace("/dashboard-teacher");
    } else if (role === "student") {
      this.$router.replace("/dashboard-student");
    }
  },
  name: "Dashboard",
  computed: {
    ...mapGetters(["name"]),
  },
};
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
