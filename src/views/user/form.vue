<template>
  <div class="app-container">
    <el-form ref="form" :model="user" label-width="100px" >
      <el-form-item label="登录名">
        <el-col :span="8">
          <el-input v-model="user.loginName"/>
        </el-col>
      </el-form-item>
      <el-form-item label="密码">
        <el-col :span="8">
          <el-input v-model="user.password"/>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="update">保存</el-button>
        <el-button @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { getInfo, update } from '@/api/login'

export default {
  data() {
    return {
      user: {
        // name: '',
        loginName: '',
        password: ''
        // wechatId: '',
        // linkName: ''
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
      this.$router.push({ path: '/' })
      return this.$message({
        type: 'error',
        message: '已取消!'
      })
    },
    init() {
      this.info()
    },
    info() {
      getInfo().then(response => {
        this.user = response.data.user
      })
    },
    // init() {
    //   if (this.$route.params && this.$route.params.id) {
    //     const id = this.$route.params.id
    //     this.getById(id)
    //   } else {
    //     // 使用对象拓展运算符，拷贝对象，而不是引用，
    //     // 否则新增一条记录后，defaultForm就变成了之前新增的teacher的值
    //     this.user = { ...user }
    //   }
    // },
    // // 保存
    // saveOrUpdate() {
    //   this.saveBtnDisabled = true
    //   if (!this.user.id) {
    //     this.save()
    //   } else {
    //     this.update()
    //   }
    // },
    // save() {
    //   user.save(this.user).then(response => {
    //     return this.$message({
    //       type: 'success',
    //       message: '保存成功!'
    //     })
    //   }).then(resposne => {
    //     this.$router.push({ path: '/user' })
    //   })
    // },
    // // 根据id查询记录
    // getById(id) {
    //   user.getById(id).then(response => {
    //     this.user = response.data.user
    //   })
    // },
    // 更新
    update() {
      update(this.user).then(response => {
        return this.$message({
          type: 'success',
          message: '修改成功!'
        })
      }).then(resposne => {
        this.$router.push({ path: '/' })
      })
    }
  }
}
</script>
