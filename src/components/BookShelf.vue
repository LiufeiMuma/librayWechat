
<template>
  <div class="bookshelf">
    <div class="header">
      <el-row>
        <el-col :span="2">
          <div style="padding: 0.25rem 0">分类</div>
        </el-col>
        <el-col :span="6">
          <el-select v-model="type" @change="changeType">
            <el-option v-for="item in typelist" :key="item.typename" :label="item.typename" :value="item.typename"></el-option>
          </el-select>
        </el-col>
        <el-col :span="14">
          <el-input placeholder="搜索" v-model="bookvalue" v-on:input="changeSearch">
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
          </el-input>
        </el-col>
      </el-row>
    </div>
    <template>
      <ul class="book-list">
        <li @click="showInfo(item.barcode)" v-for="item in booksData">
            <div class="left">
              <img v-if="item.coverimage !=''" :src="item.coverimage" alt="">
              <img v-else src="../assets/logo.png" alt="">
            </div>
            <div class="right">
              <h3 class="title">{{item.bookname}}</h3>
              <p class="type"><span>{{item.typename}}</span></p>
              <p class="author"><span>{{item.author}}/</span>{{item.press}}</p>
            </div>
        </li>
      </ul>
      <div class="nomore">没有更多了！</div>
    </template>

  </div>
</template>

<script>
  import api from '../api'
  export default {
    name: 'BookShelf',
    data () {
      return {
        type: '',
        bookvalue:'',
        booksData: [],
        images: '../assets/logo.png',
        typelist: []
      }
    },
    watch: {

    },
    created() {

    },
    mounted() {
      this.getData();
      this.getTypeList();

    },
    activated() {

    },
    methods: {
      changeType() {
        this.getData();
      },
      changeSearch(value) {
        let params = {};
        params['value'] = value;
        api.Getsearch(params).then((res) => {
          if(res.code == 1){
            this.booksData = res.data.total;
          }
        })
      },
      showInfo(barcode) {
        this.$router.push('/bookinfo/'+barcode);
      },
      getData() {
        let params = {};
        params['typename'] = this.type
        api.Getbooklist(params).then((res) => {
          if(res.code == 1){
            this.booksData = res.data.total;
          }
        })
      },
      getTypeList() {
        api.GetbookType().then((res) => {
          let typedata = res.data;
          let data = [{typename:'全部'}];
          for(let i in typedata) {
            data.push(typedata[i])
          }
          this.typelist = data;
        })

      }

    }
  }
</script>
<style scoped>
  .bookshelf{
    /*background: #fff;*/
  }
  .bookshelf .header{
    width: 100%;
    padding: 0.2rem 0.3rem;
    background: #fff;
    border-bottom: 1px solid #e4e4e4;
    position: fixed;
    top: 0;
  }
  .bookshelf .header .el-select,.bookshelf .header .el-input{
    height: 1rem;
    padding: 0 0.2rem;
  }
  .el-input__inner{
    height: 100%;
  }
  .bookshelf .book-list{
    list-style: none;
    /*padding: 0 0.3rem;*/
    padding: 0;
    margin: 1.3rem 0 0.1rem 0;
    background: #fff;
  }
  .bookshelf .book-list li{
    /*height: 2.65rem;*/
    overflow: hidden;
    padding: 0.3rem 0.4rem;
    border-bottom: 1px solid #e3e3e3;
  }
  .bookshelf .book-list li .left{
    float: left;
    width: 2.64rem;
    height: 2.8rem;
    padding-left: 0.15rem;
  }
  .bookshelf .book-list li .right{
    float: left;
    /*width: 70%;*/
    padding-left: 0.4rem;
    width: 6rem;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .bookshelf .book-list li .left img{
    max-width: 2.64rem;
    max-height: 2.8rem;
  }
  .bookshelf .book-list li h3{
    text-align: left;
    font-size: 0.4rem;
    margin: 0.1rem 0;
  }
  .bookshelf .book-list li .type{
    margin: 0.2rem 0;
    text-align: left;
  }
  .bookshelf .book-list li .author{
    text-align: left;
    /*padding: 0.1rem 0;*/
  }
  .nomore{
    clear: both;
    text-align: center;
    margin-bottom: 2rem;
    padding-top: 0.2rem;
  }
  #app .footer-navigation{
    padding-bottom: constant(safe-area-inset-bottom);
    padding-bottom: env(safe-area-inset-bottom);
  }
</style>
