<template>
  <el-card>
    <div slot="header" class="header">
      <span>成绩列表查看</span>
      <el-select v-model="term" placeholder="选择学期" @change="getOptions">
        <el-option label="2021-2022 秋" value="20219"></el-option>
        <el-option label="2020-2021 春" value="20213"></el-option>
        <el-option label="2020-2021 秋" value="20209"></el-option>
        <el-option label="2019-2020 春" value="20203"></el-option>
      </el-select>
    </div>
    <div>
      <div class="charts" ref="charts"></div>
    </div>
  </el-card>
</template>

<script>
import * as echarts from "echarts";
export default {
  name: "",
  data() {
    return {
      term: "2021-2022 秋",
      // value: "全部渠道",
    };
  },
  mounted() {
    //饼图
    let mychart = echarts.init(this.$refs.charts);
    mychart.setOption({
      xAxis: {
        type: "category",
        data: [
          "软件工程",
          "数据库",
          "WEB前端开发",
          "WEB后端框架",
          "JAVA",
          "算法",
          "高数",
        ],
        axisLabel: {
          interval: 0,
          rotate: 45,
        },
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          data: [72, 78, 88, 89, 80, 61, 92],
          type: "bar",
        },
      ],
    });
  },
};
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
}
.category-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.charts {
  width: 100%;
  height: 280px;
  /* margin-top: 10px; */
}
</style>
