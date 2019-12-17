<template>
  <div class="app-container">
    词库列表
  </div>
</template>

<script>
import wordLib from '@/api/wordLib'
export default {

  data() { // 定义数据
    return {
      listLoading: true, // 是否显示loading信息
      list: null, // 数据列表
      total: 0, // 总记录数
      index: 1, // 页码
      size: 10, // 每页记录数
      search: {}// 查询条件}
    }
  },

  created() { // 当页面加载时获取数据
    this.fetchData()
  },

  methods: {
    fetchData() { // 调用api层获取数据库中的数据
      console.log('加载列表')
      wordLib.getList().then(response => {
        this.list = response.data.wordLibs
        this.total = response.data.total
        this.index = response.data.index
        this.size = response.data.size
      })
    }
  }
}
</script>
