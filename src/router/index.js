import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'dashboard' }
    }]
  },
  {
    path: '/manage',
    component: Layout,
    redirect: '/manage/user',
    name: 'Manage',
    meta: { title: '用户管理', icon: 'user' },
    children: [
      {
        path: 'user',
        name: 'User',
        component: () => import('@/views/manage/user/user-list'),
        meta: { title: '用户列表', icon: 'user' }
      },
      {
        path: 'role',
        name: 'Role',
        component: () => import('@/views/manage/role/role-list'),
        meta: { title: '角色列表', icon: 'role' }
      },
      {
        path: 'menu',
        name: 'Menu',
        component: () => import('@/views/manage/menu/menu-list'),
        meta: { title: '权限列表', icon: 'menu' }
      }
    ]
  },
  {
    path: '/exam',
    component: Layout,
    redirect: '/exam/examList',
    name: 'Exam',
    meta: { title: '考试管理', icon: 'type' },
    children: [
      {
        path: 'examList',
        name: 'ExamList',
        component: () => import('@/views/exam/online/exam-list'),
        meta: { title: '考试列表', icon: 'type' }
      },
      {
        path: 'onlineExam/:examId/:paperId',
        name: 'OnlineExam',
        hidden: true,
        component: () => import('@/views/exam/online/online-exam'),
        meta: { title: '在线考试', icon: 'article' }
      },
      {
        path: 'exam',
        name: 'Exam',
        component: () => import('@/views/exam/exam/exam-list'),
        meta: { title: '考试管理', icon: 'type' }
      }
    ]
  },
  {
    path: '/question',
    component: Layout,
    redirect: '/question/question',
    name: 'Question',
    meta: { title: '试题管理', icon: 'dashboard' },
    children: [
      {
        path: 'repository',
        name: 'Repository',
        component: () => import('@/views/question/repository/repository-list'),
        meta: { title: '题库管理', icon: 'type' }
      },
      {
        path: 'question',
        name: 'Question',
        component: () => import('@/views/question/question/question-list'),
        meta: { title: '试题管理', icon: 'article' }
      },
      {
        path: 'questionInfo/:questionId',
        name: 'QuestionInfo',
        hidden: true,
        component: () => import('@/views/question/question/question-info'),
        meta: { title: '试题详情', icon: 'article' }
      }
    ]
  },
  {
    path: '/paper',
    component: Layout,
    redirect: '/paper/paper',
    name: 'Paper',
    meta: { title: '试卷管理', icon: 'dashboard' },
    children: [
      {
        path: 'paper',
        name: 'Paper',
        component: () => import('@/views/paper/paper/paper-list'),
        meta: { title: '试卷管理', icon: 'article' }
      },
      {
        path: 'paperRule',
        name: 'PaperRule',
        component: () => import('@/views/paper/rule/rule-list'),
        meta: { title: '规则管理', icon: 'type' }
      },
      {
        path: 'paperInfo/:paperId',
        name: 'PaperInfo',
        hidden: true,
        component: () => import('@/views/paper/paper/paper-info'),
        meta: { title: '试卷详情', icon: 'article' }
      }
    ]
  },
  {
    path: '/sys',
    component: Layout,
    redirect: '/sys/log',
    name: 'System',
    meta: { title: '系统管理', icon: 'sys-control' },
    children: [
      {
        path: 'dictType',
        name: 'DictType',
        component: () => import('@/views/sys/dict/type-list'),
        meta: { title: '字典管理', icon: 'sys-control' }
      },
      {
        path: 'dictData/:dictType',
        name: 'DictData',
        hidden: true,
        component: () => import('@/views/sys/dict/data-list'),
        meta: { title: '字典数据', icon: 'sys-control' }
      },
      {
        path: 'log',
        name: 'Log',
        component: () => import('@/views/sys/log/log-list'),
        meta: { title: '系统日志', icon: 'sys-log' }
      },
      {
        path: 'operaLog',
        name: 'OperaLog',
        component: () => import('@/views/sys/operaLog/operalog-list'),
        meta: { title: '操作日志', icon: 'sys-log' }
      },
      {
        path: 'loginLog',
        name: 'Loginlog',
        component: () => import('@/views/sys/loginLog/loginlog-list'),
        meta: { title: '登录日志', icon: 'sys-log' }
      },
      {
        path: 'swagger',
        name: 'Swagger',
        component: () => import('@/views/sys/swagger/swagger-index'),
        meta: { title: '接口文档', icon: 'sys-interface' }
      },
      {
        path: 'druid',
        name: 'Druid',
        component: () => import('@/views/sys/druid/druid-index'),
        meta: { title: '数据监控', icon: 'sys-db' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
