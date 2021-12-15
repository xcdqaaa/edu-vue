<template>
  <div>
    <el-card>
      <el-descriptions
        title="学生信息"
        style="margin: 10px 16px; padding: 16px"
        :column="1"
      >
        <el-descriptions-item label="性别">{{
          userInfo.sgender
        }}</el-descriptions-item>
        <el-descriptions-item label="民族">{{
          userInfo.snation
        }}</el-descriptions-item>
        <el-descriptions-item label="电话">{{
          userInfo.sphone
        }}</el-descriptions-item>
        <el-descriptions-item label="身份证号">{{
          userInfo.sidentity
        }}</el-descriptions-item>
        <el-descriptions-item label="籍贯">{{
          userInfo.splace
        }}</el-descriptions-item>
        <el-descriptions-item label="政治面貌">{{
          userInfo.spolitics
        }}</el-descriptions-item>
        <el-descriptions-item label="学籍号">{{
          userInfo.senrollment
        }}</el-descriptions-item>
        <el-descriptions-item label="出生日期">{{
          userInfo.sbirthday
        }}</el-descriptions-item>
        <el-descriptions-item label="入职日期">{{
          userInfo.sentrance
        }}</el-descriptions-item>
      </el-descriptions>
    </el-card>
  </div>
</template>

<script>
export default {
  created() {
    this.getRequest("/student/info/" + 11).then((response) => {
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