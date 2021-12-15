<template>
  <div>
    <el-card>
      <el-avatar
        shape="square"
        :size="66"
        :fit="fit"
        :src="url"
        style="margin: 10px 16px"
      ></el-avatar>
      <el-descriptions style="margin: 10px 16px; font-size: 16px" :column="1">
        <el-descriptions-item label="学号">{{ 195588 }}</el-descriptions-item>
        <el-descriptions-item label="密码">123456</el-descriptions-item>
      </el-descriptions>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fit: "cover",
      url: "http://localhost:8888/files/avatar/aaa.jpg",
    };
  },
};
</script>

<style>
</style>