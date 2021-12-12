<template>
  <div>
    <el-card>
      <el-row :gutter="25">
        <el-col :span="10">
          <el-input
            placeholder="请输入内容"
            clearable
            v-model="queryInfo.query"
            @clear="getUserList"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="getUserList"
            ></el-button>
          </el-input>
        </el-col>

        <!-- <el-col :span="4">
          <el-button type="primary" @click="userDialogVisible = true"
            >添加用户</el-button
          >
        </el-col> -->
      </el-row>
    </el-card>
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
        <el-form-item label="账号" prop="account">
          <el-input
            v-model="userForm.account"
            placeholder="请输入内容"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
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

    <el-table :data="userList" border>
      <el-table-column type="selection" width="46" align="center">
      </el-table-column>
      <!-- <el-table-column type="index"></el-table-column> -->
      <el-table-column label="账号" prop="account" sortable></el-table-column>
      <el-table-column label="密码" prop="password"></el-table-column>
      <el-table-column label="邮箱" prop="email">
        <template slot-scope="scope">
          {{ scope.row.email ? scope.row.email : "未设置" }}
        </template>
      </el-table-column>
      <el-table-column label="角色"> 学生 </el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <!-- {{scope}} -->
          <el-switch
            v-model="scope.row.state"
            :active-value="1"
            :inactive-value="0"
            @change="userStateChange(scope.row)"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <!-- 修改 -->
          <el-button
            type="primary"
            icon="el-icon-edit"
            size="mini"
            @click="showUpdateUser(scope.row.uid)"
          ></el-button>
          <!-- 删除 -->
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
            @click="deleteUser(scope.row.uid)"
          ></el-button>
          <!-- 权限 -->
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页style="margin-top:20px;" -->
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
import request from "@/utils/request";
export default {
  created() {
    this.getUserList();
  },
  data() {
    return {
      // 查询信息实体
      queryInfo: {
        query: "",
        pageNumber: 1,
        pageSize: 5,
      },
      userList: [], // 用户列表
      total: 0, // 查询总数
      userDialogVisible: false, // 对话框状态
      userForm: {
        uid: "",
        account: "",
        password: "123456",
        email: "",
      },
      userFormRules: {
        account: [
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
    // 获取所有用户
    getUserList() {
      this.postRequest("user/students", this.queryInfo).then((response) => {
        const { data } = response;
        console.log(1111, data);
        this.userList = data.records;
        this.total = data.total;
      });
    },
    // 大小改变
    handleSizeChange(newSize) {
      this.queryInfo.pageSize = newSize;
      this.getUserList();
    },
    // 当前页改变
    handleCurrentChange(newPage) {
      console.log(newPage);
      this.queryInfo.pageNumber = newPage;
      this.getUserList();
    },
    // 改变用户状态
    userStateChange(userInfo) {
      console.log("2222", userInfo);
      this.getRequest(`user/state/${userInfo.uid}/${userInfo.state}`).then(
        (data) => {
          console.log("data" + data);
        }
      );
    },
    userDialogClosed() {
      this.$refs.userFormRef.resetFields();
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
      this.postRequest("/user/admin", this.userForm).then((data) => {
        console.log("adduser", data);
        this.userDialogVisible = false;
        this.getUserList();
      });
    },

    showUpdateUser(id) {
      this.getUser(id);
      this.userDialogVisible = true;
    },
    doUpdateUser() {
      this.putRequest("/user/admin", this.userForm).then((data) => {
        console.log("/updateuser", data);
        this.updateUser = {};
        this.userDialogVisible = false;
        this.getUserList();
        console.log("ok updateuser");
      });
    },
    getUser(uid) {
      this.getRequest("/user/admin/" + uid).then((response) => {
        // console.log("/getuser", data);
        const { data } = response;
        // this.userDialogVisible = false;
        // this.getUserList();
        this.userForm = data;
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
          this.deleteRequest("user/" + id).then((data) => {
            console.log(data);
            this.getUserList();
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

<style scoped>
</style>
