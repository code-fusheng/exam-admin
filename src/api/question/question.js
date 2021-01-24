import request from '@/utils/request'
var group_name = 'question'
export default {
  save(question) { // 添加
    return request({
      url: `/${group_name}/save`,
      method: 'post',
      data: question
    })
  },
  delete(ids) { // 根据id删除
    return request({
      url: `/${group_name}/deleteByIds`,
      method: 'delete',
      data: ids
    })
  },
  update(question) { // 修改更新
    return request({
      url: `/${group_name}/update`,
      method: 'put',
      data: question
    })
  },
  get(id) { // 根据id查询
    return request({
      url: `/${group_name}/getById/${id}`,
      method: 'get',
      data: id
    })
  },
  // 根据id获取试题以及答案信息
  getQuestionVoWithAnswers(id) {
    return request({
      url: `/${group_name}/getQuestionVoWithAnswers/${id}`,
      method: 'get',
      data: id
    })
  },
  getByPage(page) { // 分页查询
    return request({
      url: `/${group_name}/getByPage`,
      method: 'post',
      data: page
    })
  },
  enable(id) { // 根据id启用
    return request({
      url: `/${group_name}/enable/${id}`,
      method: 'put',
      data: id
    })
  },
  disable(id) { // 根据id弃用
    return request({
      url: `/${group_name}/disable/${id}`,
      method: 'put',
      data: id
    })
  },
  // 后台查询试卷试题以及答案列表(含答案)
  getQuestionVoListByPaperIdForPaperInfo(paperId) {
    return request({
      url: `/${group_name}/getQuestionVoListByPaperIdForPaperInfo/${paperId}`,
      method: 'get',
      data: paperId
    })
  },
  // 分页查询考试试卷试题与选项列表（不含答案）
  getQuestionVoListByPageForFront(page) {
    return request({
      url: `/${group_name}/getQuestionVoListByPageForFront`,
      method: 'post',
      data: page
    })
  },
  // 获取题库试题分页对象列表
  getQuestionListByPage(page) {
    return request({
      url: `/${group_name}/getQuestionListByPage`,
      method: 'post',
      data: page
    })
  }
}
