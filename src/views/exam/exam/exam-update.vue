<template>
  <div>
    <!--添加试卷规则  -->
    <el-form ref="form" :model="exam" :rules="rules" label-width="80px" class="demo-ruleForm">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="考试名称">
            <el-input v-model="exam.examName" placeholder="请输入考试名称" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="选择试卷" prop="paperId">
            <el-select v-model="exam.currentPaperId" placeholder="请选择考试试卷" clearable>
              <el-option
                v-for="paper in paperPage.list"
                :key="paper.paperId"
                :label="paper.paperName"
                :value="paper.paperId"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="考试描述">
            <el-input v-model="exam.examDescription" placeholder="请输入考试名称" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="是否公开">
            <el-radio-group v-model="exam.isPublic">
              <el-radio :label="1">公开</el-radio>
              <el-radio :label="0">不公开</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="口令密码">
            <el-input v-model="exam.password" placeholder="请输入口令密码" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="是否限时">
            <el-radio-group v-model="exam.isLimitTime">
              <el-radio :label="1">限时</el-radio>
              <el-radio :label="0">不限时</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="开始时间">
            <el-date-picker
              v-model="exam.startTime"
              type="datetime"
              align="right"
              unlink-panels
              :default-time="['00:00:00', '23:59:59']"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd HH:mm:ss"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="结束时间">
            <el-date-picker
              v-model="exam.endTime"
              type="datetime"
              align="right"
              unlink-panels
              :default-time="['00:00:00', '23:59:59']"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd HH:mm:ss"
            />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label=" 状态">
            <el-radio-group v-model="exam.isEnabled">
              <el-radio :label="1">启用</el-radio>
              <el-radio :label="0">弃用</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="备注">
            <el-input v-model="exam.remark" placeholder="请输入备注" />
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
import examApi from '@/api/exam/exam.js'
import paperApi from '@/api/paper/paper.js'
export default {
  // 父组件将数据传递给子组件
  props: {
    exam: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      // 表单校验
      rules: {
      },
      paperList: [],
      // 定义page对象
      paperPage: {
        currentPage: 1, // 当前页
        pageSize: 10, // 每页显示条数
        totalPage: 0, // 总页数
        totalCount: 0, // 总条数
        params: {}, // 查询参数对象
        list: [], // 数据
        sortColumn: 'createdTime', // 排序列
        sortMethod: 'asc' // 排序方式
      }
    }
  },
  // 初始化函数
  created() {
    this.getByPage()
  },
  methods: {
    // 分页方法 调用封装的方法 getByPage()
    getByPage() {
      this.loading = true
      this.paperPage.list = []
      paperApi.getByPage(this.paperPage).then(res => {
        this.paperPage = res.data
        this.loading = false
        console.log(res)
      })
    },
    onSubmit() {
      examApi.update(this.exam).then(res => {
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
