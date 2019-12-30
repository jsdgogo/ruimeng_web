<template>
  <div class="app-container">
    <el-form :inline="true" class="demo-form-inline" >
      <el-form-item label="客户名称:">
        <el-input v-model="customer.customerName" placeholder="未选择" readonly/>
      </el-form-item>
      <el-form-item label="地址:">
        <el-input v-model="customer.address" placeholder="未选择" readonly/>
      </el-form-item>
      <el-form-item>
        <el-popover
          placement="right"
          width="900"
          trigger="click">
          <el-form :inline="true" class="demo-form-inline" >
            <el-form-item>
              <el-input v-model="search" placeholder="姓名 微信 地址 电话 联系人" />
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
                <el-button type="success" size="medium" icon="el-icon-success" @click="addCustomer(scope.row.id,scope.row.name,scope.row.address)">添加</el-button>
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
          <el-button slot="reference" type="primary" @click="addCustomers()">选择客户</el-button>
        </el-popover>
      </el-form-item>
      <el-form-item>
        <el-popover
          placement="right"
          width="600"
          trigger="click">
          <el-form :inline="true" class="demo-form-inline" >
            <el-form-item>
              <el-input v-model="search" placeholder=" 类型 " />
            </el-form-item>
            <el-button type="primary" icon="el-icon-search" @click="getGasCylinderList(index=1,size,search)">查询</el-button>
            <el-button type="default" @click="resetData()">清空</el-button>
          </el-form>
          <el-table
            v-loading="listLoading"
            :data="gasCylinderList"
            element-loading-text="数据加载中"
            border
            fit
            highlight-current-row>
            <el-table-column width="70" property="gasCylinderId" label="id"/>
            <el-table-column width="160" property="name" label="气瓶类型"/>
            <el-table-column width="160" property="inventory" label="气瓶库存"/>
            <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                <el-button type="success" size="medium" icon="el-icon-success" @click="addGasCylinder(scope.row.id,scope.row.name,scope.row.inventory)">添加</el-button>
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
            @size-change="handleorderItemsizeChange"
            @current-change="handleGasCylinderCurrentChange"/>
          <el-button slot="reference" type="primary" @click="addorderItems()">添加气瓶</el-button>
        </el-popover>
      </el-form-item>
    </el-form>
    <el-table
      v-loading="false"
      :data="orderItems"
      element-loading-text="数据加载中"
      border
      fit
      highlight-current-row>
      <el-table-column prop="name" label="气瓶类型" width="180" />
      <el-table-column prop="price" label="单价" width="140">
        <template slot-scope="scope">
          <el-input v-model="scope.row.price" />
        </template>
      </el-table-column>
      <el-table-column prop="quantity" label="数量" width="140">
        <template slot-scope="scope">
          <el-input v-model="scope.row.quantity" />
        </template>
      </el-table-column>
      <el-table-column prop="total" label="金额" width="140" >
        <template v-if="scope.row.price&&scope.row.quantity" slot-scope="scope">
          {{ (scope.row.total = scope.row.price *scope.row.quantity) }}
        </template>
      </el-table-column>
      <el-table-column prop="inventory" label="气瓶库存" width="140"/>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="danger" size="medium" icon="el-icon-delete" @click="removeGasCylinder(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <br>
    <el-button slot="reference" type="primary" style="display:block;margin:0 auto" @click="saveOrUpdate()">生成订单</el-button>
  </div>
</template>
<script>
import order from '@/api/order'
import customer from '@/api/customer'
import gasCylinder from '@/api/gasCylinder'
export default {
  data() {
    return {
      listLoading: true, // 是否显示loading信息
      customerList: [], // 数据列表
      gasCylinderList: [],
      total: 0, // 总记录数
      index: 1, // 页码
      size: 8, // 每页记录数
      search: '', // 查询条件
      beginTime: '',
      endTime: '',
      id: '',
      customer: {
        customerId: '',
        customerName: '',
        address: ''
      },
      gasCylinder: {
        gasCylinderId: '',
        name: '',
        price: '',
        quantity: '',
        total: this.quantity * this.price
      },
      orderItems: [],
      saveBtnDisabled: false, // 保存按钮是否禁用,
      order: {
        orderItems: [],
        customer: {}
      }
    }
  },
  methods: {
    removeGasCylinder(gasCylinderId) {
      var index = this.orderItems.findIndex(item => {
        if (item.gasCylinderId === gasCylinderId) {
          return true
        }
      })
      this.orderItems.splice(index, 1)
    },
    addCustomer(id, name, address) {
      this.customer.customerId = id
      this.customer.customerName = name
      this.customer.address = address
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
    addGasCylinder(gasCylinderId, name, inventory) {
      var gas = { gasCylinderId, name, inventory }
      this.orderItems.push(gas)
    },
    addorderItems() {
      this.size = 8
      this.index = 1
      this.total = 0
      this.search = ''
      this.getGasCylinderList()
    },
    handleorderItemsizeChange(size) {
      this.size = size
      this.index = 1
      this.getGasCylinderList()
    },
    handleGasCylinderCurrentChange(index) {
      this.index = index
      this.getGasCylinderList()
    },
    getGasCylinderList() {
      this.listLoading = true
      gasCylinder.getPageList(this.index, this.size, this.search).then(response => {
        this.total = response.data.page.total
        this.index = response.data.page.current
        this.size = response.data.page.size
        this.gasCylinderList = response.data.page.records
        this.listLoading = false
      })
    },
    cancel() {
      this.$router.push({ path: '/order' })
      return this.$message({
        type: 'error',
        message: '已取消!'
      })
    },
    init() {
      if (this.$route.params && this.$route.params.id) {
        const id = this.$route.params.id
        this.getById(id)
      } else {
        this.order = { ...order }
      }
    },
    // 保存
    saveOrUpdate() {
      this.saveBtnDisabled = true
      if (!this.order.id) {
        this.save()
      } else {
        this.update()
      }
    },
    save() {
      this.order.customer = this.customer
      this.order.orderItems = this.orderItems
      order.save(this.order).then(response => {
        console.log(this.order)
        return this.$message({
          type: 'success',
          message: '保存成功!'
        })
      }).then(resposne => {
        this.$router.push({ path: '/order' })
      })
    },
    // 根据id查询记录
    getById(id) {
      order.getById(id).then(response => {
        this.order.id = response.data.order.id
        this.order.name = response.data.order.name
        this.order.type = response.data.order.type
        this.order.inventory = response.data.order.inventory
        this.order.price = response.data.order.price
      })
    },
    // 更新
    update() {
      order.update(this.order).then(response => {
        return this.$message({
          type: 'success',
          message: '修改成功!'
        })
      }).then(resposne => {
        this.$router.push({ path: '/order' })
      })
    }
  }
}
</script>
