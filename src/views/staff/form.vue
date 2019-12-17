<template>
  <div class="app-container">
    <el-form ref="form" :model="staff" label-width="100px" >
      <el-form-item label="姓名">
        <el-col :span="8">
          <el-input v-model="staff.name" />
        </el-col>
      </el-form-item>
      <el-form-item label="年龄">
        <el-col :span="8">
          <el-input v-model="staff.age"/>
        </el-col>
      </el-form-item>
      <el-form-item label="工龄">
        <el-col :span="8">
          <el-input v-model="staff.workYears"/>
        </el-col>
      </el-form-item>
      <el-form-item label="联系电话">
        <el-col :span="8">
          <el-input v-model="staff.phone"/>
        </el-col>
      </el-form-item>
      <el-form-item label="月工资">
        <el-col :span="8">
          <el-input v-model="staff.salary"/>
        </el-col>
      </el-form-item>
      <el-form-item label="级别">
        <el-col :span="8">
          <el-input v-model="staff.level"/>
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
import staff from '@/api/staff'
export default {
  data() {
    return {
      staff: {
        name: '',
        age: '',
        phone: '',
        workYears: '',
        salary: '',
        level: ''
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
      this.$router.push({ path: '/staff' })
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
        this.staff = { ...staff }
      }
    },
    // 保存
    saveOrUpdate() {
      this.saveBtnDisabled = true
      if (!this.staff.id) {
        this.save()
      } else {
        this.update()
      }
    },
    save() {
      staff.save(this.staff).then(response => {
        return this.$message({
          type: 'success',
          message: '保存成功!'
        })
      }).then(resposne => {
        this.$router.push({ path: '/staff' })
      })
    },
    // 根据id查询记录
    getById(id) {
      staff.getById(id).then(response => {
        this.staff = response.data.staff
      })
    },
    // 更新
    update() {
      staff.update(this.staff).then(response => {
        return this.$message({
          type: 'success',
          message: '修改成功!'
        })
      }).then(resposne => {
        this.$router.push({ path: '/staff' })
      })
    }
  }
}
</script>
