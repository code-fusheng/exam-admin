<template>
  <div>
    <!--添加试卷  -->
    <el-form ref="form" :model="paper" :rules="rules" label-width="80px" class="demo-ruleForm">
      <el-row :gutter="20">
        <el-col :span="24">
          <el-form-item label="试卷名称" prop="paperName">
            <el-input v-model="paper.paperName" placeholder="请输入试卷名称" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="试卷规则">
            <el-select v-model="paper.paperRuleId" placeholder="请选择所属题库" clearable filterable>
              <el-option
                v-for="paperRule in $store.getters.paperRuleList"
                :key="paperRule.paperRuleId"
                :label="paperRule.paperRuleName"
                :value="paperRule.paperRuleId"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="试卷状态" prop="isEnabled">
            <el-radio-group v-model="paper.isEnabled">
              <el-radio :label="1">启用</el-radio>
              <el-radio :label="0">弃用</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12" :offset="5">
          <el-form-item>
            <el-button type="primary" @click="onSubmit">提交</el-button>
            <el-button @click="close">取消</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import paperApi from '@/api/paper/paper'
export default {
  props: {
    paper: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      // 表单校验
      rules: {
        paperName: [
          { required: true, message: '试卷名称不能为空', tirgger: 'blur' }
        ],
        isEnabled: [
          { required: true, message: '请选择试卷状态', trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    onSubmit() {
      paperApi.update(this.paper).then(res => {
        this.$message.success(res.msg)
        this.$emit('closeUpdateDialog')
        this.$emit('getByPage')
        this.resetForm('form')
      })
    },
    close() {
      this.$emit('closeUpdateDialog')
      this.resetForm('form')
    }
  }
}
</script>
