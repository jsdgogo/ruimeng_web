<template>
  <div class="app-container">
    <el-form ref="gasCylinder" :model="gasCylinder" label-width="100px" >
      <el-form-item label="气瓶类型">
        <el-col :span="4">
          <el-input v-model.trim="gasCylinder.name" />
        </el-col>
      </el-form-item>
      <el-form-item label="库存">
        <el-col :span="8">
          <el-input-number v-model="gasCylinder.inventory" :min="1" />
        </el-col>
      </el-form-item>
      <el-form-item label="单价">
        <el-col :span="8">
          <el-input-number v-model="gasCylinder.price" :precision="4" :step="0.1" :min="0"/>
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
import gasCylinder from '@/api/gasCylinder'
export default {
  data() {
    return {
      gasCylinder: {
        name: '',
        type: '',
        inventory: '',
        price: ''
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
    cancel() {
      this.$router.push({ path: '/gasCylinder' })
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
        this.gasCylinder = {}
      }
    },
    // 保存
    saveOrUpdate() {
      this.saveBtnDisabled = true
      if (!this.gasCylinder.id) {
        this.save()
      } else {
        this.update()
      }
    },
    save() {
      gasCylinder.save(this.gasCylinder).then(response => {
        return this.$message({
          type: 'success',
          message: '保存成功!'
        })
      }).then(resposne => {
        this.$router.push({ path: '/gasCylinder' })
      })
    },
    // 根据id查询记录
    getById(id) {
      gasCylinder.getById(id).then(response => {
        this.gasCylinder.id = response.data.gasCylinder.id
        this.gasCylinder.name = response.data.gasCylinder.name
        this.gasCylinder.type = response.data.gasCylinder.type
        this.gasCylinder.inventory = response.data.gasCylinder.inventory
        this.gasCylinder.price = response.data.gasCylinder.price
      })
    },
    // 更新
    update() {
      gasCylinder.update(this.gasCylinder).then(response => {
        return this.$message({
          type: 'success',
          message: '修改成功!'
        })
      }).then(resposne => {
        this.$router.push({ path: '/gasCylinder' })
      })
    }
  }
}
</script>
