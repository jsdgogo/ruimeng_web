<template>
  <div class="app-container">
    <!--查询表单-->
    <el-form :inline="true" class="demo-form-inline" >
      <el-form-item >
        <el-input v-model.trim="search" placeholder="客户名称" style="width:220px" />
      </el-form-item>

      <el-form-item label="创建时间">
        <el-date-picker
          v-model.trim="beginTime"
          type="datetime"
          placeholder="选择开始时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          default-time="00:00:00"
        />
      </el-form-item>
      <el-form-item>
        <el-date-picker
          v-model.trim="endTime"
          type="datetime"
          placeholder="选择截止时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          default-time="00:00:00"
        />
      </el-form-item>

      <el-button type="primary" icon="el-icon-search" @click="getPageList(index=1,size,search)">查询</el-button>
      <el-button type="default" @click="resetData()">清空</el-button>
      <el-button type="primary" @click="exportBill">导出查询结果</el-button>
    </el-form>
    <!-- 表格 -->
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="数据加载中"
      border
      fit
      highlight-current-row>
      <el-table-column
        prop="id"
        label="序号"
        width="70"
        align="center"/>
      <el-table-column prop="customerName" label="客户名称" width="220" />
      <el-table-column prop="totalDebt" label="总欠款" width="140"/>
      <el-table-column prop="orderDebt" label="订单欠款" width="140"/>
      <el-table-column prop="orderTotal" label="订单总金额" width="140"/>
      <el-table-column prop="emptyBottleTotal" label="空瓶欠款" width="140"/>
      <el-table-column prop="paid" label="已付款" width="140" />
      <el-table-column prop="createTime" label="创建时间" width="160"/>
      <el-table-column prop="updateTime" label="修改时间" width="160"/>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <router-link :to="'/bill/getDetails/'+scope.row.id">
            <el-button type="primary" size="medium" >查看详情</el-button>
          </router-link>
          <!-- <el-button type="danger" size="medium" icon="el-icon-delete" @click="removeById(scope.row.id)">删除</el-button> -->
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      :current-page="index"
      :page-size="size"
      :page-sizes="[8,10,15,30]"
      :total="total"
      style="padding: 30px 0; text-align: center;"
      layout="total, sizes, prev, pager, next, jumper"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"/>
  </div>
</template>

<script>
import bill from '@/api/bill'
export default {

  data() { // 定义数据
    return {
      listLoading: true, // 是否显示loading信息
      list: null, // 数据列表
      total: 0, // 总记录数
      index: 1, // 页码
      size: 8, // 每页记录数
      search: '', // 查询条件
      beginTime: '',
      endTime: ''
    }
  },

  created() { // 当页面加载时获取数据
    this.getPageList()
  },
  methods: {

    handleSizeChange(size) {
      this.size = size
      this.index = 1
      this.getPageList()
    },
    handleCurrentChange(index) {
      this.index = index
      this.getPageList()
    },
    getPageList() {
      this.listLoading = true
      bill.getPageList(this.index, this.size, this.search).then(response => {
        this.total = response.data.page.total
        this.index = response.data.page.current
        this.size = response.data.page.size
        this.list = response.data.page.records
        this.listLoading = false
      })
    },
    removeById(id) {
      this.$confirm('此操作将永久删除 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        return bill.removeById(id)
      }).then(() => { // 如果上一个then成功则执行此处的then回调
        this.getPageList()
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch((response) => { // 失败
        if (response === 'cancel') {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        }
      })
    },
    resetData() {
      this.search = null
      this.getPageList()
    },
    exportBill() {
      bill.exportBill(this.beginTime, this.endTime, this.search).then(response => {
        console.log(response)
      })
    },
    getDetails(id) {
      bill.getDetails(id).then(response => {
        this.bill = response.data.bill
      })
    }
  }}

</script>
