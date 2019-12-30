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
      <el-form-item label="职位">
        <el-col :span="8">
          <el-input v-model="staff.position"/>
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
        id: '',
        name: '',
        age: '',
        phone: '',
        workYears: '',
        salary: '',
        position: ''
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
        this.staff.id = response.data.staff.id
        this.staff.name = response.data.staff.name
        this.staff.age = response.data.staff.age
        this.staff.phone = response.data.staff.phone
        this.staff.workYears = response.data.staff.workYears
        this.staff.salary = response.data.staff.salary
        this.staff.level = response.data.staff.position
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
