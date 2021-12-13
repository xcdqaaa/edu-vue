<template>
  <div>
    <div>
      <el-row :gutter="10">
        <el-col :span="24">
          <LineCharts></LineCharts>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import LineCharts from "./lineCharts";
export default {
  name: "",
  data() {
    return {
      term: "2021-2022 秋",
      tableData: [{}],
    };
  },
  components: {
    LineCharts,
  },
};
</script>

<style scoped>
.header {
  /* border-bottom: 1px solid #eee; */
  padding: 5px 0px;
}
</style>
