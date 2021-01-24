<template>
  <!-- 加载 -->
  <div>
    <!-- 搜索栏 模糊查询-->
    <el-form :inline="true" :model="page" class="demo-form-inline" size="mini">
      <el-form-item label="试题内容">
        <el-input v-model="page.params.questionContent" placeholder="请输入试题名称" clearable />
      </el-form-item>
      <el-form-item label="题库归属" prop="repositoryId">
        <el-select v-model="page.params.repositoryId" placeholder="请选择所属题库" clearable filterable>
          <el-option
            v-for="repository in $store.getters.repositoryList"
            :key="repository.repositoryId"
            :label="repository.repositoryName"
            :value="repository.repositoryId"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="起始日期">
        <el-date-picker
          v-model="page.params.questionTime"
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
    <!-- 表格工具按钮开始 -->
    <el-row :gutter="10" style="margin-bottom: 8px;">
      <el-col :span="1.5">
        <el-button type="primary" icon="el-icon-plus" size="mini" @click="openCustomAddDrawer">新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="success" icon="el-icon-edit" size="mini" :disabled="single" @click="openUpdateDrawer">修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="danger" icon="el-icon-delete" size="mini" :disabled="multiple" @click="toDelete">删除</el-button>
      </el-col>
    </el-row>
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
      @selection-change="handleSelectionChange"
      @sort-change="changeSort"
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
      <el-table-column prop="questionId" label="试题编号" min-width="180" align="center" />
      <el-table-column label="试题内容" prop="questionContent" min-width="300" align="left" show-overflow-tooltip>
        <template slot-scope="scope">
          <router-link :to="'questionInfo/' + scope.row.questionId" class="link-type">
            <span>{{ scope.row.questionContent }}</span>
          </router-link>
        </template>
      </el-table-column>
      <el-table-column prop="questionTypeId" label="试题类型" min-width="100" align="center">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.questionTypeId === 0" type="info">其它</el-tag>
          <el-tag v-else-if="scope.row.questionTypeId === 1" type="success">单选题</el-tag>
          <el-tag v-else-if="scope.row.questionTypeId === 2">多选题</el-tag>
          <el-tag v-else-if="scope.row.questionTypeId === 3" type="warning">填空题</el-tag>
          <el-tag v-else-if="scope.row.questionTypeId === 4" type="danger">判断题</el-tag>
          <el-tag v-else-if="scope.row.questionTypeId === 5" type="success">简答题</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="questionTagId" label="试题标签" min-width="100" align="center">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.questionTagId === 0">其它</el-tag>
          <el-tag v-else-if="scope.row.questionTagId === 1">基础题</el-tag>
          <el-tag v-else-if="scope.row.questionTagId === 2" type="danger">提升题</el-tag>
          <el-tag v-else-if="scope.row.questionTagId === 3" type="warning">主观题</el-tag>
          <el-tag v-else-if="scope.row.questionTagId === 4" type="success">客观题</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="createdTime" label="创建时间" min-width="180" align="center" sortable="custom" />
      <el-table-column prop="updateTime" label="更新时间" min-width="180" align="center" sortable="custom" />
      <el-table-column prop="isEnable" label="状态" min-width="80" align="center">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.isEnabled === 1">启用</el-tag>
          <el-tag v-else type="info">弃用</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" min-width="200" align="center">
        <template slot-scope="scope">
          <el-button type="text" size="mini" icon="el-icon-edit" @click="openUpdateDrawer(scope.row)">修改</el-button>
          <el-button v-if="scope.row.isEnabled === 0" type="text" icon="el-icon-check" size="mini" @click="toEnable(scope.row.questionId)">启用</el-button>
          <el-button v-if="scope.row.isEnabled === 1" type="text" icon="el-icon-close" size="mini" @click="toDisable(scope.row.questionId)">弃用</el-button>
          <el-button type="text" size="mini" icon="el-icon-delete" @click="toDelete(scope.row)">删除</el-button>
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

    <!-- 添加弹窗 -->
    <el-drawer :with-header="false" title="添加试题" :visible.sync="addDrawer" size="50%">
      <question-add @closeCustomAddDrawer="closeCustomAddDrawer" @getByPage="getByPage" />
    </el-drawer>
    <!--
      修改弹窗
      :question="question" 用于传递参数对象
    -->
    <el-drawer :with-header="false" title="修改试题" :visible.sync="updateDrawer" size="50%">
      <question-update :question="question" @closeUpdateDrawer="closeUpdateDrawer" @getByPage="getByPage" />
    </el-drawer>

  </div>
</template>

<script>
// 导入api接口定义的方法 接收变量为 questionApi
import questionApi from '@/api/question/question.js'
import repositoryApi from '@/api/repository/repository.js'
// 导入组件
import QuestionAdd from './question-add.vue'
import QuestionUpdate from './question-update.vue'
export default {
  //  定义添加的组件 子组件/私有组件
  components: {
    QuestionAdd,
    QuestionUpdate
  },
  data() {
    return {
      pickerOptions: {
      },
      questionTime: {},
      // 定义page对象
      page: {
        currentPage: 1, // 当前页
        pageSize: 20, // 每页显示条数
        totalPage: 0, // 总页数
        totalCount: 0, // 总条数
        params: {}, // 查询参数对象
        list: [], // 数据
        sortColumn: 'createdTime', // 排序列
        sortMethod: 'asc' // 排序方式
      },
      question: {
        questionId: undefined,
        questionName: ''
      },
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      loading: true, // 控制是否显示加载效果
      selectquestions: [], // 被选中的列
      addDrawer: false, // 控制添加弹窗显示
      updateDrawer: false // 控制修改弹窗显示
    }
  },
  // 初始化函数
  created() {
    this.getByPage()
    repositoryApi.getList().then(res => {
      this.$store.commit('global/SET_REPOSITORY', res.data)
    })
  },
  // 定义方法
  methods: {
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
      questionApi.getByPage(this.page).then(res => {
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
    // 数据表格的多选择框选择时触发
    handleSelectionChange(selection) {
      this.selectquestions = selection.map(item => item.questionId)
      this.single = selection.length !== 1
      this.multiple = !selection.length
    },
    // 操作部分相关方法
    // 查看
    toRead() {
      this.$message.success('QAQ')
    },
    // 启用
    toEnable(id) {
      this.$confirm('是否启用？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        questionApi.enable(id).then(res => {
          this.$message.success(res.msg)
          this.getByPage()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消启用'
        })
      })
    },
    // 弃用
    toDisable(id) {
      this.$confirm('是否弃用?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        questionApi.disable(id).then(res => {
          this.$message.success(res.msg)
          this.getByPage()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消弃用'
        })
      })
    },
    // 删除
    toDelete(row) {
      this.ids = []
      var id = row.questionId
      if (id !== undefined) {
        this.ids.push(id)
        console.log('删除' + this.ids)
      } else {
        this.ids = this.selectquestions
        console.log('批量删除' + this.ids)
      }
      this.$confirm('是否删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        questionApi.delete(this.ids).then(res => {
          this.$message.success(res.msg)
          this.getByPage()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 条件搜索
    search() {
      this.page.currentPage = 1
      this.getByPage(this.page)
    },
    // 恢复搜索框
    refresh() {
      this.page.currentPage = 1
      this.page.params.questionContent = null
      this.page.params.questionTime = null
      this.page.params.repositoryId = undefined
      this.$message.success('操作成功: 条件重置！')
      this.getByPage()
    },

    // 模块功能组件
    openCustomAddDrawer() {
      repositoryApi.getList().then(res => {
        this.$store.commit('global/SET_REPOSITORY', res.data)
      })
      // 打开添加弹窗
      this.addDrawer = true
    },
    // 修改
    openUpdateDrawer(row) {
      repositoryApi.getList().then(res => {
        this.$store.commit('global/SET_REPOSITORY', res.data)
      })
      var id = row.questionId
      if (id === undefined) {
        id = this.selectquestions[0]
      }
      questionApi.get(id).then(res => {
        this.question = res.data
        this.updateDrawer = true
      })
    },
    closeCustomAddDrawer() {
      // 关闭添加弹窗
      this.addDrawer = false
    },
    closeUpdateDrawer() {
      // 关闭修改弹窗
      this.updateDrawer = false
    }
  }
}
</script>

<style scoped>
    .demo-form-inline {
    padding-top: 10px;
  }
  .demo-table-expand {
    font-size: 0;
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
