<template>
  <div>
    <!-- 头部 -->
    <el-card>
      <el-row :gutter="25">
        <!-- 学院列表 -->
        <el-col :span="4">
          <!-- 学院选择 -->
          <el-select
            v-model="college"
            placeholder="选择学院"
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

        <!-- 搜索框 -->
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

        <!-- 添加按钮 -->
        <el-col :span="4">
          <el-button type="primary" @click="userDialogVisible = true"
            >添加教师</el-button
          >
        </el-col>
      </el-row>
    </el-card>
    <!-- 添加修改界面 -->
    <el-dialog
      title="添加用户"
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
        <el-form-item label="工号" prop="tid">
          <el-input
            v-model="userForm.tid"
            placeholder="请输入内容"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="tname">
          <el-input
            v-model="userForm.tname"
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
        <el-form-item label="学院" prop="gid">
          <el-select v-model="userForm.gid" placeholder="请选择">
            <el-option
              v-for="item in colleges"
              :key="item.gid"
              :label="item.gname"
              :value="item.gid"
            >
            </el-option>
          </el-select>
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
    <!-- 教师详情信息 -->
    <el-drawer :visible.sync="drawer" direction="rtl" size="28%">
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
    </el-drawer>
    <!-- 表格 -->
    <el-table :data="teacherList" border stripe>
      <el-table-column type="selection" width="46"> </el-table-column>
      <!-- <el-table-column type="index"></el-table-column> -->
      <el-table-column label="工号" prop="tid" sortable></el-table-column>
      <el-table-column label="姓名" prop="tname"></el-table-column>
      <el-table-column label="学院" prop="tcollege"></el-table-column>
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
          <el-tooltip content="删除教师" placement="top-start">
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              @click="deleteUser(scope.row.uid)"
            ></el-button>
          </el-tooltip>
          <!-- 信息 -->
          <el-tooltip content="教师详情" placement="top-start">
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
      userDialogVisible: false,
      userForm: {
        uid: "",
        tid: "",
        tname: "",
        password: "123456",
        email: "",
        gid: "",
      },
      teacherList: [], // 用户列表
      total: 0, // 查询总数
      updateUser: {},
      colleges: [],
      college: "",
      drawer: false,
      userInfo: "",
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
    // dialog关闭
    userDialogClosed() {
      console.log("close");
      this.userForm = {
        uid: "",
        tid: "",
        tname: "",
        password: "123456",
        email: "",
        gid: "",
      };
      console.log("close ok");
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
      this.postRequest("/user/teacher", this.userForm).then((data) => {
        console.log("adduser", data);
        this.userDialogVisible = false;
        this.getTeacherList();
      });
    },

    showUpdateUser(id) {
      this.getUser(id);
      this.userDialogVisible = true;
    },
    doUpdateUser() {
      this.putRequest("/user/teacher", this.userForm).then((data) => {
        console.log("/updateuser", data);
        this.updateUser = {};
        this.userDialogVisible = false;
        this.getTeacherList();
        console.log("ok updateuser");
      });
    },
    getUser(id) {
      this.getRequest("/user/teacher/" + id).then((response) => {
        // console.log("/getuser", data);
        const { data } = response;
        // this.userDialogVisible = false;
        // this.getTeacherList();
        this.userForm = data;
      });
    },
    getUserInfo(id) {
      this.getRequest("/teacher/info/" + id).then((response) => {
        // console.log("/getuser", data);
        const { data } = response;
        // this.userDialogVisible = false;
        // this.getTeacherList();
        this.userInfo = data;
      });
    },
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
