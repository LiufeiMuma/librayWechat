import api from '../../api'
import * as types from '../types'

const state = {
  userInfo: JSON.parse(sessionStorage.getItem('userInfo')) || {}
}

const actions = {
  /**
   * 设置用户信息
   */
  setUserInfo({ commit }) {
    alert('2:'+JSON.stringify('1'));
    api.GetUserInfo().then((res) => {
      sessionStorage.setItem('userInfo',JSON.stringify(res))

      commit(types.SET_USER_INFO, res.data)
    })
  }
}
const getters = {
  userInfo: state => state.userInfo
}

const mutations = {
  [types.SET_USER_INFO](state, res) {
    state.userInfo = res
  }
}
export default {
  state,
  actions,
  getters,
  mutations
}
