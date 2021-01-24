<template>
  <!-- 加载 -->
  <div>
    <!-- 搜索栏 模糊查询-->
    <el-form :inline="true" :model="page" class="demo-form-inline" size="mini">
      <el-form-item label="考试名称">
        <el-input v-model="page.params.examName" placeholder="请输入试卷规则名称" clearable />
      </el-form-item>
      <el-form-item label="起始日期">
        <el-date-picker
          v-model="page.params.examTime"
          type="daterange"
          align="right"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :default-time="['00:00:00', '23:59:59']"
          :picker-options="pickerOptions"
          format="yyyy 年 MM 月 dd 日"
          value-format="yyyy-MM-dd HH:mm:ss"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" sizi="mini" @click="search">查询</el-button>
        <el-button type="success" icon="el-icon-refresh-left" size="mini" @click="refresh">恢复</el-button>
      </el-form-item>
    </el-form>
    <!-- 分割线 -->
    <el-divider />
    <!-- 表格工具按钮结束 -->
    <!-- 列表 -->
    <!--
      1. :data v-bind:model="page.list" 绑定数据 分页对象的的list数据
      2. show-overflow-tooltip 超出部分隐藏
      3. @selection-change="handleSelectionChange" selection-change	当选择项发生变化时会触发该事件
      4. @sort-change="changeSort" sort-change 事件回中可以获取当前排序的字段名[prop]和排序顺序[order]
     -->
    <el-table
      v-loading="loading"
      :data="page.list"
      border
      fit
      style="width: 100%"
      :header-cell-style="{background:'#eef1f6',color:'#606266'}"
      @sort-change="changeSort"
    >
      <el-table-column prop="examName" label="考试名称" min-width="180" align="center" show-overflow-tooltip />
      <el-table-column prop="startTime" label="开始时间" min-width="180" align="center" sortable="custom" />
      <el-table-column prop="endTime" label="结束时间" min-width="180" align="center" sortable="custom" />
      <el-table-column prop="remark" label="备注" min-width="120" align="center" show-overflow-tooltip />
      <el-table-column label="操作" min-width="250" align="center">
        <template slot-scope="scope">
          <el-button type="text" size="mini" icon="el-icon-edit" @click="handleOnlineExam(scope.row)">开始考试</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--
      分页组件-最完整版
      class : 分页组件
      current-page : 当前页 此处为动态绑定page对象的currentPage属性
      page-sizes : 每页显示个数选择器的选项设置
      page-size : 每页大小
      layout : 组件布局
      total : 总条目数 此处动态绑定page对象的totalCount属性
      @size-change="handleSizeChange"  pageSize 改变时会触发  参数:每页条数
      @current-change="handleCurrentChange" currentPage 改变时会触发 参数:当前页
     -->
    <el-pagination
      align="center"
      class="pagination"
      :current-page="page.currentPage"
      :page-sizes="[5,10,20,50]"
      :page-size="page.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="page.totalCount"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />

    <el-dialog
      title="请选择试卷"
      :visible.sync="selectPaperDialog"
      width="50%"
      :before-close="closeSelectPaperDialog"
    >
      <el-card v-for="paperVo in paperVoList" :key="paperVo.paperId">
        <el-row :gutter="20">
          <el-col :span="12">
            <span>{{ paperVo.paperName }}</span>
          </el-col>
          <el-col :span="12">
            <router-link :to="'onlineExam/' + currentExamId + '/' + paperVo.paperId" class="link-type">
              <el-button type="text" icon="el-icon-edit">进入考试</el-button>
            </router-link>
          </el-col>
        </el-row>
      </el-card>

    </el-dialog>

  </div>
</template>

<script>
// 导入api接口定义的方法 接收变量为 examApi
import examApi from '@/api/exam/exam.js'
export default {
  data() {
    return {
      pickerOptions: {
      },
      examTime: {},
      // 定义page对象
      page: {
        currentPage: 1, // 当前页
        pageSize: 10, // 每页显示条数
        totalPage: 0, // 总页数
        totalCount: 0, // 总条数
        params: {}, // 查询参数对象
        list: [], // 数据
        sortColumn: 'createdTime', // 排序列
        sortMethod: 'asc' // 排序方式
      },
      currentExamId: '',
      exam: {
        examId: undefined,
        examName: ''
      },
      paperVoList: [],
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      loading: true, // 控制是否显示加载效果
      addDialog: false, // 控制添加弹窗显示
      updateDialog: false, // 控制修改弹窗显示
      selectPaperDialog: false // 控制试卷选择弹窗
    }
  },
  // 初始化函数
  created() {
    this.getByPage()
  },
  // 定义方法
  methods: {
    // 开始考试，选择试卷
    handleOnlineExam(val) {
      this.currentExamId = val.examId
      examApi.getPaperVoListByExamId(val.examId).then(res => {
        this.paperVoList = res.data
      })
      this.selectPaperDialog = true
    },
    closeSelectPaperDialog() {
      // 关闭添加弹窗
      this.selectPaperDialog = false
    },
    // 每页大小改变 参数 value 为每页大小(pageSize)
    handleSizeChange(val) {
      this.page.pageSize = val
      // 重新请求,刷新页面
      this.getByPage()
    },
    // 当前页跳转 参数 value 当前页(currentPage)
    handleCurrentChange(val) {
      this.page.currentPage = val
      this.getByPage()
    },
    // 分页方法 调用封装的方法 getByPage()
    getByPage() {
      this.loading = true
      this.page.list = []
      examApi.getByPage(this.page).then(res => {
        this.page = res.data
        this.loading = false
        console.log(res)
      })
    },
    // 条件排序 e 和 val 都行
    changeSort(e) {
      if (e.order) {
        this.page.sortColumn = e.prop
        this.page.sortMethod = e.order
      } else {
        this.page.sortColumn = ''
        this.page.sortMethod = 'asc'
      }
      this.$message.success('操作成功: 条件排序！')
      this.getByPage()
    },
    // 操作部分相关方法
    // 条件搜索
    search() {
      this.page.currentPage = 1
      this.getByPage(this.page)
    },
    // 恢复搜索框
    refresh() {
      this.page.currentPage = 1
      this.page.params.examName = null
      this.page.params.examTime = null
      this.$message.success('操作成功: 条件重置！')
      this.getByPage()
    }
  }
}
</script>

<style scoped>
  .el-col {
    line-height: 40px;
    align-content: center;
    text-align: center;
  }
  .demo-form-inline {
    padding-top: 10px;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>
