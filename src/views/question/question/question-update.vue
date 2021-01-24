<template>
  <div>
    <!--更新自定义试题内容  -->
    <el-form ref="form" v-loading="loading" :model="questionVo" :rules="rules" label-width="80px" class="demo-ruleForm">
      <el-card>
        <div slot="header" class="clearfix">
          <span>更新试卷试题内容</span>
          <el-button style="float: right; padding: 3px 10px" class="filter-item" type="text" icon="el-icon-refresh" @click="saveQuestionVo">
            保存试题
          </el-button>
        </div>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="试题类型" prop="questionTypeId">
              <el-select v-model="questionVo.questionTypeId" placeholder="请选择试题类型" clearable filterable>
                <el-option
                  v-for="item in questionTypeList"
                  :key="item.dictValue"
                  :label="item.dictLabel"
                  :value="item.dictValue"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="试题标签" prop="questionTagId">
              <el-select v-model="questionVo.questionTagId" placeholder="请选择试题标签" clearable filterable>
                <el-option
                  v-for="item in questionTagList"
                  :key="item.dictValue"
                  :label="item.dictLabel"
                  :value="item.dictValue"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="题库归属" prop="repositoryId">
              <el-select v-model="questionVo.repositoryId" placeholder="请选择所属题库" clearable filterable>
                <el-option
                  v-for="repository in $store.getters.repositoryList"
                  :key="repository.repositoryId"
                  :label="repository.repositoryName"
                  :value="repository.repositoryId"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="试题备注">
              <el-input v-model="questionVo.remark" placeholder="请输入题库备注" />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="试题内容" prop="questionContent">
              <el-input v-model="questionVo.questionContent" type="textarea" :rows="4" placeholder="请输入题库内容" />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="内容扩展">
              <el-button>添加试题图片</el-button>
              <el-button>添加试题视频</el-button>
              <el-button>添加试题代码</el-button>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item v-show="paperid !== null" label="试题排序">
              <el-input-number v-model="questionVo.questionSort" :min="0" :max="9999" placeholder="请输入试题排序" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item v-show="paperid !== null" label="试题分值">
              <el-input v-model="questionVo.questionScore" placeholder="请输入试题分值" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="试题状态" prop="isEnabled">
              <el-radio-group v-model="questionVo.isEnabled">
                <el-radio :label="1">启用</el-radio>
                <el-radio :label="0">弃用</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="试题分析">
              <el-input v-model="questionVo.anaylsis" type="textarea" :rows="2" placeholder="请输入试题分析" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-card>
      <el-card>
        <div slot="header" class="clearfix">
          <span>答案列表</span>
          <el-button style="float: right; padding: 3px 10px" class="filter-item" type="text" icon="el-icon-plus" @click="handleAdd">
            添加答案项
          </el-button>
        </div>
        <el-table
          :data="questionVo.answerList"
          :border="true"
          style="width: 100%"
        >
          <el-table-column label="是否答案" width="120" align="center">
            <template slot-scope="scope">
              <el-checkbox v-model="scope.row.isRight" :true-label="1" :false-label="0" :checked="scope.row.isRight === 1 ? true : false">答案</el-checkbox>
            </template>
          </el-table-column>
          <el-table-column label="答案内容">
            <template slot-scope="scope">
              <el-input v-model="scope.row.answerContent" type="textarea" :rows="2" />
            </template>
          </el-table-column>
          <el-table-column label="答案解析">
            <template slot-scope="scope">
              <el-input v-model="scope.row.analysis" type="textarea" :rows="2" />
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" width="100px">
            <template slot-scope="scope">
              <el-button type="danger" icon="el-icon-delete" size="mini" circle @click="removeItem(scope.$index)" />
            </template>
          </el-table-column>
        </el-table>
      </el-card>
      <el-row :gutter="20" type="flex" justify="center">
        <el-col :span="12">
          <el-form-item>
            <el-button type="primary" @click="saveQuestionVo">提交</el-button>
            <el-button @click="close">取消</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import questionApi from '@/api/question/question'
import paperApi from '@/api/paper/paper'
export default {
  // 父组件将数据传递给子组件
  props: {
    question: {
      type: Object,
      default: null
    },
    paperid: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      // 题库列表
      questionVo: this.question,
      repositoryList: this.$store.getters.repositoryList,
      questionTypeList: [
        { dictLabel: '其它', dictValue: 0 },
        { dictLabel: '单选题', dictValue: 1 },
        { dictLabel: '多选题', dictValue: 2 },
        { dictLabel: '填空题', dictValue: 3 },
        { dictLabel: '判断题', dictValue: 4 },
        { dictLabel: '简答题', dictValue: 5 }
      ],
      questionTagList: [
        { dictLabel: '其它', dictValue: 0 },
        { dictLabel: '基础题', dictValue: 1 },
        { dictLabel: '提升题', dictValue: 2 },
        { dictLabel: '开放题', dictValue: 3 },
        { dictLabel: '主观题', dictValue: 4 },
        { dictLabel: '客观题', dictValue: 5 }
      ],
      // 表单校验
      rules: {
        questionTypeId: [
          { type: 'date', required: true, message: '试题类型不能为空', tirgger: 'blur' }
        ],
        questionTagId: [
          { type: 'date', required: true, message: '试题标签不能为空', tirgger: 'blur' }
        ],
        repositoryId: [
          { required: true, message: '题库归属不能为空', tirgger: 'blur' }
        ],
        questionContent: [
          { required: true, message: '试题内容不能为空', tirgger: 'blur' }
        ],
        isEnabled: [
          { required: true, message: '请选择试题状态', trigger: 'change' }
        ]
      },
      loading: false
    }
  },
  watch: {
    'question': function() {
      this.questionVo = this.question
    }
  },
  methods: {
    saveQuestionVo() {
      this.loading = true
      console.log(this.paperid)
      if (this.paperid === null || this.paperid === '') {
        questionApi.update(this.questionVo).then(res => {
          console.log('修改了试题!')
          this.$message.success(res.msg)
          this.$emit('closeUpdateDrawer')
          this.$emit('getByPage')
          this.resetForm('form')
        })
      } else {
        this.questionVo.paperId = this.paperid
        console.log('修改了试卷中的试题!')
        paperApi.updateQuestionVoForPaper(this.questionVo).then(res => {
          this.$message.success(res.msg)
          this.$emit('closeUpdateDrawer')
          this.$emit('getQuestionVoListByPaperId')
          this.resetForm('form')
          this.questionVo.answerList = []
        })
      }
    },
    handleAdd() {
      this.questionVo.answerList.push({ isRight: 0, answerContent: '', analysis: '' })
    },
    removeItem(index) {
      this.questionVo.answerList.splice(index, 1)
    },
    close() {
      this.$emit('closeUpdateDrawer')
      this.resetForm('form')
    }
  }
}
</script>

<style scoped>
  .el-form-item {
    margin-bottom: 10px;
    margin-top: 10px;
  }
</style>
