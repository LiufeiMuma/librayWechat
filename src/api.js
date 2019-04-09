import axios from 'axios'
// import store from './vuex/store'
import * as tool from './common/js/tool'
import qs from 'qs'
import { Loading } from 'element-ui'
import { Message } from 'element-ui'

// axios 配置
axios.defaults.timeout = 20000;
if (process.env.NODE_ENV !== 'development') {
  axios.defaults.baseURL = 'http://' + window.location.host
  // axios.defaults.baseURL = 'http://localhost:8190'
}
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
let loading;
axios.interceptors.request.use(
  (config) => {
    loading = Loading.service({fullscreen: true, text: '数据加载中...'});
    // POST传参序列化
    if(config.method  === 'post') {
      config.data = qs.stringify(config.data);
    }
    // if (store.state.token) {
    // 	config.headers.Authorization = `token ${store.state.token}`;
    // }
    return config;
  },
  (error) =>{
    return Promise.reject(error);
  }
);

//返回状态判断
axios.interceptors.response.use(
  (response) => {
    loading.close();
    return response;
  },
  (error) => {
    loading.close();
    return Promise.reject(error);
  }
);
function showErrorMessage(msg) {
  Message({
    message : msg,
    type : 'error'
  });
}

function showSuccMessage(msg) {
  Message({
    message : msg,
    type : 'success'
  });
}
function fetch(url, data) {
  return new Promise((resolve, reject) => {
    axios.post(
      url,
      data
    ).then(response => {
      // if (response.data.code === 0) {
      //   let msg = `code: ${response.data.code} message: ${response.data.msg}`;
      //   tool.showErrorMessage(msg);
      // }
      return resolve(response.data);
    }).catch((error) => {
      let msg = '';
      if (error.response) {
        msg = error.response.data.msg;
      } else {
        msg = error.toString();
      }
      showErrorMessage(msg);
    })
  })
}

export default {
  /**
   * 获取用户信息
   */
  GetUserInfo() {
    return fetch('api/user/info', {})
  },
  /**
  * 用户身份
  */
  GetisAdmin() {
    return fetch('api/booksms/isadmin', {})
  },
  /**
   * 获取图书类型列表
   */
  GetbookType(params) {
    return fetch('api/booksms/booktype',params)
  },
  /**
   * 获取图书列表
   */
  Getbooklist(params) {
    return fetch('api/booksms/books', params)
  },
  /**
   * 获取图书详情
   */
  GetbookInfo(params) {
    return fetch('api/booksms/bookinfo',params)
  },
  /**
   * 我的借阅记录
   */
  GetmyBorrows() {
    return fetch('api/booksms/myborrows',{})
  },
  /**
   * 扫码借书
   */
  GetBorrowed(params) {
    return fetch('api/booksms/borrowed',params)
  },
  /**
   * 微信扫一扫
  */
  GetWxsao() {
    return fetch('api/booksms/jssdk',{})

  },
  /**
  * 还书
  */
  GetreturnBook(params) {
    return fetch('api/booksms/returnbook',params)
  },
  /**
   * 入库
   */
  GetaddBook(params) {
    return fetch('api/booksms/addbook',params)
  },
  /**
   * 模糊查询
   */
  Getsearch(params) {
    return fetch('api/booksms/search',params)
  },
  /**
   * 模糊查询
   */
  GetbookData(params) {
    return fetch('api/booksms/isbn',params)
  }
}
