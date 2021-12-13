<template>
  <div>
    <el-card>
      <el-row :gutter="25">
        <el-col :span="4">
          <!-- 学期选择 -->
          <el-select v-model="term" placeholder="选择学期" @change="getOptions">
            <el-option
              v-for="item in terms"
              :key="item.pid"
              :label="item.pname"
              :value="item.pid"
            >
            </el-option>
          </el-select>
        </el-col>
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
        <el-col :span="4">
          <!-- 学生选择 -->
          <el-select
            v-model="student"
            placeholder="选择学生"
            filterable
            @change="getStudentList"
          >
            <el-option
              v-for="item in students"
              :key="item.uid"
              :label="item.sname"
              :value="item.uid"
            >
            </el-option>
          </el-select>
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
      classes: [],
      class: "",
      cid: "",
      value: "",
      options: [],
      students: [],
      student: "",
    };
  },
  methods: {
    // 获取所有课程
    getLessonList() {
      this.postRequest(
        "/course/" + this.teacher + "/" + this.term,
        this.queryInfo
      ).then((response) => {
        const { data } = response;
        this.lessonList = data.records;
        this.total = data.total;
      });
    },
    getOptions() {
      this.getRequest("/option/classes").then((response) => {
        const { data } = response;
        this.options = data;
      });
    },
    // 获取学期列表
    getTermList() {
      this.getRequest("option/terms").then((response) => {
        const { data } = response;
        this.terms = data;
      });
    },
    // 获取学院列表
    getCollegeList() {
      this.getRequest("option/colleges").then((response) => {
        const { data } = response;
        this.colleges = data;
      });
    },
    // 获取学生列表
    getStudentList() {
      this.cid = this.value[2];
      this.cid = this.getRequest("option/students/" + this.cid).then(
        (response) => {
          const { data } = response;
          this.students = data;
        }
      );
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