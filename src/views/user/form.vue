<template>
  <div class="app-container">
    <el-form ref="form" :model="user" label-width="100px" >
      <el-form-item label="旧密码">
        <el-col :span="8">
          <el-input v-model.trim="user.oldPassword" type="password"/>
        </el-col>
      </el-form-item>
      <el-form-item label="新账号">
        <el-col :span="8">
          <el-input v-model.trim="user.loginName" type="text" auto-complete="on"/>
        </el-col>
      </el-form-item>
      <el-form-item label="新密码">
        <el-col :span="8">
          <el-input v-model.trim="user.password" type="password" auto-complete="on"/>
        </el-col>
      </el-form-item>
      <el-form-item label="用户名">
        <el-col :span="8">
          <el-input v-model.trim="user.name"/>
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
import { isvalidUsername } from '@/utils/validate'

export default {
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!isvalidUsername(value)) {
        callback(new Error('请输入正确的账号'))
      } else {
        callback()
      }
    }
    const validatePass = (rule, value, callback) => {
      if (value.length < 5) {
        callback(new Error('密码不能小于5位'))
      } else {
        callback()
      }
    }
    return {
      user: {
        name: '',
        loginName: '',
        password: '',
        oldPassword: ''
      },
      loginRules: {
        loginName: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePass }]
      },
      loading: false,
      pwdType: 'password',
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
      this.$router.push({ path: '/' })
      return this.$message({
        type: 'error',
        message: '已取消修改!'
      })
    },
    init() {
      this.info()
    },
    info() {
      getInfo().then(response => {
        this.user.id = response.data.user.id
        this.user.name = response.data.user.name
      })
    },
    logout() {
      this.$store.dispatch('LogOut').then(() => {
        location.reload() // 为了重新实例化vue-router对象 避免bug
      })
    },
    update() {
      this.$confirm('修改成功将退出到登录页 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        return update(this.user)
      }).then(() => { // 如果上一个then成功则执行此处的then回调
        this.$message({
          type: 'success',
          message: '修改成功!'
        })
        this.logout()
      }).catch((response) => { // 失败
        if (response === 'cancel') {
          this.$message({
            type: 'info',
            message: '已取消修改'
          })
        }
      })
    }
  }
}
</script>
