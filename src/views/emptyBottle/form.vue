<template>
  <div class="app-container">
    <el-form ref="form" :model="emptyBottle" label-width="100px" >
      <el-form-item label="空瓶名称">
        <el-col :span="8">
          <el-input v-model="emptyBottle.name" />
        </el-col>
      </el-form-item>
      <el-form-item label="空瓶类型">
        <el-col :span="8">
          <el-input v-model="emptyBottle.type"/>
        </el-col>
      </el-form-item>
      <el-form-item label="空瓶数量">
        <el-col :span="8">
          <el-input v-model="emptyBottle.number"/>
        </el-col>
      </el-form-item>
      <el-form-item label="空瓶单价">
        <el-col :span="8">
          <el-input v-model="emptyBottle.price"/>
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
import emptyBottle from '@/api/emptyBottle'
export default {
  data() {
    return {
      emptyBottle: {
        name: '',
        type: '',
        number: '',
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
        this.emptyBottle = { ...emptyBottle }
      }
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
      emptyBottle.getById(id).then(response => {
        this.emptyBottle = response.data.emptyBottle
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
