<template>
  <div class="app-container">
    <el-form :inline="true" class="demo-form-inline" label-width="80px">
      <el-form-item label="客户名称:">
        <el-input v-model.trim="customer.name" placeholder="未选择" readonly/>
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
          <el-button slot="reference" :disabled="addCustomersButton" type="primary" @click="addCustomers()">选择客户</el-button>
        </el-popover>
      </el-form-item>

    </el-form>
    <el-form :inline="true" class="demo-form-inline" label-width="80px" >
      <el-form-item label="空瓶类型:">
        <el-input v-model.trim="emptyBottle.gasCylinderName" placeholder="未选择" readonly/>
      </el-form-item>
      <el-form-item>
        <el-popover
          placement="right"
          width="600"
          trigger="click">
          <el-form :inline="true" class="demo-form-inline" >
            <el-form-item>
              <el-input v-model.trim="search" placeholder=" 类型 " />
            </el-form-item>
            <el-button type="primary" icon="el-icon-search" @click="getEmptyBottleList(index=1,size,search)">查询</el-button>
            <el-button type="default" @click="resetData()">清空</el-button>
          </el-form>
          <el-table
            v-loading="listLoading"
            :data="emptyBottleList"
            element-loading-text="数据加载中"
            border
            fit
            highlight-current-row>
            <el-table-column width="70" property="id" label="id"/>
            <el-table-column width="160" property="gasCylinderName" label="空瓶类型"/>
            <el-table-column width="160" property="price" label="空瓶单价"/>
            <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                <el-button type="success" size="medium" icon="el-icon-success" @click="addEmptyBottle(scope.row.id,scope.row.gasCylinderName,scope.row.price)">添加</el-button>
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
            @current-change="handleEmptyBottleCurrentChange"/>
          <el-button slot="reference" type="primary" @click="addorderItems()">选择空瓶</el-button>
        </el-popover>
      </el-form-item>
    </el-form>
    <el-form ref="customerEmptyBottle" :model="customerEmptyBottle" label-width="80px">
      <el-form-item label="所欠总数">
        <el-col :span="8">
          <el-input-number v-model="customerEmptyBottle.total" :min="1"/>
        </el-col>
      </el-form-item>
      <el-form-item label="已归还">
        <el-col :span="8">
          <el-input-number v-model="customerEmptyBottle.sendBackNumber" :min="0" />
        </el-col>
      </el-form-item>
      <el-form-item label="单价">
        <el-col :span="3">
          <el-input v-model="customerEmptyBottle.price" readonly/>
        </el-col>
      </el-form-item>
      <el-form-item label="空瓶欠款">
        <el-col :span="3">
          <el-input v-model="customerEmptyBottle.totalPrice" readonly/>
        </el-col>
      </el-form-item>
      <el-form-item label="创建时间">
        <el-date-picker
          v-model.trim="customerEmptyBottle.createTimeStr"
          type="datetime"
          placeholder="创建时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          default-time="00:00:00"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="saveOrUpdate">保存</el-button>
        <el-button type="primary" @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
</div></template>
<script>
import customerEmptyBottle from '@/api/customerEmptyBottle'
import customer from '@/api/customer'
import emptyBottle from '@/api/emptyBottle'
export default {
  data() {
    return {
      addCustomersButton: false,
      listLoading: true, // 是否显示loading信息
      emptyBottleList: [],
      customerList: [],
      total: 0, // 总记录数
      index: 1, // 页码
      size: 8, // 每页记录数
      search: '', // 查询条件
      beginTime: '',
      endTime: '',
      id: '',
      customer: {
        id: '',
        name: ''
      },
      emptyBottle: {
        id: '',
        name: '',
        price: ''
      },
      saveBtnDisabled: false, // 保存按钮是否禁用,
      customerEmptyBottle: {
        id: '',
        createTimeStr: '',
        customerId: '',
        customerName: '',
        emptyBottleId: '',
        gasCylinderName: '',
        price: '',
        sendBackNumber: '',
        total: '',
        totalPrice: ''
      }
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
    cancel() {
      this.$router.push({ path: '/customerEmptyBottle' })
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
        this.customerEmptyBottle = {}
      }
    },
    addCustomer(id, name) {
      this.customer.id = id
      this.customer.name = name
      this.customerEmptyBottle.customerId = this.customer.id
      this.customerEmptyBottle.customerName = this.customer.name
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
    addEmptyBottle(id, gasCylinderName, price) {
      this.emptyBottle.id = id
      this.emptyBottle.gasCylinderName = gasCylinderName
      this.emptyBottle.price = price
      this.customerEmptyBottle.emptyBottleId = this.emptyBottle.id
      this.customerEmptyBottle.gasCylinderName = this.emptyBottle.gasCylinderName
      this.customerEmptyBottle.price = this.emptyBottle.price
    },
    addorderItems() {
      this.size = 8
      this.index = 1
      this.total = 0
      this.search = ''
      this.getEmptyBottleList()
    },
    handleorderItemsizeChange(size) {
      this.size = size
      this.index = 1
      this.getEmptyBottleList()
    },
    handleEmptyBottleCurrentChange(index) {
      this.index = index
      this.getEmptyBottleList()
    },
    getEmptyBottleList() {
      this.listLoading = true
      emptyBottle.getPageList(this.index, this.size, this.search).then(response => {
        this.total = response.data.page.total
        this.index = response.data.page.current
        this.size = response.data.page.size
        this.emptyBottleList = response.data.page.records
        this.listLoading = false
      })
    },

    // 保存
    saveOrUpdate() {
      this.saveBtnDisabled = true
      if (!this.customerEmptyBottle.id) {
        this.save()
      } else {
        this.update()
      }
    },
    save() {
      customerEmptyBottle.save(this.customerEmptyBottle).then(response => {
        return this.$message({
          type: 'success',
          message: '保存成功!'
        })
      }).then(resposne => {
        this.$router.push({ path: '/customerEmptyBottle' })
      })
    },
    // 根据id查询记录
    getById(id) {
      this.customerEmptyBottle.id = id
      customerEmptyBottle.getById(id).then(response => {
        this.customerEmptyBottle.id = response.data.customerEmptyBottle.id
        this.customerEmptyBottle.price = response.data.customerEmptyBottle.price
        this.customerEmptyBottle.customerId = response.data.customerEmptyBottle.customerId
        this.customerEmptyBottle.customerName = response.data.customerEmptyBottle.customerName
        this.customerEmptyBottle.emptyBottleId = response.data.customerEmptyBottle.gasCylinderId
        this.customerEmptyBottle.gasCylinderName = response.data.customerEmptyBottle.gasCylinderName
        this.customerEmptyBottle.createTimeStr = response.data.customerEmptyBottle.createTime
        this.customerEmptyBottle.total = response.data.customerEmptyBottle.total
        this.customerEmptyBottle.sendBackNumber = response.data.customerEmptyBottle.sendBackNumber
        this.emptyBottle.id = this.customerEmptyBottle.emptyBottleId
        this.emptyBottle.gasCylinderName = this.customerEmptyBottle.gasCylinderName
        this.emptyBottle.price = this.customerEmptyBottle.price
        this.customer.id = this.customerEmptyBottle.customerId
        this.customer.name = this.customerEmptyBottle.customerName
        this.customerEmptyBottle.totalPrice = response.data.customerEmptyBottle.totalPrice
      })
    },
    // 更新
    update() {
      customerEmptyBottle.update(this.customerEmptyBottle).then(response => {
        return this.$message({
          type: 'success',
          message: '修改成功!'
        })
      }).then(resposne => {
        this.$router.push({ path: '/customerEmptyBottle' })
      })
    }
  }
}
</script>
