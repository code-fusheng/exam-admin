import request from '@/utils/request'
var group_name = 'repository'
export default {
  save(repository) { // 添加
    return request({
      url: `/${group_name}/save`,
      method: 'post',
      data: repository
    })
  },
  delete(ids) { // 根据id删除
    return request({
      url: `/${group_name}/deleteByIds`,
      method: 'delete',
      data: ids
    })
  },
  update(repository) { // 修改更新
    return request({
      url: `/${group_name}/update`,
      method: 'put',
      data: repository
    })
  },
  get(id) { // 根据id查询
    return request({
      url: `/${group_name}/getById/${id}`,
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
  getList() { // 查询所有可用试题列表
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
