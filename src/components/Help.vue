<template>
  <div class="help">
      <div class="top">
        <img src="../assets/book.jpg" alt="">
      </div>
    <div class="main">
      <ul>
        <p class="usertype">我是用户</p>
        <li>
          <p class="title">1.1 如何借还书籍？</p>
          <p class="info">
            打开图书馆应用的扫一扫功能，扫描图书ISBN条形码即可借书；进入图书馆应用主页可查看当前借阅书籍，还书需将要还的书籍交给管理员，经管理员确认后方可还书成功。
          </p>
        </li>
        <li>
          <p class="title">1.2 图书归还提醒？</p>
          <p class="info">
            借阅期限是由图书管理员设置，图书在到期前3天，每天会提醒借阅人。
          </p>
        <li>
          <p class="title">1.3 如果查找我想要的书籍？</p>
          <p class="info">
            在首页进入“书架”列表，输入需要查询的书名，可查询书籍是否在库。
          </p>
        </li>
      </ul>
      <ul style="margin-bottom: 1.5rem">
        <p class="usertype">我是管理员</p>
        <li>
          <p class="title">2.1 如何管理书籍？</p>
          <p class="info">
              管理员可登录后台管理系统去设置图书分类、还书审核等功能去管理图书。
          </p>
        </li>
        <li>
          <p class="title">2.2 如何将图书入库？</p>
          <p class="info">
            管理员点击“设置”--“图书入库”，扫描图书后面的ISBN条形码，回显书名及ISBN条形码，确认无误后，保存即可。可最多将10本图书同时入库。
          </p>
        <li>
          <p class="title">2.3 图书入库时，系统无法扫描出条形码，怎么办？</p>
          <p class="info">
            如果系统无法扫描出条形码，可以进入后台管理系统将书名、条形码数字及图书信息通过手工输入方式录入。
          </p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Help"
  }
</script>

<style scoped>
  .help{
    width: 100%;
    background: #f7f7f7;
  }
  .help .top img{
    width: 100%;
    height: auto;
  }
  .help .main ul{
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    background: #fff;
    border-top: 1px solid #e3e3e3;
    border-bottom: 1px solid #e3e3e3;
    padding: 0 0.5rem;
  }
  .help .main ul .usertype{
    font-size: .48rem;
    color: #454545;
  }
  .help .main ul li .title{
    font-size: .38rem;
    color: #454545;
    margin: 0;
    padding: 0;
  }
  .help .main ul li .info{
    font-size: .38rem;
    color: #9b9b9b;
    line-height: .6rem;
    margin: 0.2rem 0 0.5rem 0;
    padding: 0;
  }
</style>
