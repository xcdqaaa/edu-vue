<template>
  <div>
    <el-descriptions
      title="教师详情"
      style="margin: 10px 16px; padding: 16px"
      :column="1"
    >
      <el-descriptions-item label="性别">{{
        userInfo.tgender
      }}</el-descriptions-item>
      <el-descriptions-item label="民族">{{
        userInfo.tnation
      }}</el-descriptions-item>
      <el-descriptions-item label="电话">{{
        userInfo.tphone
      }}</el-descriptions-item>
      <el-descriptions-item label="身份证号">{{
        userInfo.tidentity
      }}</el-descriptions-item>
      <el-descriptions-item label="籍贯">{{
        userInfo.tplace
      }}</el-descriptions-item>
      <el-descriptions-item label="政治面貌">{{
        userInfo.tpolitics
      }}</el-descriptions-item>
      <el-descriptions-item label="学历">{{
        userInfo.teducation
      }}</el-descriptions-item>
      <el-descriptions-item label="职称">{{
        userInfo.trank
      }}</el-descriptions-item>
      <el-descriptions-item label="出生日期">{{
        userInfo.tbirthday
      }}</el-descriptions-item>
      <el-descriptions-item label="入职日期">{{
        userInfo.tentrance
      }}</el-descriptions-item>
    </el-descriptions>
  </div>
</template>

<script>
export default {
  created() {
    this.getRequest("/teacher/info/" + 2).then((response) => {
      // console.log("/getuser", data);
      const { data } = response;
      // this.userDialogVisible = false;
      // this.getTeacherList();
      this.userInfo = data;
    });
  },

  data() {
    return {
      userInfo: "",
    };
  },
};
</script>

<style>
</style>