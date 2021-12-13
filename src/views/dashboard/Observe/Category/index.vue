<template>
  <el-card>
    <div slot="header" class="header">
      <div class="category-header">
        <span>成绩等级占比</span>
      </div>
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
      // value: "全部渠道",
    };
  },
  mounted() {
    //饼图
    let mychart = echarts.init(this.$refs.charts);
    mychart.setOption({
      title: {
        left: "center",
      },
      tooltip: {
        trigger: "item",
      },
      legend: {
        orient: "vertical",
        // left: "left",
        right: "right",
      },
      series: [
        {
          // name: "科目",
          type: "pie",
          radius: "50%",
          data: [
            { value: 12, name: "优秀" },
            { value: 22, name: "良好" },
            { value: 12, name: "中等" },
            { value: 5, name: "及格" },
            { value: 1, name: "不及格" },
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)",
            },
          },
        },
      ],
    });
    //绑定事件

    mychart.on("mouseover", (params) => {
      //获取鼠标移上去那条数据
      const { name, value } = params.data;
      //重新设置标题
      mychart.setOption({
        title: {
          text: name,
          subtext: value,
        },
      });
    });
  },
};
</script>

<style scoped>
.category-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.charts {
  width: 100%;
  height: 290px;
  margin-top: 10px;
}
</style>
