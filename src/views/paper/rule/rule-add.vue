<template>
  <div>
    <!--添加试卷规则  -->
    <el-form ref="form" :model="rule" :rules="rules" label-width="80px" class="demo-ruleForm">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="规则名称" prop="paperRuleName">
            <el-input v-model="rule.paperRuleName" placeholder="请输入试卷规则名称" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="规则题库" prop="repositoryId">
            <el-select v-model="rule.repositoryId" placeholder="请选择所属题库" clearable filterable>
              <el-option
                v-for="repository in $store.getters.repositoryList"
                :key="repository.repositoryId"
                :label="repository.repositoryName"
                :value="repository.repositoryId"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="试卷总分">
            <el-input v-model="rule.totalScore" placeholder="请输入试卷总分" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="试卷时长">
            <el-input v-model="rule.totalTime" placeholder="请输入试卷时长" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="合格分数">
            <el-input v-model="rule.eligibilityScore" placeholder="请输入试卷总分" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="规则状态" prop="isEnabled">
            <el-radio-group v-model="rule.isEnabled">
              <el-radio :label="1">启用</el-radio>
              <el-radio :label="0">弃用</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="单选题数">
            <el-input-number v-model="rule.singleCount" :min="0" :max="9999" placeholder="请输入单选题数" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="单选总分">
            <el-input v-model="rule.singleScore" placeholder="请输入单选总分" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="多选题数">
            <el-input-number v-model="rule.multipleCount" :min="0" :max="9999" placeholder="请输入多选题数" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="多选总分">
            <el-input v-model="rule.multipleScore" placeholder="请输入多选总分" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="填空题数">
            <el-input-number v-model="rule.fillCount" :min="0" :max="9999" placeholder="请输入填空题数" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="填空总分">
            <el-input v-model="rule.fillScore" placeholder="请输入填空总分" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="判断题数">
            <el-input-number v-model="rule.judgeCount" :min="0" :max="9999" placeholder="请输入判断题数" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="判断总分">
            <el-input v-model="rule.judgeScore" placeholder="请输入判断总分" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="简答题数">
            <el-input-number v-model="rule.shortCount" :min="0" :max="9999" placeholder="请输入简答题数" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="简答总分">
            <el-input v-model="rule.shortScore" placeholder="请输入简答总分" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="规则备注">
            <el-input v-model="rule.remark" placeholder="请输入备注" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
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
import ruleApi from '@/api/paper/rule'
export default {
  data() {
    return {
      rule: {},
      // 表单校验
      rules: {
        ruleName: [
          { required: true, message: '试卷规则名称不能为空', tirgger: 'blur' }
        ],
        isEnabled: [
          { required: true, message: '请选择试卷规则状态', trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    onSubmit() {
      ruleApi.save(this.rule).then(res => {
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
