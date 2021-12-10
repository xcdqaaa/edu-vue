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

        <el-col :span="4">
          <el-button type="primary" @click="addDialogVisible = true"
            >添加用户</el-button
          >
        </el-col>
      </el-row>
    </el-card>
    <el-dialog
      title="添加用户"
      :visible.sync="addDialogVisible"
      width="36%"
      @close="addDialogClosed"
    >
      <el-form
        :model="addForm"
        :rules="addFormRules"
        ref="addFormRef"
        label-width="70px"
      >
        <el-form-item label="账号" prop="account">
          <el-input v-model="addForm.account" clearable></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="account">
          <el-input v-model="addForm.name" clearable></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="addForm.password" clearable></el-input>
        </el-form-item>
        <el-form-item label="身份">
          <template>
            <el-select v-model="addForm.perm" placeholder="请选择">
              <el-option
                v-for="(item, index) in roleList"
                :key="index"
                :label="item"
                :value="index + 1"
              >
              </el-option>
            </el-select>
          </template>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="default" @click="addDialogVisible = false"
          >取消</el-button
        >
        <el-button type="primary" size="default" @click="addUser"
          >确定</el-button
        >
      </span>
    </el-dialog>
    <el-dialog
      title="更新用户"
      :visible.sync="updateDialogVisible"
      width="36%"
      @close="updateDialogClosed"
    >
      <el-form
        :model="updateUser"
        :rules="addFormRules"
        ref="updateFormRef"
        label-width="70px"
      >
        <el-form-item label="账号" prop="account">
          <el-input v-model="updateUser.account" clearable></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="updateUser.password" clearable></el-input>
        </el-form-item>
        <el-form-item label="身份">
          <template>
            <el-select v-model="updateUser.perm" placeholder="请选择">
              <el-option
                v-for="(item, index) in roleList"
                :key="index"
                :label="item"
                :value="index + 1"
              >
              </el-option>
            </el-select>
          </template>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="default" @click="updateDialogVisible = false"
          >取消</el-button
        >
        <el-button type="primary" size="default" @click="doUpdateUser"
          >确定</el-button
        >
      </span>
    </el-dialog>
    <el-table :data="userList" border stripe>
      <el-table-column type="selection" width="46" align="center"> </el-table-column>
      <!-- <el-table-column type="index"></el-table-column> -->
      <el-table-column label="账号" prop="account" sortable></el-table-column>
      <el-table-column label="密码" prop="password"></el-table-column>
      <el-table-column label="邮箱" prop="email">
        <template slot-scope="scope">
          {{ scope.row.email ? scope.row.email : "未设置" }}
        </template>
      </el-table-column>
      <el-table-column label="角色">
        <template slot-scope="scope">
          {{ roleList[scope.row.role - 1] }}
        </template>
      </el-table-column>
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
    <el-pagination
    	style="margin-top:20px;"
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
import request from '@/utils/request'
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
      roleList: ["管理员", "教师", "学生"],
      userList: [], // 用户列表
      total: 0, // 查询总数
      addDialogVisible: false, // 对话框状态
      addForm: {
        account: "",
        password: "123456",
        perm: 2,
        name:""
      },
      updateDialogVisible: false,
      updateForm: {
        account: "",
        password: "123456",
        perm: 2,
      },
      updateUser: {},
      addFormRules: {
        account: [
          { required: true, message: "请输入用户账号", trigger: "blur" },
          { min: 4, max: 20, message: "长度在不少于4", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入用户密码", trigger: "blur" },
          {
            min: 6,
            max: 20,
            message: "长度在 6 到 20 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    // 获取所有用户
    getUserList() {
      this.postRequest("user/students", this.queryInfo).then((response) => {
          const {data} = response;
        console.log(1111,data);
        this.userList = data.records;
        this.total = data.total;
        // console.log(2222,data.obj.records);
      });
    },
    handleSizeChange(newSize) {
      this.queryInfo.pageSize = newSize;
      this.getUserList();
    },
    handleCurrentChange(newPage) {
      console.log(newPage);
      this.queryInfo.pageNumber = newPage;
      this.getUserList();
    },
    // 改变用户状态
    userStateChange(userInfo) {
      this.getRequest(
        `userstate?id=${userInfo.uid}&state=${userInfo.state}`
      ).then((data) => {
        console.log("data" + data);
      });
    },
    addDialogClosed() {
      this.$refs.addFormRef.resetFields();
    },
    updateDialogClosed() {
      this.$refs.updateFormRef.resetFields();
    },
    // 添加用户
    addUser() {
      this.$refs.addFormRef.validate((valid) => {
        this.postRequest("/user", this.addForm).then((data) => {
          console.log("adduser", data);
          this.addDialogVisible = false;
          this.getUserList();
        });
      });
    },

    showUpdateUser(id){
      console.log(id);
      this.getUser(id);
      console.log(id);
      this.updateDialogVisible=true;
      
    },
    doUpdateUser(){
      this.postRequest("/updateuser",this.updateUser).then((data)=>{
        console.log("/updateuser",data);
        this.updateUser={};
        this.updateDialogVisible=false;
        this.getUserList();
      })
    },
    getUser(id) {
      this.getRequest("/getuser?id="+id).then((data) => {
        console.log("/getuser", data);
        // this.addDialogVisible = false;
        // this.getUserList();
        this.updateUser=data.obj;
      });
    },
    // 删除用户
    deleteUser(id) {
      this.$confirm("此操作将永久删除用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
          this.deleteRequest("user?id="+id).then(
            data =>{
              console.log(data);
              this.getUserList();
            }
          )
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

.el-card {
    margin: 16px 0;
  box-shadow: 0 1px 1px rgb(0, 8, 10, 0.15) !important;
}
</style>
