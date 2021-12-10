<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
      <router-view :key="key" />
    </transition>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    key() {
      return this.$route.path
    }
  }
}
</script>
<style>
.el-card {
    margin: 16px 0;
  box-shadow: 0 1px 1px rgb(0, 8, 10, 0.15);
	 /* box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1) */
}

.el-pagination{
  margin-top: 20px;
	  /* box-shadow: 0 1px 1px rgb(0, 8, 10, 0.15) !important; */
}
</style>

<style scoped>
.app-main {
  /*50 = navbar  */
  min-height: calc(100vh);
  /* min-height: calc(100vh - 50px); */
  width: 100%;
  position: relative;
  overflow: hidden;
  background-color: #eaedf1;
  background-color: #f8fbfdc5;
}
.fixed-header+.app-main {
  padding-top: 50px;
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
</style>
