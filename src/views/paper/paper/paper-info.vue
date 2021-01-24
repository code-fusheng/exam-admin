<template>
  <div>
    <el-form ref="paperVo" v-loading="loading" :model="paperVo" label-position="left" label-width="80px">
      <!-- 试卷信息 -->
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>试卷信息</span>
          <el-button style="float: right; padding: 3px 0" icon="el-icon-refresh" type="text">更新试卷</el-button>
        </div>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="试卷标题">
              <el-input v-model="paperVo.paperName" placeholder="请输入试卷标题" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="试卷编号">
              <el-input v-model="paperVo.paperId" disabled />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="出卷人">
              <el-input v-model="paperVo.createdUserName" disabled />
            </el-form-item>
          </el-col>
        </el-row>
      </el-card>
      <!-- 规则信息 -->
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>规则信息</span>
          <el-button style="float: right; padding: 3px 0" icon="el-icon-refresh" type="text">更新规则</el-button>
        </div>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="试卷规则" prop="paperRuleId">
              <el-select v-model="paperVo.paperRuleId" placeholder="请选择试卷规则" clearable filterable>
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
            <el-form-item label="规则题库" prop="repositoryId">
              <el-select v-model="paperVo.paperRuleVo.repositoryId" placeholder="请选择所属题库" clearable filterable>
                <el-option
                  v-for="repository in $store.getters.repositoryList"
                  :key="repository.repositoryId"
                  :label="repository.repositoryName"
                  :value="repository.repositoryId"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="试卷总分">
              <el-input v-model="paperVo.paperRuleVo.totalScore" placeholder="请输入试卷总分" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="试卷时长">
              <el-input v-model="paperVo.paperRuleVo.totalTime" placeholder="请输入试卷时长" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="合格分数">
              <el-input v-model="paperVo.paperRuleVo.eligibilityScore" placeholder="请输入试卷总分" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="规则状态" prop="isEnabled">
              <el-radio-group v-model="paperVo.paperRuleVo.isEnabled">
                <el-radio :label="1">启用</el-radio>
                <el-radio :label="0">弃用</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="单选题数">
              <el-input-number v-model="paperVo.paperRuleVo.singleCount" :min="0" :max="9999" placeholder="请输入单选题数" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="单选总分">
              <el-input v-model="paperVo.paperRuleVo.singleScore" placeholder="请输入试卷时长" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="多选题数">
              <el-input-number v-model="paperVo.paperRuleVo.multipleCount" :min="0" :max="9999" placeholder="请输入多选题数" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="多选总分">
              <el-input v-model="paperVo.paperRuleVo.multipleScore" placeholder="请输入多选总分" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="填空题数">
              <el-input-number v-model="paperVo.paperRuleVo.fillCount" :min="0" :max="9999" placeholder="请输入填空题数" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="填空总分">
              <el-input v-model="paperVo.paperRuleVo.fillScore" placeholder="请输入填空总分" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="判断题数">
              <el-input-number v-model="paperVo.paperRuleVo.judgeCount" :min="0" :max="9999" placeholder="请输入判断题数" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="判断总分">
              <el-input v-model="paperVo.paperRuleVo.judgeScore" placeholder="请输入判断总分" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="简答题数">
              <el-input-number v-model="paperVo.paperRuleVo.shortCount" :min="0" :max="9999" placeholder="请输入简答题数" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="简答总分">
              <el-input v-model="paperVo.paperRuleVo.shortScore" placeholder="请输入简答总分" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="规则备注">
              <el-input v-model="paperVo.paperRuleVo.remark" placeholder="请输入备注" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-card>
      <!-- 试题信息 -->
      <el-card class="box-card">
        <div v-loading="questionLoading">
          <div slot="header" class="clearfix">
            <span>试题信息</span>
            <el-button style="float: right; padding: 3px 10px" icon="el-icon-refresh" type="text">更新试题</el-button>
            <el-button style="float: right; padding: 3px 10px" icon="el-icon-video-play" type="text">生成试题</el-button>
            <el-button style="float: right; padding: 3px 10px" icon="el-icon-edit" type="text">自定义试题</el-button>
            <el-button style="float: right; padding: 3px 10px" icon="el-icon-view" type="text">显示/隐藏答案</el-button>
          </div>
          <el-card
            v-for="(questionVo, questionIndex) in questionVoList"
            :key="questionVo.questionId"
          >
            <el-row :gutter="20">
              <el-col :span="1.5">
                <el-tag v-if="questionVo.questionTypeId === 0" style="padding: 0 10px" size="mini">其它</el-tag>
                <el-tag v-else-if="questionVo.questionTypeId === 1" style="padding: 0 10px" size="mini">单选题</el-tag>
                <el-tag v-else-if="questionVo.questionTypeId === 2" style="padding: 0 10px" size="mini" type="danger">多选题</el-tag>
                <el-tag v-else-if="questionVo.questionTypeId === 3" style="padding: 0 10px" size="mini" type="warning">填空题</el-tag>
                <el-tag v-else-if="questionVo.questionTypeId === 4" style="padding: 0 10px" size="mini" type="success">判断题</el-tag>
                <el-tag v-else-if="questionVo.questionTypeId === 5" style="padding: 0 10px" size="mini" type="info">简答题</el-tag>
              </el-col>
              <el-col :span="1.5">
                <el-tag type="danger" effect="plain" size="mini">
                  <span>{{ questionVo.questionScore }} 分</span>
                </el-tag>
              </el-col>
              <el-button style="float: right; margin-right: 20px" type="danger" icon="el-icon-delete" size="mini" circle @click="handleDeleteQuestion(questionVo.questionId, paperVo.paperId)" />
              <el-button style="float: right; margin-right: 20px" type="primary" icon="el-icon-edit" size="mini" circle @click="handleUpdateQuestion(questionVo.questionId, paperVo.paperId)" />
            </el-row>
            <el-row :gutter="20">
              <el-col :span="24">
                <span style="color: #909399">第{{ questionIndex + 1 }}题 </span><span> {{ questionVo.questionContent }}</span>
              </el-col>
            </el-row>
            <!-- 单选、多选、判断 -->
            <el-row v-for="(answerVo) in questionVo.answerList" :key="answerVo.answerId" :gutter="20">
              <el-col :span="0.5">
                <el-checkbox v-model="answerVo.isRight" :true-label="1" :false-label="0" :checked="answerVo.isRight === 1 ? true : false" />
              </el-col>
              <el-col :span="23.5">
                <span :class="answerVo.isRight === 1 ? 'right-answer-content' : 'default-answer-content' ">{{ answerVo.answerContent }}</span>
              </el-col>
            </el-row>
          </el-card>
          <el-row type="flex" class="row-bg" justify="center">
            <el-col :span="8">
              <el-button class="filter-item" type="text" icon="el-icon-plus" @click="openCustomAddDrawer">
                添加自定义试题
              </el-button>
              <el-button class="filter-item" type="text" icon="el-icon-plus" @click="opneSelectDrawer">
                添加题库试题
              </el-button>
              <el-button class="filter-item" type="text" icon="el-icon-back" @click="goBack">
                返回
              </el-button>
            </el-col>
          </el-row>
        </div>
      </el-card>
    </el-form>

    <!-- 添加自定义试题 -->
    <el-drawer :with-header="false" title="添加自定义试题" :visible.sync="addDrawer" size="50%">
      <question-add :paperid="paperid" @closeCustomAddDrawer="closeCustomAddDrawer" @getQuestionVoListByPaperId="getQuestionVoListByPaperId" />
    </el-drawer>

    <el-drawer :with-header="false" title="修改试卷试题信息" :visible.sync="updateDrawer" size="50%">
      <question-update :question="question" :paperid="paperid" @closeUpdateDrawer="closeUpdateDrawer" @getQuestionVoListByPaperId="getQuestionVoListByPaperId" />
    </el-drawer>

    <el-drawer :with-header="false" title="选择题库试题" :visible.sync="selectDrawer" size="50%">
      <question-select :paperid="paperid" :repositoryid="repositoryid" @closeSelectDrawer="closeSelectDrawer" @getQuestionVoListByPaperId="getQuestionVoListByPaperId" />
    </el-drawer>
  </div>
</template>

<script>
import paperApi from '@/api/paper/paper'
import questionApi from '@/api/question/question.js'
// 导入组件
import QuestionAdd from '../../question/question/question-add.vue'
import QuestionSelect from '../../question/question/question-select.vue'
import QuestionUpdate from '../../question/question/question-update.vue'
export default {
  //  定义添加的组件 子组件/私有组件
  components: {
    QuestionAdd,
    QuestionSelect,
    QuestionUpdate
  },
  data() {
    return {
      questionid: '',
      repositoryid: '',
      paperid: '',
      paperVo: {
        paperId: '',
        paperRuleVo: {
          repositoryId: ''
        }
      },
      question: {},
      questionVoList: [
        {
          questionId: '',
          questionContent: '',
          answerList: []
        }
      ],
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
      loading: true,
      questionLoading: true,
      addDrawer: false, // 控制添加弹窗显示
      updateDrawer: false, // 控制修改弹窗显示
      selectDrawer: false // 控制从题库试题列表添加试题抽屉的显示
    }
  },
  created() {
    this.getPaperVoById()
    this.getQuestionVoListByPaperId()
  },
  methods: {
    getPaperVoById() {
      this.loading = true
      paperApi.getPaperVoWithPaperRuleVoWithQuestionVosById(this.$route.params.paperId).then(res => {
        this.paperVo = res.data
        this.loading = false
        this.questionLoading = false
      })
    },
    getQuestionVoListByPaperId() {
      this.questionLoading = true
      questionApi.getQuestionVoListByPaperIdForPaperInfo(this.$route.params.paperId).then(res => {
        this.questionVoList = res.data
        this.questionLoading = false
        console.log('查询了试题列表')
      })
    },
    // 添加试题项
    handleAddQuestion() {
      this.paperVo.questionVoList.push(
        { questionSort: '', questionTypeId: '', questionTagId: '', repositoryId: this.paperVo.paperRuleVo.repositoryId }
      )
    },
    // 删除试卷试题项
    handleDeleteQuestion(questionId, paperId) {
      console.log(questionId, paperId)
      this.$confirm('是否删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        paperApi.deleteQuestionForPaperById(questionId, paperId).then(res => {
          console.log(res.msg)
          this.getQuestionVoListByPaperId()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 修改试卷试题
    handleUpdateQuestion(questionId, paperId) {
      this.paperid = paperId
      paperApi.getQuestionVoForPaperByQuestionIdAndPaperId(questionId, paperId).then(res => {
        this.question = res.data
        this.updateDrawer = true
      })
    },
    closeUpdateDrawer() {
      this.updateDrawer = false
    },
    openCustomAddDrawer() {
      this.paperid = this.paperVo.paperId
      // 打开添加弹窗
      this.addDrawer = true
    },
    closeCustomAddDrawer() {
      this.addDrawer = false
    },
    opneSelectDrawer() {
      this.paperid = this.paperVo.paperId
      this.repositoryid = this.paperVo.paperRuleVo.repositoryId
      this.selectDrawer = true
    },
    closeSelectDrawer() {
      this.selectDrawer = false
    },
    goBack() {
      this.$router.go(-1)
    }

  }
}
</script>

<style scoped>
  .el-card {
    margin-top: 10px !important ;
    margin-bottom: 10px !important;
  }

  .el-row {
    margin-bottom: 10px !important;
    margin-top: 10px !important;
    line-height: 40px;
  }
  .el-col {
    border-radius: 4px;
  }

  .el-form-item {
    margin-bottom: 10px !important;
    margin-top: 10px !important;
  }

  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }

  .right-answer-content {
    color: #67C23A;
  }

  .default-answer-content {
    color: #606266;
  }

  .error-answer-content {
    color: red;
  }

</style>
