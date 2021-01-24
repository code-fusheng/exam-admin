<template>
  <div>
    <!--添加题库  -->
    <el-form ref="form" :model="repository" :rules="rules" label-width="80px" class="demo-ruleForm">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="题库名称" prop="repositoryName">
            <el-input v-model="repository.repositoryName" placeholder="请输入题库名称" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="题库备注">
            <el-input v-model="repository.remark" placeholder="请输入题库备注" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="题库状态" prop="isEnabled">
            <el-radio-group v-model="repository.isEnabled">
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
import repositoryApi from '@/api/repository/repository'
export default {
  data() {
    return {
      repository: {},
      // 表单校验
      rules: {
        repositoryName: [
          { required: true, message: '题库名称不能为空', tirgger: 'blur' }
        ],
        isEnabled: [
          { required: true, message: '请选择题库状态', trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    onSubmit() {
      repositoryApi.save(this.repository).then(res => {
        this.$message.success(res.msg)
        this.$emit('closeAddDialog')
        this.$emit('getByPage')
        this.resetForm('form')
      })
    },
    close() {
      this.$emit('closeAddDialog')
      this.resetForm('form')
    }
  }
}
</script>
