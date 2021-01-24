import request from '@/utils/request'
var group_name = 'exam'
export default {
  save(exam) { // 添加
    return request({
      url: `/${group_name}/saveExam`,
      method: 'post',
      data: exam
    })
  },
  //  交卷
  saveQuestionReply(questionReplyList) {
    return request({
      url: `/${group_name}/saveQuestionReply`,
      method: 'post',
      data: questionReplyList
    })
  },
  delete(ids) { // 根据id删除
    return request({
      url: `/${group_name}/deleteExamByIds`,
      method: 'delete',
      data: ids
    })
  },
  update(exam) { // 修改更新
    return request({
      url: `/${group_name}/updateExam`,
      method: 'put',
      data: exam
    })
  },
  get(id) { // 根据id查询
    return request({
      url: `/${group_name}/getExamVoById/${id}`,
      method: 'get',
      data: id
    })
  },
  // 获取考试试卷集合根据考试编号
  getPaperVoListByExamId(id) {
    return request({
      url: `/${group_name}/getPaperVoListByExamId/${id}`,
      method: 'get',
      data: id
    })
  },
  getByPage(page) { // 分页查询
    return request({
      url: `/${group_name}/getExamVoByPage`,
      method: 'post',
      data: page
    })
  },
  getList() { // 查询所有可用考试列表
    return request({
      url: `/${group_name}/getList`,
      method: 'get'
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
  }
}
