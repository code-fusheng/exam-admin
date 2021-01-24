const getters = {
  sidebar: state => state.app.sidebar,
  size: state => state.app.size,
  device: state => state.app.device,
  token: state => state.user.token,
  header: state => state.user.header,
  name: state => state.user.name,
  userId: state => state.user.userId,
  repositoryList: state => state.global.repositoryList,
  paperRuleList: state => state.global.paperRuleList,
  categoryList: state => state.global.categoryList
}
export default getters
