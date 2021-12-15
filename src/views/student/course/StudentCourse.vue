<template>
  <div>
    <el-card>
      <el-row :gutter="25">
        <!-- 学院列表 -->
        <el-col :span="4">
          <!-- 学院选择 -->
          <el-select
            v-model="term"
            placeholder="选择学院"
            @change="getLessonList"
          >
            <el-option
              v-for="item in terms"
              :key="item.pid"
              :label="item.pname"
              :value="item.pid"
            >
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="10">
          <el-input
            placeholder="请输入内容"
            clearable
            v-model="queryInfo.query"
            @clear="getLessonList"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="getLessonList"
            ></el-button>
          </el-input>
        </el-col>
      </el-row>
    </el-card>
    <el-table :data="lessonList" border>
      <el-table-column type="selection" width="46"> </el-table-column>
      <!-- <el-table-column type="index"></el-table-column> -->
      <el-table-column
        label="课程号"
        prop="lid"
        sortable
        width="88"
      ></el-table-column>
      <el-table-column label="课程名" prop="lname"></el-table-column>
      <el-table-column label="学科名" prop="lsubject"></el-table-column>
      <el-table-column label="班级">
        <template slot-scope="scope">
          <!-- {{scope}} -->
          <el-tag
            style="margin: 2px"
            v-for="item in scope.row.lclasses"
            :key="item.cid"
            :type="mtype[item.ctype - 1]"
            size="small"
          >
            {{ item.cname }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="学分" prop="lcrs"></el-table-column>
      <el-table-column label="学期" prop="lterm"></el-table-column>
      <el-table-column label="地点" prop="lplace"></el-table-column>
      <el-table-column label="时间" prop="ltime"></el-table-column>

      <el-table-column label="教师">
        <template slot-scope="scope">
          <!-- {{scope}} -->
          <el-tag
            style="margin: 2px"
            v-for="item in scope.row.lteachers"
            :key="item.tid"
            :type="mtype[4]"
            size="medium"
          >
            {{ item.tname }}
          </el-tag>
        </template>
      </el-table-column>
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
    this.getLessonList();
    this.getTermList();
  },
  data() {
    return {
      // 查询信息实体
      queryInfo: {
        query: "",
        pageNumber: 1,
        pageSize: 5,
      },
      lessonList: [], // 用户列表
      total: 0, // 查询总数
      updateUser: {},
      mtype: ["", "success", "info", "warning", "danger"],
      terms: [],
      term: "",
    };
  },
  methods: {
    // 获取所有课程
    getLessonList() {
      this.postRequest(
        "/course/lessons?term=" + this.term,
        this.queryInfo
      ).then((response) => {
        // console.log(1111,data.obj.records);
        const { data } = response;
        this.lessonList = data.records;
        this.total = data.total;
      });
    },
    // 获取学期列表
    getTermList() {
      this.getRequest("option/terms").then((response) => {
        const { data } = response;
        this.terms = data;
      });
    },
    handleSizeChange(newSize) {
      this.queryInfo.pageSize = newSize;
      this.getLessonList();
    },
    handleCurrentChange(newPage) {
      console.log(newPage);
      this.queryInfo.pageNumber = newPage;
      this.getLessonList();
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
        this.getLessonList();
      });
    },
    getUser(id) {
      this.getRequest("/getuser?id=" + id).then((data) => {
        console.log("/getuser", data);
        // this.addDialogVisible = false;
        // this.getLessonList();
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
            this.getLessonList();
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
