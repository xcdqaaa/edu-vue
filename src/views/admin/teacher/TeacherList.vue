<template>
  <div>
    <el-card>
      <el-row :gutter="25">
        <el-col :span="4">
          <el-select
            v-model="college"
            placeholder="请选择"
            @change="getTeacherList"
          >
            <el-option
              v-for="item in colleges"
              :key="item.gid"
              :label="item.gname"
              :value="item.gid"
            >
            </el-option>
          </el-select>
        </el-col>

        <el-col :span="10">
          <el-input
            placeholder="请输入内容"
            clearable
            v-model="queryInfo.query"
            @clear="getTeacherList"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="getTeacherList"
            ></el-button>
          </el-input>
        </el-col>

        <!-- <el-col :span="4">
          <el-button type="primary" @click="addDialogVisible = true"
            >添加用户</el-button
          >
        </el-col> -->
      </el-row>
    </el-card>

    <!-- 表格 -->
    <el-table :data="teacherList" border stripe>
      <el-table-column type="selection" width="46"> </el-table-column>
      <!-- <el-table-column type="index"></el-table-column> -->
      <el-table-column label="工号" prop="tid" sortable></el-table-column>
      <el-table-column label="姓名" prop="tname"></el-table-column>
      <el-table-column label="学院" prop="tcollege"></el-table-column>
      <el-table-column label="操作"> </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="queryInfo.pageNumber"
      :page-sizes="[5, 10, 20, 100]"
      :page-size="queryInfo.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  created() {
    this.getTeacherList();
    this.getCollegeList();
  },
  data() {
    return {
      // 查询信息实体
      queryInfo: {
        query: "",
        pageNumber: 1,
        pageSize: 5,
      },
      teacherList: [], // 用户列表
      total: 0, // 查询总数
      updateUser: {},
      colleges: [],
      college: "",
    };
  },
  methods: {
    // 获取所有学生
    getTeacherList() {
      this.postRequest(
        "teacher/teachers?college=" + this.college,
        this.queryInfo
      ).then((response) => {
        // console.log(1111,data.obj.records);
        const { data } = response;
        this.teacherList = data.records;
        this.total = data.total;
        // console.log(2222,data.obj.records);
      });
    },
    getCollegeList() {
      this.getRequest("option/colleges").then((response) => {
        const { data } = response;
        this.colleges = data;
      });
    },
    handleSizeChange(newSize) {
      this.queryInfo.pageSize = newSize;
      this.getTeacherList();
    },
    handleCurrentChange(newPage) {
      console.log(newPage);
      this.queryInfo.pageNumber = newPage;
      this.getTeacherList();
    },

    showUpdateUser(id) {
      console.log(id);
      this.getUser(id);
      console.log(id);
      this.updateDialogVisible = true;
    },
    doUpdateUser() {
      this.postRequest("/updateuser", this.updateUser).then((data) => {
        console.log("/updateuser", data);
        this.updateUser = {};
        this.updateDialogVisible = false;
        this.getTeacherList();
      });
    },
    getUser(id) {
      this.getRequest("/getuser?id=" + id).then((data) => {
        console.log("/getuser", data);
        // this.addDialogVisible = false;
        // this.getTeacherList();
        this.updateUser = data.obj;
      });
    },
    // 删除用户
    deleteUser(id) {
      this.$confirm("此操作将永久删除用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.deleteRequest("user?id=" + id).then((data) => {
            console.log(data);
            this.getTeacherList();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
};
</script>

<style>
.el-breadcrumb {
  margin-bottom: 15px;
  font-size: 17px;
}
.el-card {
  box-shadow: 0 1px 1px rgb(0, 8, 10, 0.15) !important;
}
</style>
