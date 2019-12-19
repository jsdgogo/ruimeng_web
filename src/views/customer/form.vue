<template>
  <div class="app-container">
    <el-form ref="form" :model="customer" label-width="100px" >
      <el-form-item label="客户名称">
        <el-col :span="8">
          <el-input v-model="customer.name" />
        </el-col>
      </el-form-item>
      <el-form-item label="所在地址">
        <el-col :span="8">
          <el-input v-model="customer.address"/>
        </el-col>
      </el-form-item>
      <el-form-item label="联系人姓名">
        <el-col :span="8">
          <el-input v-model="customer.linkman"/>
        </el-col>
      </el-form-item>
      <el-form-item label="联系人电话">
        <el-col :span="8">
          <el-input v-model="customer.phone"/>
        </el-col>
      </el-form-item>
      <el-form-item label="联系人微信号">
        <el-col :span="8">
          <el-input v-model="customer.wechatId"/>
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
        id:'',
        name: '',
        address: '',
        phone: '',
        wechatId: '',
        linkName: ''
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
  // created() {
  //   if (this.$route.params && this.$route.params.id) {
  //     const id = this.$route.params.id
  //     this.getById(id)
  //   }
  // },
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
        // 使用对象拓展运算符，拷贝对象，而不是引用，
        // 否则新增一条记录后，defaultForm就变成了之前新增的teacher的值
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
        this.customer = { ...response.data.customer }
      })
    },
    // 更新
    update() {
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
