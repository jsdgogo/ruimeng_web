<template>
  <div class="app-container">
    <!--查询表单-->
    <el-form :inline="true" class="demo-form-inline" >
      <el-form-item>
        <el-input v-model.trim="search" placeholder="客户名称" />
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

      <el-button type="primary" icon="el-icon-search" @click="getPageList(index=1,size,search,beginTime,endTime)">查询</el-button>
      <el-button type="default" @click="resetData()">清空</el-button>
      <el-button type="primary" @click="exportOrder">导出查询结果</el-button>
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

      <el-table-column prop="customerName" label="客户名" width="240" />

      <el-table-column prop="quantity" label="总数量" width="140"/>

      <el-table-column prop="totalPrice" label="总金额" width="140"/>
      <el-table-column prop="paid" label="客户付款金额" width="140"/>
      <el-table-column prop="orderDebt" label="订单欠款" width="140"/>
      <el-table-column prop="createTime" label="创建时间" width="180"/>
      <el-table-column prop="updateTime" label="修改时间" width="180"/>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <router-link :to="'/order/update/'+scope.row.id">
            <el-button type="primary" size="medium" icon="el-icon-edit">修改</el-button>
          </router-link>
          <el-button type="danger" size="medium" icon="el-icon-delete" @click="removeById(scope.row.id)">删除</el-button>
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
import order from '@/api/order'
export default {

  data() { // 定义数据
    return {
      baseURL: process.env.BASE_API,
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
    getSummaries(param) {
      const { columns, data } = param
      const sums = []
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '合计'
          return
        }
        const values = data.map(item => Number(item[column.property]))
        if (!values.every(value => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr)
            if (!isNaN(value)) {
              return prev + curr
            } else {
              return prev
            }
          }, 0)
          sums[index]
        } else {
          sums[index] = 'N/A'
        }
      })
      return sums
    },
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
      order.getPageList(this.index, this.size, this.search, this.beginTime, this.endTime).then(response => {
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
        return order.removeById(id)
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
      this.beginTime = null
      this.endTime = null
    },
    exportOrder() {
      order.exportOrder(this.beginTime, this.endTime, this.search).then(response => {
        console.log(response)
      })
    }
  }}

</script>
