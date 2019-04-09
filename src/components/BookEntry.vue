<template>
  <div class="bookentry">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="书架">
        <el-input v-model="bookshelf"></el-input>
      </el-form-item>
      <el-form-item label="书名">
        <el-input v-model="bookname"></el-input>
      </el-form-item>
      <el-form-item label="条形码">
        <el-input v-model="barcode"></el-input>
      </el-form-item>
      <el-form-item label="封面">
        <div class="book_cover">
          <img :src='coverimage' alt="">
        </div>
      </el-form-item>
      <el-form-item label="数量">
        <el-input-number v-model="num" @change="changeNumber" :min="1" :max="10" label="1"></el-input-number>
      </el-form-item>
      <el-form-item label="分类">
        <el-select v-model="type">
          <el-option v-for="item in typelist" :key="item.typename" :label="item.typename" :value="item.typename"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item class="saoma">
        <div class="ru" @click="submit">确认入库</div>
        <div class="sao" @click="getWxSao()">扫码添加</div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import api from '../api'
  import wx from 'weixin-js-sdk'
  // import {wxConfig} from '../common/js/wxConfig.js'
  export default {
    name: "BookEntry",
    data() {
      return {
        form: {

        },
        bookshelf: '图书馆',
        bookname: '',
        num: 1,
        barcode: '',
        type: '',
        coverimage: '',
        typelist: [],
        resource: '',
        desc: '',
        isbn: this.$route.params.isbn,
        author: '',
        press: '',
        introduction: '',
        count: '',
        type_id: '',
      }
    },
    created() {

    },
    mounted() {
      this.showData();
      this.getTypeList();
      // wxConfig();
    },
    methods: {
      changeNumber(num) {
        console.log(this.num)
      },
      showData() {
        let params = {};
        params['isbn'] = this.isbn;
        api.GetbookData(params).then((res) => {
          console.log(res);
          if(res.code == 1){
            this.bookname = res.data.total.bookname;
            this.barcode = res.data.total.barcode;
            this.type = res.data.total.typename;
            this.coverimage = res.data.total.coverimage;
          } else if(res.showapi_res_body.ret_code == 0) {
            let data = res.showapi_res_body.data;
            this.bookname = data.title;
            this.barcode = data.isbn;
            this.coverimage = data.img;
            this.author = data.author;
            this.press = data.publisher;
            this.introduction = data.gist;
          } else {
            this.$message({
              message: res.msg,
              type: 'error'
            });
          }

        })
      },
      submit() {
        let params = {};
        params['bookname'] = this.bookname;
        params['barcode'] = this.barcode;
        params['typename'] = this.type;
        params['count'] = this.num;
        params['image'] = this.coverimage;
        params['author'] = this.author;
        params['press'] = this.press;
        params['introduction'] = this.introduction;
        api.GetaddBook(params).then((res) => {
          console.log(res);
          if(res.code == 1){
            this.$message({
              message: '入库成功',
              type: 'success'
            });
            let _this = this;
            setTimeout(function () {
              _this.$router.push('/Setting');
            },1500)
          }

        })
      },
      getTypeList() {
        api.GetbookType().then((res) => {
          this.typelist = res.data;
        })
      },
      getWxSao(){
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

<style>
  .bookentry .el-form-item{
    background: #fff;
    margin: 10px 0;
  }
  .bookentry .el-input__inner{
    border: none !important;
  }
  .bookentry .saoma{
    width: 100%;
    height: 1.4rem;
    background: #fff;
    position: fixed;
    bottom: 0;
    z-index: 9999;
    padding: 0.25rem 0.4rem;
    box-sizing: border-box;
    margin: 0;
  }


  .bookentry .saoma .ru,.saoma .sao{
    text-align: center;
    width: 45%;
    height: 100%;
    line-height: 1rem;
    border: 1px solid #3e7ebb;
    border-radius: 0.1rem;
    color: #3e7ebb;
    font-size: 0.4rem;
    float: left;
  }
  .bookentry .saoma .sao{
    float: right;
    background: #3e7ebb;
    color: #fff;
  }
  .bookentry .saoma .el-form-item__content{
    margin-left: 0 !important;
  }
  .bookentry .el-form-item .book_cover{
      padding: .3rem;
  }
  .bookentry .el-form-item .book_cover img{
    width: 2.7rem;
  }
</style>
