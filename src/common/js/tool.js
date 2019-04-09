import { Message } from 'element-ui'
import wx from 'weixin-js-sdk'
import api from '../../api'

export function wxConfig() {
  api.GetWxsao().then((res) => {
    wx.config({
      beta: true,// 必须这么写，否则wx.invoke调用形式的jsapi会有问题
      debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
      appId: res.appId, // 必填，企业微信的corpID
      timestamp: res.timestamp, // 必填，生成签名的时间戳
      nonceStr: res.nonceStr, // 必填，生成签名的随机串
      signature: res.signature,// 必填，签名，见附录1
      jsApiList: ['scanQRCode'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
    });
    wx.error(function(res){//通过error接口处理失败验证
      // config信息验证失败会执行error
      console.log('执行失败');
    });

  }).catch(err => {
    console.log(err);
  })
}

export function showErrorMessage(msg) {
  Message({
    message : msg,
    type : 'error'
  });
}

export function transformTime(date){
  var date = new Date(date*1000);//如果date为13位不需要乘1000
  var Y = date.getFullYear() + '-';
  var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
  var D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + ' ';
  var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
  var m = (date.getMinutes() <10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
  var s = (date.getSeconds() <10 ? '0' + date.getSeconds() : date.getSeconds());
  return Y+M+D;
}

export function getNextMonth(date) {
  var date=new Date(date*1000);
  date.setMonth(date.getMonth()+1);
  var y = date.getFullYear();
  var m = (date.getMonth() + 1) < 10 ? ("0" + (date.getMonth() + 1)) : (date.getMonth() + 1);
  var d = date.getDate() < 10 ? ("0" + date.getDate()) : date.getDate();
  var formatwdate = y+'-'+m+'-'+d ;
  return formatwdate;
}
