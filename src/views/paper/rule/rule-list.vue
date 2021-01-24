<template>
  <!-- 加载 -->
  <div>
    <!-- 搜索栏 模糊查询-->
    <el-form :inline="true" :model="page" class="demo-form-inline" size="mini">
      <el-form-item label="试卷规则名称">
        <el-input v-model="page.params.paperRuleName" placeholder="请输入试卷规则名称" clearable />
      </el-form-item>
      <el-form-item label="起始日期">
        <el-date-picker
          v-model="page.params.paperRuleTime"
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
        <el-button type="primary" icon="el-icon-plus" size="mini" @click="openAddDialog">新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="success" icon="el-icon-edit" size="mini" :disabled="single" @click="openUpdateDialog">修改</el-button>
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
            <el-form-item label="规则名称">
              <span>{{ props.row.paperRuleName }}</span>
            </el-form-item>
            <el-form-item label="总分">
              <span>{{ props.row.totalScore }}</span>
            </el-form-item>
            <el-form-item label="合格分数">
              <span>{{ props.row.eligibilityScore }}</span>
            </el-form-item>
            <el-form-item label="时长">
              <span>{{ props.row.totalTime }}</span>
            </el-form-item>
            <el-form-item label="单选题数">
              <span>{{ props.row.singleCount }}</span>
            </el-form-item>
            <el-form-item label="单选总分">
              <span>{{ props.row.singleScore }}</span>
            </el-form-item>
            <el-form-item label="多选题数">
              <span>{{ props.row.multipleCount }}</span>
            </el-form-item>
            <el-form-item label="多选总分">
              <span>{{ props.row.multipleScore }}</span>
            </el-form-item>
            <el-form-item label="填空题数">
              <span>{{ props.row.fillCount }}</span>
            </el-form-item>
            <el-form-item label="填空总分">
              <span>{{ props.row.fillScore }}</span>
            </el-form-item>
            <el-form-item label="判断题数">
              <span>{{ props.row.judgeCount }}</span>
            </el-form-item>
            <el-form-item label="判断总分">
              <span>{{ props.row.judgeScore }}</span>
            </el-form-item>
            <el-form-item label="简答题数">
              <span>{{ props.row.shortCount }}</span>
            </el-form-item>
            <el-form-item label="简答总分">
              <span>{{ props.row.shortScore }}</span>
            </el-form-item>
            <el-form-item label="创建者">
              <span>{{ props.row.createdUserName }}</span>
            </el-form-item>
            <el-form-item label="更新者">
              <span>{{ props.row.updateUserName }}</span>
            </el-form-item>
            <el-form-item label="规则题库">
              <span>{{ props.row.repositoryId }}</span>
            </el-form-item>
            <el-form-item label="备注">
              <span>{{ props.row.remark }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column type="selection" width="50" align="center" />
      <el-table-column prop="paperRuleId" label="试卷规则编号" width="200" align="center" />
      <el-table-column prop="paperRuleName" label="试卷规则名称" min-width="200" align="center" show-overflow-tooltip />
      <el-table-column prop="createdTime" label="创建时间" min-width="180" align="center" sortable="custom" />
      <el-table-column prop="updateTime" label="更新时间" min-width="180" align="center" sortable="custom" />
      <el-table-column prop="createdUserName" label="创建者" min-width="120" align="center" />
      <el-table-column prop="updateUserName" label="更新者" min-width="120" align="center" />
      <el-table-column prop="remark" label="备注" min-width="120" align="center" show-overflow-tooltip />
      <el-table-column prop="isEnable" label="状态" min-width="100" align="center">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.isEnabled === 1">启用</el-tag>
          <el-tag v-else type="info">弃用</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" min-width="300" align="center">
        <template slot-scope="scope">
          <el-button type="text" size="mini" icon="el-icon-edit" @click="openUpdateDialog(scope.row)">修改</el-button>
          <el-button type="text" size="mini" icon="el-icon-view" @click="toRead(scope.row.paperRuleId)">查看</el-button>
          <el-button v-if="scope.row.isEnabled === 0" type="text" icon="el-icon-check" size="mini" @click="toEnable(scope.row.ruleId)">启用</el-button>
          <el-button v-if="scope.row.isEnabled === 1" type="text" icon="el-icon-close" size="mini" @click="toDisable(scope.row.ruleId)">弃用</el-button>
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
    <el-dialog title="添加试卷规则" :visible.sync="addDialog" width="80%">
      <rule-add @closeAddDialog="closeAddDialog" @getByPage="getByPage" />
    </el-dialog>
    <!--
      修改弹窗
      :rule="rule" 用于传递参数对象
    -->
    <el-dialog title="修改试卷规则" :visible.sync="updateDialog" width="80%">
      <rule-update :rule="rule" @closeUpdateDialog="closeUpdateDialog" @getByPage="getByPage" />
    </el-dialog>

  </div>
</template>

<script>
// 导入api接口定义的方法 接收变量为 ruleApi
import ruleApi from '@/api/paper/rule.js'
// 导入组件
import ruleAdd from './rule-add.vue'
import ruleUpdate from './rule-update.vue'
export default {
  //  定义添加的组件 子组件/私有组件
  components: {
    ruleAdd,
    ruleUpdate
  },
  data() {
    return {
      pickerOptions: {
      },
      paperRuleTime: {},
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
      rule: {
        paperRuleId: undefined,
        paperRuleName: ''
      },
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      loading: true, // 控制是否显示加载效果
      selectrules: [], // 被选中的列
      addDialog: false, // 控制添加弹窗显示
      updateDialog: false // 控制修改弹窗显示
    }
  },
  // 初始化函数
  created() {
    this.getByPage()
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
      ruleApi.getByPage(this.page).then(res => {
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
      this.selectrules = selection.map(item => item.paperRuleId)
      this.single = selection.length !== 1
      this.multiple = !selection.length
    },
    // 操作部分相关方法
    // 修改
    openUpdateDialog(row) {
      var id = row.paperRuleId
      if (id === undefined) {
        id = this.selectrules[0]
      }
      ruleApi.get(id).then(res => {
        this.rule = res.data
        this.updateDialog = true
      })
    },
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
        ruleApi.enable(id).then(res => {
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
        ruleApi.disable(id).then(res => {
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
      var id = row.paperRuleId
      if (id !== undefined) {
        this.ids.push(id)
        console.log('删除' + this.ids)
      } else {
        this.ids = this.selectrules
        console.log('批量删除' + this.ids)
      }
      this.$confirm('是否删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        ruleApi.delete(this.ids).then(res => {
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
      this.page.params.ruleName = null
      this.page.params.ruleTime = null
      this.$message.success('操作成功: 条件重置！')
      this.getByPage()
    },

    // 模块功能组件
    openAddDialog() {
      // 打开添加弹窗
      this.addDialog = true
    },
    closeAddDialog() {
      // 关闭添加弹窗
      this.addDialog = false
    },
    closeUpdateDialog() {
      // 关闭修改弹窗
      this.updateDialog = false
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
    width: 25%;
  }
</style>
