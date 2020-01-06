<template>
  <div class="app-container">
    <el-form ref="form" :model="customer" label-width="100px" >
      <el-form-item label="客户名称">
        <el-col :span="8">
          <el-input v-model.trim="customer.name" />
        </el-col>
      </el-form-item>
      <el-form-item label="所在地址">
        <el-col :span="8">
          <el-input v-model.trim="customer.address"/>
        </el-col>
      </el-form-item>
      <el-form-item label="联系人姓名">
        <el-col :span="8">
          <el-input v-model.trim="customer.linkman"/>
        </el-col>
      </el-form-item>
      <el-form-item label="联系人电话">
        <el-col :span="8">
          <el-input v-model.trim="customer.phone"/>
        </el-col>
      </el-form-item>
      <el-form-item label="联系人微信号">
        <el-col :span="8">
          <el-input v-model.trim="customer.wechatId"/>
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
import customer from '@/api/customer'
export default {
  data() {
    return {
      customer: {
        id: '',
        name: '',
        address: '',
        phone: '',
        wechatId: '',
        linkman: ''
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
      this.$router.push({ path: '/customer' })
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
        this.customer = { ...customer }
      }
    },
    // 保存
    saveOrUpdate() {
      this.saveBtnDisabled = true
      if (!this.customer.id) {
        this.save()
      } else {
        this.update()
      }
    },
    save() {
      customer.save(this.customer).then(response => {
        return this.$message({
          type: 'success',
          message: '保存成功!'
        })
      }).then(resposne => {
        this.$router.push({ path: '/customer' })
      })
    },
    // 根据id查询记录
    getById(id) {
      customer.getById(id).then(response => {
        this.customer.id = response.data.customer.id
        this.customer.name = response.data.customer.name
        this.customer.linkman = response.data.customer.linkman
        this.customer.wechatId = response.data.customer.wechatId
        this.customer.phone = response.data.customer.phone
        this.customer.address = response.data.customer.address
      })
    },
    // 更新
    update() {
      console.log(this.customer)
      customer.update(this.customer).then(response => {
        return this.$message({
          type: 'success',
          message: '修改成功!'
        })
      }).then(resposne => {
        this.$router.push({ path: '/customer' })
      })
    }
  }
}
</script>
