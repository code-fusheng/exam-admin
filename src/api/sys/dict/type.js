import request from '@/utils/request'
var group_name = 'dict/type'
export default {
  save(type) { // 添加
    return request({
      url: `/${group_name}/save`,
      method: 'post',
      data: type
    })
  },
  delete(ids) { // 根据id删除
    return request({
      url: `/${group_name}/deleteByIds`,
      method: 'delete',
      data: ids
    })
  },
  update(type) { // 修改更新
    return request({
      url: `/${group_name}/update`,
      method: 'put',
      data: type
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
  getList() { // 查询所有可用的字典类型
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
