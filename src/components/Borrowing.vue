<template>
  <div class="borrowing">
    <div class="main" v-bind:class="{ active: isActive }">
      <div class="borrowing-intro">
        <div class="left">
          <!--<img src='../assets/logo.png' alt="">-->
          <img :src="bookInfo.coverimage" alt="">
        </div>
        <div class="right">
          <h3 class="title">{{bookInfo.bookname}}</h3>
          <p class="return_time" v-if="bookInfo.stock > 0">应还时间：<span>{{this.should_returntime}}</span></p>
          <p class="return_time" v-else>应还时间：<span></span></p>
          <p class="borrow_time" v-if="bookInfo.stock > 0">借阅时间：<span>{{this.borrowtime}}</span></p>
          <p class="borrow_time" v-else>借阅时间：<span></span></p>
        </div>
      </div>
      <div class="borrow-bottom" v-if="bookInfo.stock > 0">
        <span class="title">常用书架</span>
        <div>
          <p class="type"><span>{{bookInfo.type_id}}</span> 图书馆</p>
          <p class="borrow" @click="confirmBorrow">确认借阅</p>
        </div>
      </div>
      <div class="other" v-else>
        很遗憾，这本书已被借出，无法借阅
      </div>
      <el-dialog
        title="借阅成功"
        :visible.sync="dialogVisible"
        :close-on-click-modal="false"
        width="75%" center :show-close="false">
        <p style="text-align: center;margin: 0">请在30天内归还书籍</p>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" size="medium" plain @click="returnBook()">我知道了</el-button>
        </span>
      </el-dialog>
    </div>
    <div class="error" v-bind:class="{ errorActive: isErrorActive }">
      <span>查询失败</span>
    </div>
  </div>
</template>

<script>
  import api from '../api'
  import * as tool from '../common/js/tool'
  export default {
    name: "Borrowing",
    data() {
      return {
        showMore: false,
        showBorrowed: false,
        isbn: this.$route.params.isbn,
        bookInfo:{},
        dialogVisible: false,
        isActive: false,
        isErrorActive: false,
        borrowtime: '',
        should_returntime: '',
      }
    },
    created() {

    },
    mounted() {
      this.GetbookInfo();
    },
    methods: {
      GetbookInfo() {
        let params = {};
        params['barcode'] = this.isbn;
        api.GetbookInfo(params).then((res) => {
          console.log(res)
          if(res.code == 1){
            this.isActive = true;
            this.bookInfo = res.data.total;
            var tmp = Date.parse( new Date()).toString();
            tmp = tmp.substr(0,10);
            this.borrowtime = tool.transformTime(tmp);
            this.should_returntime = tool.getNextMonth(tmp);
          }else {
            this.isActive = false;
            this.isErrorActive = true;
            let _this = this;
            setTimeout(function () {
              _this.$router.back();
            },1500)
          }
        })
      },
      confirmBorrow() {
        let params = {};
        params['barcode'] = this.isbn;
        api.GetBorrowed(params).then((res) => {
          if(res.code == 1){
            this.dialogVisible = true;
          } else{
            this.$message({
              message: res.msg,
              type: 'error'
            });
          }
        })
      },
      returnBook() {
        this.dialogVisible = false;
        let _this = this;
        setTimeout(function () {
          _this.$router.push('/SelfBooks');
        },1500)
      }
    }
  }
</script>

<style scoped>
  .borrowing .main{
    margin-bottom: 1.5rem;
    display: none;
  }
  .borrowing .main.active{
    display: block;
  }
  .borrowing .main .borrowing-intro{
    /*width: 88%;*/
    height: 3.5rem;
    padding: 0.4rem 0.3rem;
    /*border-bottom: 1px solid #e3e3e3;*/
    background: #fff;
    margin: 0.3rem 0.4rem;
    border-radius: 4px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
  }
  .borrowing .main .borrowing-intro .left{
    float: left;
    width: 2.64rem;
    height: 2.8rem;
    padding-left: 0.15rem;
  }
  .borrowing .main .borrowing-intro .right{
    float: left;
    /*width: 70%;*/
    padding-left: 0.4rem;
    width: 5rem;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .borrowing .main .borrowing-intro .left img{
    max-width: 2.64rem;
    max-height: 2.8rem;
  }
  .borrowing .main .borrowing-intro h3{
    text-align: left;
    font-size: 0.4rem;
    margin: 0.1rem 0;
  }
  .borrowing .main .borrowing-intro .return_time{
    margin: 0.3rem 0 0.2rem 0;
    text-align: left;
  }
  .borrowing .main .borrowing-intro .borrow_time{
    text-align: left;
    margin-top: 0.2rem;
  }
  .borrowing .main .borrow-bottom{
    margin-top: 1rem;
  }
  .borrowing .main .borrow-bottom div{
    width: 100%;
    height: 1.8rem;
    background: #fff;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.02)
  }
  .borrowing .main .borrow-bottom .title{
    display: inline-block;
    margin: 0 0 0.2rem 0.5rem;
    color: #9a9a9a;
  }
  .borrowing .main .borrow-bottom div .type{
    float: left;
    line-height: 1.8rem;
    margin: 0 0 0 0.5rem;
    font-size: 0.36rem;
  }
  .borrowing .main .borrow-bottom div .borrow{
    float: right;
    width: 2.1rem;
    height: 1rem;
    text-align: center;
    line-height: 1rem;
    background: #307fce;
    color: #fff;
    border-radius: 4px;
    font-size: 0.38rem;
    margin: .4rem 0.5rem 0 0;
  }
  .borrowing .main .other{
    width: 100%;
    text-align: center;
    height: .8rem;
    line-height: .8rem;
    background: #307fce;
    color: #fff;

  }
  .borrowing .error{
    text-align: center;
    display: none;
  }
  .borrowing .error.errorActive{
    display: block;
  }
  .borrowing .error span{
    display: inline-block;
    position: fixed;
    top: 48%;
    left: 50%;
    margin-left: -1rem;
    width: 2rem;
    height: 0.8rem;
    line-height: 0.75rem;
    background: #8a8a8a;
    color: #fff;
    border-radius: 4px;

  }

</style>
