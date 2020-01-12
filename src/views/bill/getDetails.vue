<template>
  <div class="app-container">
    <el-form :inline="true" class="demo-form-inline" >
      <el-form-item label="客户名称:">
        <el-input v-model.trim="bill.customerName" placeholder="等待赋值" readonly/>
      </el-form-item>
      <el-form-item label="创建时间">
        <el-date-picker
          v-model.trim="bill.createTime"
          type="datetime"
          placeholder="账单创建时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          default-time="00:00:00"
          readonly
        />
      </el-form-item>
    </el-form>
    <el-form :inline="true" class="demo-form-inline" >
      <el-form-item label="欠款总计:">
        <el-input v-model.trim="bill.totalDebt" placeholder="等待赋值" readonly/>
      </el-form-item>
      <el-form-item label="订单欠款:">
        <el-input v-model.trim="bill.orderDebt" placeholder="等待赋值" readonly/>
      </el-form-item>
      <el-form-item label="订单总金额:">
        <el-input v-model.trim="bill.orderTotal" placeholder="等待赋值" readonly/>
      </el-form-item>
      <el-form-item label="空瓶欠款:">
        <el-input v-model.trim="bill.emptyBottleTotal" placeholder="等待赋值" readonly/>
      </el-form-item>
      <el-form-item label="已付款:">
        <el-input v-model.trim="bill.paid" placeholder="等待赋值" readonly/>
      </el-form-item>

    </el-form>
    <h3 align="center">订单详情</h3>
    <el-table
      v-loading="false"
      :data="orders"
      :summary-method="getSummaries"
      element-loading-text="数据加载中"
      border
      show-summary
      fit
      highlight-current-row>
      <el-table-column
        prop="id"
        label="订单id"
        width="70"
        align="center"/>
      <el-table-column prop="number" label="总数量" width="180"/>
      <el-table-column prop="total" label="总金额" width="180"/>
      <el-table-column prop="paid" label="客户付款金额" width="180"/>
      <el-table-column prop="orderDebt" label="订单欠款" width="180"/>
      <el-table-column prop="createTimeStr" label="创建时间" width="180"/>
      <el-table-column prop="updateTime" label="修改时间" />
      <el-table-column type="expand">
        <template slot-scope="scope">
          <el-table
            v-loading="false"
            :data="scope.row.orderItems"
            :summary-method="getSummaries"
            element-loading-text="数据加载中"
            border
            show-summary
            fit
            highlight-current-row>
            <el-table-column
              prop="id"
              label="气瓶id"
              width="70"
              align="center" />
            <el-table-column prop="name" label="气瓶类型" width="180" />
            <el-table-column prop="price" label="单价" width="180"/>
            <el-table-column prop="quantity" label="数量" width="180"/>
            <el-table-column prop="total" label="金额" width="180" >
              <template v-if="scope.row.price&&scope.row.quantity" slot-scope="scope" >
                {{ (scope.row.total = scope.row.price * scope.row.quantity).toFixed(2) }}
              </template>
            </el-table-column>
          </el-table>
        </template>
      </el-table-column>
    </el-table>
    <h3 align="center">空瓶欠款详情</h3>
    <el-table
      v-loading="false"
      :data="customerEmptyBottles"
      :summary-method="getSummaries"
      element-loading-text="数据加载中"
      border
      show-summary
      fit
      highlight-current-row>
      <el-table-column
        prop="id"
        label="空瓶欠款id"
        width="100"
        align="center"/>

      <el-table-column prop="gasCylinderName" label="空瓶类型" width="180"/>
      <el-table-column prop="price" label="单价" width="180"/>
      <el-table-column prop="total" label="所欠空瓶总数" width="180"/>
      <el-table-column prop="sendBackNumber" label="已归还数量" width="180"/>
      <el-table-column prop="nowNumber" label="未归还数量" width="180"/>
      <el-table-column prop="totalPrice" label="空瓶欠款" width="180"/>
      <el-table-column prop="createTime" label="创建时间" width="180"/>
      <el-table-column prop="updateTime" label="修改时间" />
    </el-table>
  </div>
</template>
<script>
import bill from '@/api/bill'
export default {
  data() {
    return {
      listLoading: true, // 是否显示loading信息
      bill: {},
      orders: [],
      orderItems: [],
      order: {
        orderItems: []
      },
      customerEmptyBottles: []
    }
  },
  watch: {
    $route(to, from) {
      this.init()
    }
  },

  // 页面渲染前调用
  created() {
    this.init()
  },
  methods: {
    init() {
      if (this.$route.params && this.$route.params.id) {
        this.addCustomersButton = true
        const id = this.$route.params.id
        this.getById(id)
      } else {
        this.$router.push({ path: '/bill' })
        return this.$message({
          type: 'error',
          message: '数据错误!'
        })
      }
    },
    // 根据id查询记录
    getById(id) {
      this.bill.id = id
      bill.getById(id).then(response => {
        this.bill = response.data.bill
        this.orders = response.data.bill.orders
        this.customerEmptyBottles = response.data.bill.customerEmptyBottles
      })
    },
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
    }
  }
}
</script>
