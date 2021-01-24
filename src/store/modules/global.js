const state = {
  categoryList: [], // 分类列表
  repositoryList: [], // 题库列表
  paperRuleList: [] // 试卷规则列表
}

const mutations = {
  SET_CATEGORY: (state, categoryList) => {
    state.categoryList = categoryList
  },
  SET_REPOSITORY: (state, repositoryList) => {
    state.repositoryList = repositoryList
  },
  SET_PAPERRULE: (state, paperRuleList) => {
    state.paperRuleList = paperRuleList
  }

}

export default {
  namespaced: true,
  state,
  mutations
}

