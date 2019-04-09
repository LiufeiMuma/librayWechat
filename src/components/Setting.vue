<template>
    <div class="setting">
      <ul class="">
        <li class="item1" @click="getWxJsJdk()" v-bind:class="{ active: isActive }">
          <i class="ico book-manage"></i>
          <span class="name">图书入库</span>
          <span class="des">
            扫描条形码
           <i class="ico arrow-right"></i>

          </span>
        </li>
        <li @click="help()">
          <i class="ico help-center"></i>
          <span class="name">帮助中心</span>
          <i class="ico arrow-right"></i>
        </li>
        <!--<li class="hide"><i class="stopwatch-ico ico"></i>-->
        <!--<p>还书确认</p></li>-->
      </ul>
    </div>
</template>

<script>
  import api from '../api'
  import wx from 'weixin-js-sdk'
  import * as tool from '../common/js/tool'
  export default {
        name: "Setting",
        data () {
          return {
            isActive: true,
            isadmin: ''
          }
        },
        created() {

        },
        mounted() {
            tool.wxConfig();
            this.getisAdmin();
        },
        methods: {
          help() {
              this.$router.push('/Help');
          },
          getisAdmin(){
            api.GetisAdmin().then((res) => {
              if(res.code == 1) {
                if(res.data.isadmin == 1){
                  this.isActive = true;
                }else {
                  this.isActive = false;
                }
              }
            })
          },
          getWxJsJdk(){
            var _this = this;
            wx.ready(function () {
                wx.scanQRCode({
                  desc: 'scanQRCode desc',
                  needResult: 1, // 默认为0，扫描结果由企业微信处理，1则直接返回扫描结果，
                  scanType: ["qrCode", "barCode"], // 可以指定扫二维码还是条形码（一维码），默认二者都有
                  success: function(res) {
                    _this.$router.push('/BookEntry/'+res.resultStr);
                  },
                  error: function(res) {
                    if (res.errMsg.indexOf('function_not_exist') > 0) {
                      alert('版本过低请升级')
                    }
                  }
                });
              });
          },
        }
    }
</script>

<style scoped>
  .setting ul{
    margin: 0;
    padding: 0;
  }
 .setting ul li{
    height: 1.2rem;
   line-height: 1.2rem;
   padding: 0 0.4rem;
   background: #fff;
   border-bottom: 1px solid #e3e3e3;
   border-top: 1px solid #e3e3e3;
   margin: 0.2rem 0;
  }
 .setting ul .item1{
   display: none;
 }
  .setting ul .active{
    display: block;
  }
  .setting ul li .name{
   margin-left: 0.2rem;
    font-size: 0.34rem;
 }
  .des{
    float: right;
    font-size: 0.3rem;
    color: #959595;
  }
 .setting .ico{
   display: inline-block;
   background-position: center;
   background-size: contain;
   background-repeat: no-repeat;
   vertical-align: middle;
  }
 .ico.book-manage {
   background-image: url('../assets/book-manage.png');
   width: .6rem;
   height: .6rem
 }
 .ico.help-center {
   background-image: url('../assets/help-center.png');
   width: .6rem;
   height: .6rem
 }
  .ico.arrow-right{
    background-image: url("../assets/arrow-right.png");
    width: 0.3rem;
    height: 0.7rem;
    float: right;
    margin-top: 0.22rem;
    margin-left: 0.2rem;
  }

</style>
