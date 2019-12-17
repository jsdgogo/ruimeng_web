<template>
  <div class="app-container">
    <el-form ref="form" :model="order" label-width="100px" >
      <el-form-item label="客户名称">
        <el-col :span="8">
          <el-input v-model="order.name" />
        </el-col>
      </el-form-item>
      <el-form-item label="所在地址">
        <el-col :span="8">
          <el-input v-model="order.address"/>
        </el-col>
      </el-form-item>
      <el-form-item label="联系人姓名">
        <el-col :span="8">
          <el-input v-model="order.linkman"/>
        </el-col>
      </el-form-item>
      <el-form-item label="联系人电话">
        <el-col :span="8">
          <el-input v-model="order.phone"/>
        </el-col>
      </el-form-item>
      <el-form-item label="联系人微信号">
        <el-col :span="8">
          <el-input v-model="order.wechatId"/>
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
import order from '@/api/order'
export default {
  data() {
    return {
      order: {
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
      order.save(this.order).then(response => {
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
        this.order = response.data.order
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
