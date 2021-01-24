import request from '@/utils/request'
var group_name = 'paper'
export default {
  save(paper) { // 添加
    return request({
      url: `/${group_name}/save`,
      method: 'post',
      data: paper
    })
  },
  saveQuestionVoForPaper(question) { // 添加
    return request({
      url: `/${group_name}/saveQuestionVoForPaper`,
      method: 'post',
      data: question
    })
  },
  // 更新试卷试题信息
  updateQuestionVoForPaper(question) {
    return request({
      url: `/${group_name}/updateQuestionVoForPaper`,
      method: 'put',
      data: question
    })
  },
  // 选择题库试题添加到试卷
  saveSelectQuestionVoForPaper(questionIdsAndPaperId) {
    return request({
      url: `/${group_name}/saveSelectQuestionVoForPaper`,
      method: 'post',
      data: questionIdsAndPaperId
    })
  },
  delete(ids) { // 根据id删除
    return request({
      url: `/${group_name}/deleteByIds`,
      method: 'delete',
      data: ids
    })
  },
  deleteQuestionForPaperById(questionId, paperId) {
    return request({
      url: `/${group_name}/deleteQuestionForPaperById/` + questionId + '/' + paperId,
      method: 'delete'
    })
  },
  update(paper) { // 修改更新
    return request({
      url: `/${group_name}/update`,
      method: 'put',
      data: paper
    })
  },
  get(id) { // 根据id查询
    return request({
      url: `/${group_name}/getById/${id}`,
      method: 'get',
      data: id
    })
  },
  // 查询试卷中试题详情
  getQuestionVoForPaperByQuestionIdAndPaperId(questionId, paperId) {
    return request({
      url: `/${group_name}/getQuestionVoForPaperByQuestionIdAndPaperId/` + questionId + '/' + paperId,
      method: 'get'
    })
  },
  // 根据id获取试题以及答案信息
  getPaperVoWithPaperRuleVoWithQuestionVosById(id) {
    return request({
      url: `/${group_name}/getPaperVoWithPaperRuleVoWithQuestionVosById/${id}`,
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
  // 获取试卷与规则信息 - 在线考试接口
  getPaperWithRuleByPaperId(paperId) {
    return request({
      url: `/${group_name}/getPaperWithRuleByPaperId/${paperId}`,
      method: 'get',
      data: paperId
    })
  }
}
