<template>
  <div>
    <!--添加字典类型  -->
    <el-form ref="form" :model="dict" :rules="rules" label-width="80px" class="demo-ruleForm">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="类型名称" prop="dictName">
            <el-input v-model="dict.dictName" placeholder="请输入类型名称" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="类型标识" prop="dictType">
            <el-input v-model="dict.dictType" placeholder="请输入类型标识" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="类型备注">
            <el-input v-model="dict.remark" placeholder="请输入类型备注" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="类型状态" prop="isEnabled">
            <el-radio-group v-model="dict.isEnabled">
              <el-radio :label="1">启用</el-radio>
              <el-radio :label="0">弃用</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12" :offset="6">
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
import dictTypeApi from '@/api/sys/dict/type'
export default {
  data() {
    return {
      dict: {},
      // 表单校验
      rules: {
        dictName: [
          { required: true, message: '类型名称不能为空', tirgger: 'blur' }
        ],
        dictType: [
          { required: true, message: '类型标识不能为空', tirgger: 'blur' }
        ],
        isEnabled: [
          { required: true, message: '请选择类型状态', trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    onSubmit() {
      dictTypeApi.save(this.dict).then(res => {
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
