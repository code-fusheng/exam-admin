<template>
  <div>
    <el-card>
      <div slot="header" class="clearfix">
        <span>选择添加试题</span>
      </div>
      <el-form :inline="true" :model="page" class="demo-form-inline" size="mini">
        <el-form-item label="题库归属" prop="repositoryId">
          <el-select v-model="page.params.repositoryId" placeholder="请选择所属题库" clearable>
            <el-option
              v-for="repository in $store.getters.repositoryList"
              :key="repository.repositoryId"
              :label="repository.repositoryName"
              :value="repository.repositoryId"
            />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-plus" sizi="mini" @click="toSaveSelectQuestion">批量添加</el-button>
        </el-form-item>
      </el-form>
      <el-table
        v-loading="selectLoading"
        :data="questionList"
        border
        fit
        style="width: 100%"
        :header-cell-style="{background:'#eef1f6',color:'#606266'}"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="试题内容">
                <span>{{ props.row.questionContent }}</span>
              </el-form-item>
              <el-form-item label="试题图片">
                <span>{{ props.row.questionImage }}</span>
              </el-form-item>
              <el-form-item label="试题视频">
                <span>{{ props.row.questionVideo }}</span>
              </el-form-item>
              <el-form-item label="试题代码">
                <span>{{ props.row.questionCode }}</span>
              </el-form-item>
              <el-form-item label="创建者">
                <span>{{ props.row.createdUserName }}</span>
              </el-form-item>
              <el-form-item label="更新者">
                <span>{{ props.row.updateUserName }}</span>
              </el-form-item>
              <el-form-item label="备注">
                <span>{{ props.row.remark }}</span>
              </el-form-item>
              <el-form-item label="题库名称">
                <span>{{ props.row.repositoryName }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column type="selection" width="50" align="center" />
        <el-table-column label="试题内容" prop="questionContent" min-width="300" align="center" show-overflow-tooltip>
          <template slot-scope="scope">
            <router-link :to="'questionInfo/' + scope.row.questionId" class="link-type">
              <span>{{ scope.row.questionContent }}</span>
            </router-link>
          </template>
        </el-table-column>
        <el-table-column prop="questionTypeId" label="试题类型" width="100" align="center">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.questionTypeId === 0" type="info">其它</el-tag>
            <el-tag v-else-if="scope.row.questionTypeId === 1" type="success">单选题</el-tag>
            <el-tag v-else-if="scope.row.questionTypeId === 2">多选题</el-tag>
            <el-tag v-else-if="scope.row.questionTypeId === 3" type="warning">填空题</el-tag>
            <el-tag v-else-if="scope.row.questionTypeId === 4" type="danger">判断题</el-tag>
            <el-tag v-else-if="scope.row.questionTypeId === 5" type="success">简答题</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="questionTagId" label="试题标签" width="100" align="center">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.questionTagId === 0">其它</el-tag>
            <el-tag v-else-if="scope.row.questionTagId === 1">基础题</el-tag>
            <el-tag v-else-if="scope.row.questionTagId === 2" type="danger">提升题</el-tag>
            <el-tag v-else-if="scope.row.questionTagId === 3" type="warning">主观题</el-tag>
            <el-tag v-else-if="scope.row.questionTagId === 4" type="success">客观题</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="createdTime" label="创建时间" width="180" align="center" sortable="custom" />
        <!-- <el-table-column prop="updateTime" label="更新时间" min-width="160" align="center" sortable="custom" /> -->
        <el-table-column label="操作" min-width="100" align="center">
          <template slot-scope="scope">
            <el-button type="text" size="mini" icon="el-icon-plus" @click="toSaveSelectQuestion(scope.row)">添加</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
// 导入api接口定义的方法 接收变量为 questionApi
import paperApi from '@/api/paper/paper'
import questionApi from '@/api/question/question.js'
export default {
  props: {
    paperid: {
      type: String,
      default: null
    },
    repositoryid: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      questionIdsAndPaperId: {
        paperId: '',
        questionIds: []
      },
      // 题库试题分页查询对象
      page: {
        currentPage: 1,
        pageSize: 20,
        params: {
          repositoryId: this.repositoryid
        },
        sortColumn: 'createdTime', // 排序列
        sortMethod: 'asc' // 排序方式
      },
      selectLoading: false,
      questionList: [],
      questionIds: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      selectQuestions: [] // 被选中的试题
    }
  },
  watch: {
    'repositoryId': function() {
      this.getQuestionListByPage()
    },
    'page.params.repositoryId': function() {
      this.getQuestionListByPage()
    }
  },
  created() {
    this.getQuestionListByPage()
  },
  mounted() {
    this.getQuestionListByPage()
  },
  methods: {
    getQuestionListByPage() {
      questionApi.getQuestionListByPage(this.page).then(res => {
        this.questionList = res.data.list
      })
    },
    // 数据表格的多选择框选择时触发
    handleSelectionChange(selection) {
      this.selectQuestions = selection.map(item => item.questionId)
      this.single = selection.length !== 1
      this.multiple = !selection.length
    },
    // 添加选中试题
    toSaveSelectQuestion(row) {
      this.questionIds = []
      var id = row.questionId
      if (id !== undefined) {
        this.questionIds.push(id)
        console.log('添加' + this.questionIds)
      } else {
        this.questionIds = this.selectQuestions
        console.log('批量添加' + this.questionIds)
      }
      this.questionIdsAndPaperId.paperId = this.paperid
      this.questionIdsAndPaperId.questionIds = this.questionIds
      paperApi.saveSelectQuestionVoForPaper(this.questionIdsAndPaperId).then(res => {
        this.$message.success(res.msg)
        this.$emit('closeSelectDrawer')
        this.$emit('getQuestionVoListByPaperId')
      })
    }
  }
}
</script>

<style scoped>

</style>
