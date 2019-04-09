import api from '../../api'
import * as types from '../types'

const state = {
  typeList: []
}

const actions = {
  /**
   * 设置分类列表
   */
  setTypeList({ commit }) {
      api.GetbookType().then((res) => {
        commit(types.SET_TYPE_LIST, res.data)
      })
  }
}
const getters = {
  typeList: state => state.typeList
}

const mutations = {
  [types.SET_TYPE_LIST](state, res) {
    state.typeList = res
  }
}
export default {
  state,
  actions,
  getters,
  mutations
}
