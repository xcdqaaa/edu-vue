<template>
  <div>
    <el-card>
      <el-row :gutter="25">
        <el-col :span="4">
          <!-- 学期选择 -->
          <el-select
            v-model="term"
            placeholder="选择学期"
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
    </el-card>

   
  </div>
</template>

<script>
export default {
  created() {
    this.getTermList();
    this.getLessonList();
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
      term: "20219",
    };
  },
  methods: {
    // 获取所有课程
    getLessonList() {
      console.log("is not hava ?", this.$store.state.user.name);
      this.postRequest(
        "/course/" + this.$store.state.user.name + "/" + this.term,
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
  },
};
</script>

<style>
</style>