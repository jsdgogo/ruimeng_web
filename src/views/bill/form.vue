<template>
  <div class="app-container">
    <el-form :inline="true" class="demo-form-inline" label-width="100px">
      <el-form-item label="客户名称:">
        <el-input v-model.trim="customer.customerName" placeholder="未选择" readonly/>
      </el-form-item>
      <el-form-item>
        <el-popover
          placement="right"
          width="900"
          trigger="click">
          <el-form :inline="true" class="demo-form-inline" >
            <el-form-item>
              <el-input v-model.trim="search" placeholder="姓名 微信 地址 电话 联系人" />
            </el-form-item>
            <el-button type="primary" icon="el-icon-search" @click="getCustomerList(index=1,size,search)">查询</el-button>
            <el-button type="default" @click="resetData()">清空</el-button>
          </el-form>
          <el-table
            v-loading="listLoading"
            :data="customerList"
            element-loading-text="数据加载中"
            border
            fit
            highlight-current-row>
            <el-table-column width="70" property="id" label="客户id"/>
            <el-table-column width="160" property="name" label="客户姓名"/>
            <el-table-column width="160" property="address" label="客户地址"/>
            <el-table-column width="100" property="linkman" label="联系人"/>
            <el-table-column width="120" property="phone" label="电话"/>
            <el-table-column width="120" property="wechatId" label="微信"/>
            <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                <el-button type="success" size="medium" icon="el-icon-success" @click="addCustomer(scope.row.id,scope.row.name)">添加</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            :current-page="index"
            :page-size="size"
            :page-sizes="[8,10,15,30]"
            :total="total"
            style="padding: 30px 0; text-align: center;"
            layout="total, sizes, prev, pager, next, jumper"
            @size-change="handleCustomerSizeChange"
            @current-change="handleCustomerCurrentChange"/>
          <el-button slot="reference" :disabled="addCustomersButton" type="primary" @click="addCustomers()" >选择客户</el-button>
        </el-popover>
      </el-form-item>
    </el-form>
    <el-form ref="bill" :model="bill" label-width="100px" >
      <el-form-item label="总欠款">
        <el-col :span="8">
          <el-input-number v-model="bill.totalDebt" :precision="4" :step="0.1" :min="0"/>
        </el-col>
      </el-form-item>
      <el-form-item label="已付款">
        <el-col :span="8">
          <el-input-number v-model="bill.paid" :precision="4" :step="0.1" :min="0"/>
        </el-col>
      </el-form-item>
      <el-form-item label="订单欠款">
        <el-col :span="8">
          <el-input-number v-model="bill.orderDebt" :precision="4" :step="0.1" :min="0"/>
        </el-col>
      </el-form-item>
      <el-form-item label="订单总金额">
        <el-col :span="8">
          <el-input-number v-model="bill.orderTotal" :precision="4" :step="0.1" :min="0"/>
        </el-col>
      </el-form-item>
      <el-form-item label="空瓶欠款">
        <el-col :span="8">
          <el-input-number v-model="bill.emptyBottleTotal" :precision="4" :step="0.1" :min="0"/>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="saveOrUpdate">保存</el-button>
        <el-button @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import bill from '@/api/bill'
import customer from '@/api/customer'
export default {
  data() {
    return {
      addCustomersButton: false,
      listLoading: true, // 是否显示loading信息
      customerList: [], // 数据列表
      total: 0, // 总记录数
      index: 1, // 页码
      size: 8, // 每页记录数
      search: '', // 查询条件
      beginTime: '',
      endTime: '',
      customer: {
        customerId: 0,
        customerName: ''
      },
      bill: {
        id: 0,
        customerId: 0,
        customerName: '',
        totalDebt: 0,
        orderDebt: 0,
        orderTotal: 0,
        paid: 0,
        emptyBottleTotal: 0
      },
      saveBtnDisabled: false // 保存按钮是否禁用,
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
    addCustomer(id, name) {
      this.customer.customerId = id
      this.customer.customerName = name
    },
    addCustomers() {
      this.size = 8
      this.index = 1
      this.total = 0
      this.search = ''
      this.getCustomerList()
    },
    handleCustomerSizeChange(size) {
      this.size = size
      this.index = 1
      this.getCustomerList()
    },
    handleCustomerCurrentChange(index) {
      this.index = index
      this.getCustomerList()
    },
    getCustomerList() {
      this.listLoading = true
      customer.getPageList(this.index, this.size, this.search).then(response => {
        this.total = response.data.page.total
        this.index = response.data.page.current
        this.size = response.data.page.size
        this.customerList = response.data.page.records
        this.listLoading = false
      })
    },
    cancel() {
      this.$router.push({ path: '/bill' })
      return this.$message({
        type: 'error',
        message: '已取消!'
      })
    },
    init() {
      if (this.$route.params && this.$route.params.id) {
        this.addCustomersButton = true
        const id = this.$route.params.id
        this.getById(id)
      } else {
        this.addCustomersButton = false
        this.bill = {}
      }
    },
    // 保存
    saveOrUpdate() {
      this.saveBtnDisabled = true
      if (!this.bill.id) {
        this.save()
      } else {
        this.update()
      }
    },
    save() {
      bill.save(this.bill).then(response => {
        return this.$message({
          type: 'success',
          message: '保存成功!'
        })
      }).then(resposne => {
        this.$router.push({ path: '/bill' })
      })
    },
    // 根据id查询记录
    getById(id) {
      bill.getById(id).then(response => {
        this.bill.id = response.data.bill.id
        this.bill.customerId = response.data.bill.customerId
        this.bill.customerName = response.data.bill.customerName
        this.bill.totalDebt = response.data.bill.totalDebt
        this.bill.orderDebt = response.data.bill.orderDebt
        this.bill.orderTotal = response.data.bill.orderTotal
        this.bill.paid = response.data.bill.paid
        this.bill.emptyBottleTotal = response.data.bill.emptyBottleTotal
        this.customer.customerName = this.bill.customerName
        this.customer.customerId = this.bill.customerId
      })
    },
    // 更新
    update() {
      bill.update(this.bill).then(response => {
        return this.$message({
          type: 'success',
          message: '修改成功!'
        })
      }).then(resposne => {
        this.$router.push({ path: '/bill' })
      })
    }
  }
}
</script>
