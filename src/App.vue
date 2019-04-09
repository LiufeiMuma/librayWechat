<template>
  <div id="app">
    <!--<img src="./assets/logo.png">-->
    <my-tab></my-tab>
    <router-view v-wechat-title="$route.meta.title"/>
  </div>
</template>

<script>
  import MyTab from '@/common/MyTab'
  export default {
    name: 'App',
    components: {
      MyTab,
    }
  }
</script>

<style>
  html{
    background: #f5f5f5;
  }
  body{
    margin: 0;
    padding: 0;
  }
  body::-webkit-scrollbar{
    display: none;
  }
  ul{
    list-style: none;
  }
  #app {
    font-family: '微软雅黑',sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    /*text-align: center;*/
    color: #2c3e50;
    font-size: 0.35rem;
    /*margin-top: 1rem;*/
    box-sizing: border-box;
  }
  .el-message{
    left: 0 !important;
    transform: rotateX(0) !important;
    -webkit-transform: rotateX(0) !important;
    -moz-transform: rotateX(0) !important;
    -ms-transform: rotateX(0) !important;
  }
</style>
