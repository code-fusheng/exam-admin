<template>
  <div>
    <!--添加字典类型  -->
    <el-form ref="form" :model="data" :rules="rules" label-width="80px" class="demo-ruleForm">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="字典标签" prop="dictLabel">
            <el-input v-model="data.dictLabel" placeholder="请输入字典标签" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="类型标识" prop="dictType">
            <el-input v-model="data.dictType" placeholder="请输入类型标识" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="字典键值" prop="dictValue">
            <el-input v-model="data.dictValue" placeholder="请输入字典键值" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="字典排序">
            <el-input-number v-model="data.dictSort" :min="1" :max="99" placeholder="字典排序" />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="类型备注">
            <el-input v-model="data.remark" placeholder="请输入类型备注" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="类型状态" prop="isEnabled">
            <el-radio-group v-model="data.isEnabled">
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
import dictDataApi from '@/api/sys/dict/data'
export default {
  // 父组件将数据传递给子组件
  props: {
    type: {
      type: Object,
      default: null
    },
    data: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      dict: {},
      // 表单校验
      rules: {
        dictLabel: [
          { required: true, message: '字典标签不能为空', tirgger: 'blur' }
        ],
        dictType: [
          { required: true, message: '类型标识不能为空', tirgger: 'blur' }
        ],
        dictValue: [
          { required: true, message: '字典键值不能为空', tirgger: 'blur' }
        ],
        isEnabled: [
          { required: true, message: '请选择类型状态', trigger: 'change' }
        ]
      }
    }
  },
  created() {
    this.data.dictType = this.type
  },
  methods: {
    onSubmit() {
      dictDataApi.update(this.data).then(res => {
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
