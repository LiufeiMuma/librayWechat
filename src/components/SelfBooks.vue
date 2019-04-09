<template>
  <div class="__g__main ">
    <div id="_content" class="_PageMain">
      <div class="_PageIndex">
        <div class="header">
          <ul class="">
            <!--<li><i class="trophy-alt-ico ico"></i>-->
              <!--<p>图书排行</p></li>-->
            <li @click="getWxBorrowing()">
              <p><i class="ico scan-ico"></i></p>
              <p>扫码借书</p></li>
            <!--<li class="hide"><i class="stopwatch-ico ico"></i>-->
              <!--<p>还书确认</p></li>-->
          </ul>
        </div>
        <ul class="hide">
          <li><img src="" alt="">
            <h3>教你如何使用图书借阅～</h3>
            <p>我们有你想要的任何书，图书馆方便你我他，借书还书在线完成，简单轻松。</p></li>
        </ul>
        <div class="_ActionSheet">
          <div class="bg"></div>
          <div class="main animated05 slideInUp">
            <div class="listmain"></div>
            <div class="cancel">取消</div>
          </div>
        </div>
        <template>
            <ul class="book-list">
              <li v-for="item in borrowsData">
                <div class="top" @click="showInfo(item.barcode)">
                  <div class="left">
                    <img v-if="item.coverimage !=''" :src="item.coverimage" alt="">
                    <img v-else src='../assets/logo.png' alt="">
                  </div>
                  <div class="right">
                    <h3 class="title">{{item.bookname}}</h3>
                    <p class="time"><span>借阅时间：</span>{{item.createtime}}</p>
                    <p class="time" v-if="item.status == '2'"><span>归还时间：</span>{{item.returntime}}</p>
                    <p class="time" v-else><span>应还时间：</span>{{item.should_return_time}}</p>
                  </div>
                </div>
                <div class="operat">
                  <button class="button" v-if="item.status == '1'" @click="showDialog()">我要还书</button>
                  <button class="button huan" v-else>已还书</button>
                </div>
              </li>

            </ul>
            <el-dialog
              title="温馨提示"
              :visible.sync="dialogVisible"
              width="75%" :show-close="false" center>
              <p style="text-align: center;margin: 0">如要还书，请将书交给管理员，管理员确认后方可还书成功！</p>
              <span slot="footer" class="dialog-footer">
                <el-button type="primary" size="medium" plain @click="sureBook()">我知道了</el-button>
              </span>
            </el-dialog>
            <div style="text-align: center">没有更多了！</div>
        </template>


      </div>
    </div>
  </div>
</template>

<script>
  import api from '../api'
  import wx from 'weixin-js-sdk'
  import * as tool from '../common/js/tool'
  export default {
  name: 'SelfBooks',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      dialogVisible: false,
      borrowsData: [],
      bookid: '',
      id: '',
    }
  },
  created() {
  },
  mounted() {
    this.getBorrows();
    tool.wxConfig();
  },
  methods: {
    showInfo(barcode) {
      this.$router.push('/bookinfo/'+barcode);
    },
    showDialog() {
      this.dialogVisible = true;
    },
    sureBook() {
      this.dialogVisible = false;
    },
    getBorrows() {
      api.GetmyBorrows().then((res) => {
        if(res.code == 1){
          this.borrowsData = res.data.total;
          for( let key in res.data.total){
            res.data.total[key]['createtime'] = tool.transformTime(res.data.total[key]['createtime'])
            res.data.total[key]['returntime'] = tool.transformTime(res.data.total[key]['returntime'])
          }
          if(res.data.total.length == 0) {
            this.$message({
              message: '没有你的借阅记录，快去读书吧',
              type: 'success'
            });
          }
        }
      })
    },
    getWxBorrowing(){
      var _this = this;
      wx.ready(function () {
        wx.scanQRCode({
          desc: 'scanQRCode desc',
          needResult: 1, // 默认为0，扫描结果由企业微信处理，1则直接返回扫描结果，
          scanType: ["qrCode", "barCode"], // 可以指定扫二维码还是条形码（一维码），默认二者都有
          success: function(res) {
            _this.$router.push('/Borrowing/'+res.resultStr);
          },
          error: function(res) {
            if (res.errMsg.indexOf('function_not_exist') > 0) {
              alert('版本过低请升级')
            }
          }
        });
      });
    },
    getParam(name){
      var rReg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");    //构造一个正则表达式对象
      var oaUrl = window.location.search.substr(1).match(rReg);  //匹配参数对象
      if( oaUrl !=null ){                  //返回参数
        return  decodeURI(oaUrl[2])
      }
      return null;
    }
  }
}
</script>

<style scoped>
  body{
    margin: 0 !important;
    padding: 0;
  }
  h1, h2 {
    font-weight: normal;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    display: inline-block;
    margin: 0 0.1rem;
  }
  a {
    color: #42b983;
  }

  .hide {
    display: none !important
  }
  .__g__main {
    margin: 0 auto;
    width: 100%;
    height: 15.2rem;
  }
  .ico {
    display: inline-block;
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat
  }
  .ico.scan-ico {
    background-image: url('../assets/scan.png');
    width: .6rem;
    height: .59rem
  }
  .ico.trophy-alt-ico {
    width: .75rem;
    height: .75rem;
    background-size: .6rem auto;
    background-image: url('../assets/trophy-alt.png')
  }
  ::-webkit-scrollbar {
    background-color: transparent
  }

  ::-webkit-scrollbar-thumb {
    -webkit-box-shadow: inset 0 0 6px transparent;
    background-color: transparent
  }

  ._PageIndex {
    padding: 0.9rem 0;
  }

  ._PageIndex .header {
    background-color: #5077aa;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 80
  }

  ._PageIndex .header ul {
    list-style: none;
    margin: 0;
    padding: .26rem 0 .34rem;
  }

  ._PageIndex .header ul li {
    width: 100%;
    text-align: center;
    font-size: .34rem;
    color: #fff;
    position: relative
  }
  ._PageIndex .header ul li p{
    width: 100%;
    line-height: 1;
  }

  ._PageIndex .header ul li .ico {
    width: .75rem;
    height: .75rem
  }

  ._PageIndex .header ul li .ico.scan-ico {
    background-size: .55rem auto
  }

  ._PageIndex .header ul li .ico.book-ico {
    background-size: .5rem auto
  }

  ._PageIndex .header ul li .ico.setting-ico {
    background-size: .48rem auto
  }
  ._PageIndex .header ul:last-child li:after {

  }
  ._PageIndex .header ul li p {
    margin: .08rem 0 0 0
  }

  ._PageIndex .article-list {
    list-style: none;
    margin: .2rem 0 0;
    padding: 0 .2rem
  }

  ._PageIndex .article-list li {
    display: block;
    background-color: #fff;
    border-radius: .04rem;
    padding: .2rem .3rem .3rem;
    box-shadow: 1px 2px 2px 0 rgba(228, 228, 228, .5)
  }

  ._PageIndex .article-list li img {
    border-radius: .05rem;
    background-color: #f5f5f5;
    width: 6.7rem;
    display: block;
    height: auto;
    margin: 0 -.1rem .2rem;
    border-radius: .06rem
  }

  ._PageIndex .article-list li h3 {
    margin: 0;
    padding: 0;
    font-size: .28rem;
    color: #464646;
    margin-bottom: .12rem;
    line-height: .4rem;
    font-weight: 400
  }

  ._PageIndex .article-list li p {
    margin: 0;
    padding-right: .41rem;
    color: #959595;
    font-size: .26rem;
    line-height: .36rem;
    font-weight: 400
  }

  ._PageIndex .book-list {
    /*width: 100%;*/
    list-style: none;
    /*margin-top: 1.25rem;*/
    text-align: center;
    margin: 1.25rem 0.2rem 0 0.2rem;
    box-sizing: border-box;
  }
  /*
  *我的借阅记录
  */
  ._PageIndex .book-list li{
    box-sizing: border-box;
    border-radius: 0.2rem;
    background: #fff;
    margin-bottom: 0.3rem;
    -moz-box-shadow: 4px 4px 10px #ecedef;
    box-shadow: 4px 4px 10px #ecedef;
  }
  ._PageIndex .book-list li .top{
    height: 2.6rem;
    padding: 0.3rem;
    border-bottom: 1px solid #e4e4e4;
  }
  ._PageIndex .book-list li .left{
    float: left;
    width: 2.64rem;
    height: 2.8rem;
  }
  ._PageIndex .book-list li .right{
    float: left;
    width: 5.5rem;
    padding-left: 0.4rem;
  }
  ._PageIndex .book-list li .left img{
    max-width: 2.64rem;
    max-height: 2.8rem;
  }
  ._PageIndex .book-list li h3{
    text-align: left;
    font-size: 0.4rem;
    margin: 0.1rem 0;
  }
  ._PageIndex .book-list li .time{
    margin: 0.2rem 0;
    text-align: left;
  }
  ._PageIndex .book-list li .operat{
    height: 1rem;
    line-height: 1rem;
    text-align: right;
    padding: 0.1rem 0;
  }
  ._PageIndex .book-list li .operat .button{
    display: inline-block;
    padding: 0.15rem 0.3rem;
    border: 1px solid #2f7dcd;
    border-radius: 0.3rem;
    background: #fff;
    color: #2f7dcd;
    margin-right: 0.3rem;
    outline: none;
  }
  ._PageIndex .book-list li .operat .huan{
    border: 1px solid #666666;
    color: #666666;

  }

</style>
