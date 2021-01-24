<template>
  <div>
    <!-- 开发页面级信息卡片 -->
    <el-card>
      <div slot="header" class="clearfix">
        <span>开发页面级信息</span>
      </div>
      <el-row :gutter="20">
        <el-col :span="8">
          <span>考试编号 {{ examId }}</span>
        </el-col>
        <el-col :span="8">
          <span>试卷编号 {{ paperId }}</span>
        </el-col>
        <el-col :span="8">
          <span>用户编号 {{ $store.getters.userId }}</span>
        </el-col>
      </el-row>
    </el-card>

    <!-- 考试信息卡片 -->
    <el-card>
      <div slot="header" class="clearfix">
        <span>考试信息</span>
      </div>
      <el-row :gutter="20">
        <el-col :span="24">
          <span>{{ examVo.examName }}</span>
        </el-col>
      </el-row>
    </el-card>

    <!-- 试卷信息卡片 -->
    <el-card>
      <div slot="header" class="clearfix">
        <span>试卷信息</span>
      </div>
      <el-row :gutter="20">
        <el-col :span="10">
          <span>试卷标题:{{ paperVo.paperName }}</span>
        </el-col>
        <el-col :span="4">
          <span>试卷总分:{{ paperVo.paperRuleVo.totalScore }}</span>
        </el-col>
        <el-col :span="4">
          <span>试卷时长:{{ paperVo.paperRuleVo.totalTime }}</span>
        </el-col>
        <el-col :span="6">
          <span>出卷人:{{ paperVo.createdUserName }}</span>
        </el-col>
      </el-row>
    </el-card>

    <!-- 试题卡片信息 -->
    <el-card>
      <div slot="header" class="clearfix">
        <span>试题信息</span>
        <el-button style="float: right; padding: 3px 10px" icon="el-icon-s-promotion" type="text" @click="handleSubmitPaper">交卷</el-button>
      </div>
      <el-card
        v-for="(questionVo, questionIndex) in questionVoList"
        :key="questionIndex"
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
              {{ questionVo.questionScore }} 分
            </el-tag>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="24">
            <span style="color: #909399">第{{ questionIndex + 1 }}题 </span><span> {{ questionVo.questionContent }}</span>
          </el-col>
        </el-row>
        <!-- 单选、多选、判断 -->
        <el-row :gutter="20">
          <!-- <el-col :span="0.5">
            <el-checkbox v-model="answerVo.isSelect" true-label="1" false-label="0" :checked="answerVo.isRight === 1 ? true : false" />
          </el-col>
          <el-col :span="23.5">
            {{ answerVo.answerContent }}
          </el-col> -->
          <el-col :span="24">
            <el-checkbox-group v-model="questionVo.userAnswer" @change="handleSelectAnswer">
              <el-checkbox v-for="(answerVo, index) in questionVo.answerList" :key="index" :label="answerVo.answerId">{{ answerVo.answerContent }}</el-checkbox>
            </el-checkbox-group>
          </el-col>
        </el-row>
      </el-card>
      <el-row type="flex" class="row-bg" justify="center">
        <el-col style="text-align: center; margin-top: 10px">
          <el-button v-if="noMore" class="filter-item" type="text" icon="el-icon-error">到底了</el-button>
          <el-button v-else class="filter-item" type="text" icon="el-icon-bottom" :loading="loadingMore" @click="loadMore()">加载更多</el-button>
          <el-button icon="el-icon-s-promotion" type="text" @click="handleSubmitPaper">交卷</el-button>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import examApi from '@/api/exam/exam'
import paperApi from '@/api/paper/paper'
import questionApi from '@/api/question/question'
export default {
  data() {
    return {
      // 考试编号
      examId: this.$route.params.examId,
      // 试卷编号
      paperId: this.$route.params.paperId,
      // 考试信息
      examVo: {},
      // 试卷信息
      paperVo: {
        paperName: '',
        paperRuleVo: {
          totalScore: null,
          totalTime: null
        },
        createdUserName: ''
      },
      // 试题信息
      questionVoList: [
        {
          questionVo: {
            paperId: this.$route.params.paperId,
            examId: this.$route.params.examId,
            userId: 1,
            questionId: '',
            questiontypeId: '',
            questionScore: '',
            answerList: []
          }
        }
      ],
      // 作答信息集合
      questionReplyList: [
        {
          questionReply: {
            questionId: '',
            paperId: this.$route.params.paperId,
            examId: this.$route.params.examId,
            userId: this.$store.getters.userId,
            questionTypeId: '',
            userAnswer: [],
            questionScore: '',
            actualScore: '',
            isRight: '',
            useTime: ''
          }
        }
      ],
      // 定义 page 对象
      page: {
        currentPage: 1, // 当前页
        pageSize: 5, // 每页显示条数
        // 查询参数对象
        params: {
          paperId: this.$route.params.paperId
        }
      },
      noMore: false, // 没有更多数据标识
      loadingMore: false // 加载更多
    }
  },
  created() {
    this.getExamVoById()
    this.getPaperVoById()
    this.getQuestionVoListByPageForFront()
  },
  methods: {
    // 根据考试编号获取考试视图信息
    getExamVoById() {
      examApi.get(this.examId).then(res => {
        this.examVo = res.data
      })
    },
    // 根据试卷编号获取试卷信息与规则信息
    getPaperVoById() {
      paperApi.getPaperWithRuleByPaperId(this.paperId).then(res => {
        this.paperVo = res.data
      })
    },
    // 分页查询考试试卷试题与选项列表（不含答案）
    getQuestionVoListByPageForFront() {
      questionApi.getQuestionVoListByPageForFront(this.page).then(res => {
        this.questionVoList = res.data.list
      })
    },
    // 加载更多
    loadMore() {
      this.loadingMore = true
      this.page.currentPage += 1
      questionApi.getQuestionVoListByPageForFront(this.page).then(res => {
        if (res.data.list.length < this.page.pageSize) {
          this.$message.warning('当前是最后一页了!')
          this.noMore = true
        }
        const dataList = res.data.list
        dataList.forEach(item => {
          this.questionVoList.push(item)
        })
        this.loadingMore = false
      })
    },
    // 选中答案
    handleSelectAnswer(e) {
      console.log(e)
    },
    // 交卷
    handleSubmitPaper() {
      console.log(this.questionReplyList)
      this.$confirm('是否交卷？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.questionReplyList = this.questionVoList
        this.questionReplyList.forEach(questionReply => {
          questionReply.paperId = this.$route.params.paperId
          questionReply.examId = this.$route.params.examId
          questionReply.userId = this.$store.getters.userId
          questionReply.userAnswerForFront = questionReply.userAnswer
          questionReply.userAnswer = ''
          questionReply.answerList = []
        })
        examApi.saveQuestionReply(this.questionReplyList).then(res => {
          this.$message.success(res.msg)
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    }
  }
}
</script>

<style scoped>
  .el-col {
    line-height: 40px;
    align-content: center;
    /* text-align: center; */
  }
  .el-card {
    margin-top: 10px !important ;
    margin-bottom: 10px !important;
  }
  .el-row {
    margin-bottom: 10px !important;
    margin-top: 10px !important;
    line-height: 40px;
  }
  .el-checkbox {
    display: block !important;
  }

</style>
