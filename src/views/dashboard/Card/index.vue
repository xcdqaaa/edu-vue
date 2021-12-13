<template>
  <div>
    <el-row :gutter="10">
      <el-col :span="6">
        <el-card>
          <!-- 第一个card -->
          <Detail title="绩点成绩" count="3.668">
            <template slot="charts">专业排名前 66%</template>
            <template slot="footer">
              <span>继续加油</span>
            </template>
          </Detail>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <!-- 第二个card -->
          <Detail title="挂科数目" count="4">
            <template slot="charts">
              <lineCharts></lineCharts>
            </template>
            <template slot="footer">
              <span>共 2 科目需要重修</span>
            </template>
          </Detail>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <!-- 第三个card -->
          <Detail title="修读课程" count="10">
            <template slot="charts">
              <barCharts />
            </template>
            <template slot="footer">
              <span>本学期共 10 门课程</span>
            </template>
          </Detail>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <!-- 第四个card -->
          <Detail title="修读进度" count="78%">
            <template slot="charts">
              <progressCharts />
            </template>
            <template slot="footer">已修读科目 56 门</template>
          </Detail>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Detail from "./Detail";
import lineCharts from "./lineChart";
import barCharts from "./barCharts";
import progressCharts from "./progressCharts";
export default {
  name: "",
  components: {
    Detail,
    lineCharts,
    barCharts,
    progressCharts,
  },
};
</script>

<style scoped>
</style>
