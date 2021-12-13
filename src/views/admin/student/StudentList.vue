<template>
  <div>
    <!-- 头部行 -->
    <el-card>
      <el-row :gutter="25">
        <!-- 班级列表 -->
        <el-col :span="6">
          <!-- 学院选择 -->
          <el-cascader
            v-model="value"
            :options="options"
            placeholder="选择班级"
            :props="{ expandTrigger: 'hover' }"
            @change="getStudentList"
            style="width: 100%"
          ></el-cascader>
        </el-col>
        <el-col :span="8">
          <el-input
            placeholder="请输入内容"
            clearable
            v-model="queryInfo.query"
            @clear="getStudentList"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="getStudentList"
            ></el-button>
          </el-input>
        </el-col>
        <!-- 添加按钮 -->
        <el-col :span="2">
          <el-button type="primary" @click="userDialogVisible = true"
            >添加学生</el-button
          >
        </el-col>
        <el-col :span="2">
          <el-button
            :loading="downloadLoading"
            type="primary"
            icon="el-icon-document"
            @click="handleDownload"
          >
            导出
          </el-button>
        </el-col>
      </el-row>
    </el-card>

    <!-- 添加学生 -->
    <el-dialog
      title="添加学生"
      :visible.sync="userDialogVisible"
      width="36%"
      @close="userDialogClosed"
    >
      <el-form
        :model="userForm"
        :rules="userFormRules"
        ref="userFormRef"
        label-width="70px"
      >
        <el-form-item label="学号" prop="sid">
          <el-input
            v-model="userForm.sid"
            placeholder="请输入内容"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="sname">
          <el-input
            v-model="userForm.sname"
            placeholder="请输入内容"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" v-show="userForm.uid == ''">
          <el-input
            v-model="userForm.password"
            placeholder="请输入内容"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input
            v-model="userForm.email"
            placeholder="默认为空"
            clearable
          ></el-input>
        </el-form-item>
        <!-- 学院选择 -->
        <el-form-item label="班级" prop="cid" v-show="userForm.uid == ''">
          <!-- 学院选择 -->
          <el-cascader
            v-model="userForm.values"
            :options="options"
            :props="{ expandTrigger: 'hover' }"
            @change="getStudentList"
            style="width: 100%"
          ></el-cascader>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="default" @click="userDialogVisible = false"
          >取消</el-button
        >
        <el-button type="primary" size="default" @click="doForUser"
          >确定</el-button
        >
      </span>
    </el-dialog>

    <!-- 学生侧边栏 -->
    <el-drawer :visible.sync="drawer" direction="rtl" size="28%">
      <el-descriptions
        title="学生详情"
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
    </el-drawer>

    <el-table :data="studentList" border stripe>
      <el-table-column type="selection" width="46" align="center">
      </el-table-column>
      <!-- <el-table-column type="index"></el-table-column> -->
      <el-table-column label="学号" prop="sid" sortable></el-table-column>
      <el-table-column label="姓名" prop="sname"></el-table-column>
      <el-table-column label="班级" prop="sclass"></el-table-column>
      <el-table-column label="专业" prop="smajor"></el-table-column>
      <el-table-column label="学院" prop="scollege"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <!-- 修改 -->
          <el-tooltip content="修改教师" placement="top-start">
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              @click="showUpdateUser(scope.row.uid)"
            ></el-button>
          </el-tooltip>

          <!-- 删除 -->
          <el-tooltip content="删除学生" placement="top-start">
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              @click="deleteUser(scope.row.uid)"
            ></el-button>
          </el-tooltip>
          <!-- 信息 -->
          <el-tooltip content="学生详情" placement="top-start">
            <el-button
              type="info"
              icon="el-icon-info"
              size="mini"
              @click="showUserInfo(scope.row.uid)"
            ></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
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
  // 初始化信息
  created() {
    this.getStudentList();
    this.getOptions();
  },
  data() {
    return {
      // 查询信息实体
      queryInfo: {
        query: "",
        pageNumber: 1,
        pageSize: 5,
      },
      userDialogVisible: false,
      userForm: {
        uid: "",
        sid: "",
        sname: "",
        password: "123456",
        email: "",
        values: [],
        cid: "",
      },
      studentList: [], // 用户列表
      total: 0, // 查询总数
      updateUser: {},
      value: ["", "", this.cid],
      options: [],
      drawer: false,
      userInfo: "",
      downloadLoading: false,
      // 验证规则
      userFormRules: {
        tname: [{ required: true, message: "请输入用户名", trigger: "blur" }],
        gid: [{ required: true, message: "请选择学院", trigger: "blur" }],
        tid: [
          { required: true, message: "请输入用户账号", trigger: "blur" },
          { min: 3, max: 20, message: "长度在不少于3", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入用户密码", trigger: "blur" },
          { min: 6, max: 20, message: "长度不少于6", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    handleDownload() {
      this.downloadLoading = true;
      import("@/vendor/Export2Excel").then((excel) => {
        const tHeader = ["sid", "sname", "sclass", "smajor", "scollege"];
        const tnHeader = ["学号", "姓名", "班级", "专业", "学院"];
        const filterVal = ["sid", "sname", "sclass", "smajor", "scollege"];
        const list = this.studentList;
        const data = this.formatJson(filterVal, list);
        excel.export_json_to_excel({
          header: tnHeader,
          data,
          filename: this.filename,
          autoWidth: this.autoWidth,
          bookType: this.bookType,
        });
        this.downloadLoading = false;
      });
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map((v) =>
        filterVal.map((j) => {
          if (j === "timestamp") {
            return parseTime(v[j]);
          } else {
            return v[j];
          }
        })
      );
    },
    // 获取所有学生
    getStudentList() {
      console.log(this.value, "2222");
      this.postRequest(
        "student/students?cid=" + (this.value[2] ? this.value[2] : ""),
        this.queryInfo
      ).then((response) => {
        const { data } = response;
        this.studentList = data.records;
        this.total = data.total;
      });
    },
    // 得到多级数据
    getOptions() {
      this.getRequest("/option/classes").then((response) => {
        const { data } = response;
        this.options = data;
      });
    },
    // 分页响应函数
    handleSizeChange(newSize) {
      this.queryInfo.pageSize = newSize;
      this.getStudentList();
    },
    handleCurrentChange(newPage) {
      console.log(newPage);
      this.queryInfo.pageNumber = newPage;
      this.getStudentList();
    },
    // dialog关闭
    userDialogClosed() {
      console.log("close");
      this.userForm = {
        uid: "",
        sid: "",
        sname: "",
        password: "123456",
        email: "",
        values: [],
        cid: "",
      };
      console.log("close ok");
    },

    // 分发添加还是修改
    doForUser() {
      this.$refs.userFormRef.validate((valid) => {
        if (valid) {
          console.log(this.userForm.uid, "5555");
          if (this.userForm.uid == "") {
            this.addUser();
          } else {
            this.doUpdateUser();
          }
        }
      });
    },

    // 添加用户
    addUser() {
      this.userForm.cid = this.userForm.values[2];
      this.postRequest("/user/student", this.userForm).then((data) => {
        console.log("addstudent", data);
        this.userDialogVisible = false;
        this.getStudentList();
      });
    },
    // 显示修改
    showUpdateUser(id) {
      this.getUser(id);
      this.userDialogVisible = true;
    },

    // 修改用户
    doUpdateUser() {
      //   this.userForm.cid = this.userForm.values[2];
      this.putRequest("/user/student", this.userForm).then((data) => {
        console.log("/updatestudent", data);
        this.updateUser = {};
        this.userDialogVisible = false;
        this.getStudentList();
        console.log("ok updateuser");
      });
    },
    // 获取用户信息
    getUser(id) {
      this.getRequest("/user/student/" + id).then((response) => {
        // console.log("/getuser", data);
        const { data } = response;
        this.userForm = data;
      });
    },
    // 得到用户信息
    getUserInfo(id) {
      this.getRequest("/student/info/" + id).then((response) => {
        console.log("/getuser", data);
        const { data } = response;
        this.userInfo = data;
        console.log("have", this.userInfo);
      });
    },

    // 展示用户信息
    showUserInfo(id) {
      console.log("show", id);
      this.drawer = true;
      this.getUserInfo(id);
    },
    // 删除用户
    deleteUser(id) {
      this.$confirm("此操作将永久删除用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.deleteRequest("user/" + id).then((data) => {
            console.log(data);
            this.getStudentList();
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
