<template>
  <div class="app-container">
    <el-form :inline="true" class="demo-form-inline" label-width="80px" >
      <el-form-item label="空瓶类型:">
        <el-input v-model.trim="gasCylinder.name" placeholder="未选择" readonly/>
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
            <el-table-column width="70" property="id" label="id"/>
            <el-table-column width="160" property="name" label="气瓶类型"/>
            <el-table-column width="160" property="inventory" label="气瓶库存"/>
            <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                <el-button type="success" size="medium" icon="el-icon-success" @click="addGasCylinder(scope.row.id,scope.row.name)">添加</el-button>
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
          <el-button slot="reference" type="primary" @click="addorderItems()">选择气瓶</el-button>
        </el-popover>
      </el-form-item>
    </el-form>
    <el-form ref="emptyBottle" :model="emptyBottle" label-width="80px">
      <el-form-item label="数量">
        <el-col :span="8">
          <el-input-number v-model="emptyBottle.number" :min="1" />
        </el-col>
      </el-form-item>
      <el-form-item label="单价">
        <el-col :span="8">
          <el-input-number v-model="emptyBottle.price" :precision="2" :step="0.1" :min="0"/>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="saveOrUpdate">保存</el-button>
        <el-button type="primary" @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
</div></template>
<script>
import emptyBottle from '@/api/emptyBottle'
import gasCylinder from '@/api/gasCylinder'
export default {
  data() {
    return {
      listLoading: true, // 是否显示loading信息
      gasCylinderList: [],
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
      gasCylinder: {
        id: '',
        name: ''
      },
      saveBtnDisabled: false, // 保存按钮是否禁用,
      emptyBottle: {
        id: '',
        gasCylinderId: '',
        gasCylinderName: '',
        price: '',
        number: ''
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
      this.$router.push({ path: '/emptyBottle' })
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
        this.emptyBottle = {}
      }
    },
    addGasCylinder(id, name) {
      this.gasCylinder.id = id
      this.gasCylinder.name = name
      this.emptyBottle.gasCylinderId = this.gasCylinder.id
      this.emptyBottle.gasCylinderName = this.gasCylinder.name
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

    // 保存
    saveOrUpdate() {
      this.saveBtnDisabled = true
      if (!this.emptyBottle.id) {
        this.save()
      } else {
        this.update()
      }
    },
    save() {
      emptyBottle.save(this.emptyBottle).then(response => {
        return this.$message({
          type: 'success',
          message: '保存成功!'
        })
      }).then(resposne => {
        this.$router.push({ path: '/emptyBottle' })
      })
    },
    // 根据id查询记录
    getById(id) {
      this.emptyBottle.id = id
      emptyBottle.getById(id).then(response => {
        this.emptyBottle.id = response.data.emptyBottle.id
        this.emptyBottle.price = response.data.emptyBottle.price
        this.emptyBottle.gasCylinderId = response.data.emptyBottle.gasCylinderId
        this.emptyBottle.gasCylinderName = response.data.emptyBottle.gasCylinderName
        this.emptyBottle.number = response.data.emptyBottle.number
        this.gasCylinder.id = this.emptyBottle.gasCylinderId
        this.gasCylinder.name = this.emptyBottle.gasCylinderName
      })
    },
    // 更新
    update() {
      emptyBottle.update(this.emptyBottle).then(response => {
        return this.$message({
          type: 'success',
          message: '修改成功!'
        })
      }).then(resposne => {
        this.$router.push({ path: '/emptyBottle' })
      })
    }
  }
}
</script>
