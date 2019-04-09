<template>
    <div class="bookinfo">
      <div class="main">
        <div class="book-intro">
          <div class="left">
            <!--<img src='../assets/logo.png' alt="">-->
            <img :src="bookInfo['coverimage']" alt="">
          </div>
          <div class="right">
            <h3 class="title">{{bookInfo['bookname']}}</h3>
            <p class="type"><span>{{bookInfo['typename']}}</span></p>
            <p class="author"><span>{{bookInfo['author']}}/</span>{{bookInfo['press']}}</p>
          </div>
        </div>
        <div class="book-desc">
          <h3 class="title">图书简介</h3>
          <div class="text-area" :style="{height : showMore ? 'auto': '2.3rem'}">
            <div class="text">
              {{bookInfo['introduction']}}
            </div>
          </div>
          <div class="hide" v-show="isLongContent" :class="{'show-more' : showMore}">
            <div @click="_toggleShowMore">
              <div v-if="!showMore">
                <span>查看全部</span>
                <i class="ico arrow-down-ico"></i>
              </div>
              <div v-else>
                <span>收起</span>
                <i class="ico arrow-down-ico" style="transform: rotate(-90deg)"></i>
              </div>
            </div>
            <!--{{ showMore ? '收起' : '查看全部'}}-->

          </div>
          <!--<div class="hide show" @click="hideAll()">-->

          <!--</div>-->
        </div>
        <div class="extro" @click="_toggleShowBorrowed">
          <h3 class="left title">图书馆</h3>
          <span class="right">
            可借{{bookInfo.stock}}本
            <span class="extro_arrow" v-bind:class="{ active: isActive }">
              <i v-if="!showBorrowed" class="ico arrow-down-ico"></i>
              <i v-else class="ico arrow-down-ico" style="transform: rotate(-90deg)"></i>
            </span>


          </span>
        </div>
        <ul class="borrowed" v-if="showBorrowed">
          <li v-for="item in bookInfo.borrowed">
            <div class="left">
              <img v-if="item.avatar !=''" :src="item.avatar" alt="">
              <img v-else src="../assets/book-manage.png" alt="">
            </div>
            <div class="right">
              <p v-if="item.nickname != ''" class="username">{{item.nickname}}</p>
              <p v-else class="username">{{item.username}}</p>
              <p class="time">应还时间：{{item.should_return_time}}</p>
            </div>
          </li>
        </ul>
      </div>
      <div class="saoma" @click="getBorrowing()">
        <div class="jie">
          扫码借书
        </div>
      </div>
    </div>
</template>

<script>
  import api from '../api'
  import wx from 'weixin-js-sdk'
  export default {
        name: "Bookinfo",
        data() {
          return {
            showMore: false,
            showBorrowed: false,
            isLongContent: true,
            isbn: this.$route.params.isbn,
            bookInfo:{},
            isActive: false
          }
        },
      created() {

      },
      mounted() {
        this.GetbookInfo();
      },
      methods: {
        _toggleShowMore () {
          this.showMore = !this.showMore;
        },
        GetbookInfo() {
          let params = {};
          params['barcode'] = this.isbn;
          api.GetbookInfo(params).then((res) => {
            if(res.code == 1){
              this.bookInfo = res.data.total;
              if(res.data.total['introduction'] == '') {
                this.isLongContent = false;
              }

              if(res.data.total['borrowed'].length > 0) {
                this.isActive = true;
              }
            }
          })
        },
        _toggleShowBorrowed() {
          if(this.bookInfo.borrowed.length>0) {
            this.showBorrowed = !this.showBorrowed;
          }
        },

        getBorrowing(){
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

      }
    }
</script>

<style scoped>
  .bookinfo .main{
    margin-bottom: 1.5rem;
  }
  .bookinfo .main .book-intro{
    overflow: hidden;
    padding: 0.3rem 0.4rem;
    border-bottom: 1px solid #e3e3e3;
    background: #fff;
  }
  .bookinfo .main .book-intro .left{
    float: left;
    width: 2.6rem;
    height: 2.8rem;
    padding-left: 0.15rem;
  }
  .bookinfo .main .book-intro .right{
    float: left;
    /*width: 70%;*/
    padding-left: 0.4rem;
    width: 6rem;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .bookinfo .main .book-intro .left img{
    max-width: 2.6rem;
    max-height: 2.8rem;
  }
  .bookinfo .main .book-intro h3{
    text-align: left;
    font-size: 0.4rem;
    margin: 0.1rem 0;
  }
  .bookinfo .main .book-intro .type{
    margin: 0.2rem 0;
    text-align: left;
  }
  .bookinfo .main .book-intro .author{
    text-align: left;

    /*padding: 0.1rem 0;*/
  }
  .bookinfo .main .book-desc{
    background: #fff;
    padding: 0.2rem 0.4rem 0 0.4rem;
    border-top: 1px solid #e3e3e3;
    border-bottom: 1px solid #e3e3e3;
    margin: 0.25rem 0;
  }
  .bookinfo .main .book-desc .text-area{
    height: 2.3rem;
    overflow: hidden;
  }
  .showall{
    height: 2.3rem;
    overflow: hidden;
  }
  .showall.active{
    height: auto;
  }
  .bookinfo .main .book-desc .text{
    color: #939393;
    font-size: 0.34rem;
    line-height: 0.6rem;
  }
  .bookinfo .main .book-desc .hide {
    text-align: center;
    height: 1rem;
    line-height: 1rem;
    border-top: 1px solid #ececec;
    margin-top: 0.2rem;
  }
  .bookinfo .ico{
    display: inline-block;
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;
    vertical-align: middle;
  }
  .ico.arrow-down-ico {
    background-image: url('../assets/arrow-right.png');
    width: .25rem;
    height: .5rem;
    transform: rotate(90deg);
    margin-left: 0.2rem;
    margin-top: -0.1rem;
  }
  .bookinfo .main .extro{
    text-align: center;
    line-height: 1rem;
    background: #fff;
    border-top: 1px solid #e3e3e3;
    border-bottom: 1px solid #e3e3e3;
    padding: 0 0.4rem;
    overflow: hidden;
    /*margin-bottom: 2rem;*/
  }
  .bookinfo .main .extro .extro_arrow{
    display: none;
  }
  .bookinfo .main .extro .extro_arrow.active{
    display: inline-block;
  }
  .bookinfo .main .extro .left{
    float: left;
    margin: 0;
  }
  .bookinfo .main .extro .right{
    float: right;
    margin-right: 0.4rem;
    color: #9b9b9b;
  }
  .bookinfo .borrowed{
    margin: 0;
    padding: 0;
    background: #ffffff;
    border-bottom: 1px solid #e3e3e3;
  }
  .bookinfo .borrowed li{
    height: 1.8rem;
  }
  .bookinfo .borrowed .left{
    float: left;
    margin: 0.25rem 0.4rem 0 0.5rem;
  }
  .bookinfo .borrowed .left img{
    width: 1.3rem;
    height: 1.3rem;
    border-radius: 50%;
  }
  .bookinfo .borrowed .right{
    float: left;
  }
  .bookinfo .borrowed .right .username{
    font-size: 0.4rem;
    color: #3c3c3c;
    margin: 0.2rem 0 0 0;
    line-height: 0.6rem;
  }
  .bookinfo .borrowed .right .time{
    font-size: 0.36rem;
    color: #888888;
    margin: 0.2rem 0 0 0;
    line-height: 0.6rem;
  }
  .bookinfo .saoma{
    width: 100%;
    height: 1.4rem;
    background: #fff;
    position: fixed;
    bottom: 0;
    z-index: 9999;
    padding: 0.2rem 0.4rem;
    box-sizing: border-box;
  }
  .bookinfo .saoma .jie{
    text-align: center;
    width: 100%;
    height: 100%;
    line-height: 1rem;
    border: 1px solid #3e7ebb;
    border-radius: 0.2rem;
    color: #3e7ebb;
    font-size: 0.4rem;
  }
</style>
