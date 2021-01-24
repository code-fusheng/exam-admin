<template>
  <div>
    <el-select
      v-model="currentValue"
      filterable
      remote
      :multiple="multi"
      reserve-keyword
      clearable
      automatic-dropdown
      placeholder="选择或者搜索题库"
      :remote-method="getList"
      class="filter-item"
      @change="handlerChange"
    >
      <el-option
        v-for="item in catalogs"
        :key="item.id"
        :label="item.title"
        :value="item.id"
      />
    </el-select>
  </div>
</template>

<script>
import repositoryApi from '@/api/repository/repository'
export default {
  name: 'RepoSelect',
  props: {
    multi: Boolean,
    value: Array,
    default: String
  },
  data() {
    return {
      // 下拉选项值
      catalogs: [],
      currentValue: []
    }
  },
  watch: {
    //  检测查询变化
    value: {
      handler() {
        this.currentValue = this.value
      }
    }
  },
  created() {
    this.currentValue = this.value
    this.getList()
  },
  methods: {
    getList() {
      repositoryApi.getList().then(res => {
        this.catalogs = res.data
      })
    },
    handlerChange(e) {
      this.$emit('change', e)
      this.$emit('input', e)
    }
  }
}
</script>
