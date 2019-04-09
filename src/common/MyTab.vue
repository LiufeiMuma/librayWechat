<template>
  <div class="footer-navigation">
    <router-link :to="{name:'SelfBooks'}">
      <a class="item">
        <i class="ico home-ico"></i>
        <span>我的借阅</span>
      </a>
    </router-link>
    <router-link :to="{name:'BookShelf'}">
      <a class="item">
        <i class="ico bookrack-ico"></i>
        <span>书架</span>
      </a>
    </router-link>
    <router-link :to="{name:'Setting'}">
      <a class="item">
        <i class="ico setting-ico"></i>
        <span>设置</span>
      </a>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "MyTab"
}
</script>

<style scoped>
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
  .ico.home-ico {
    width: .6rem;
    height: .59rem;
    background-image: url('../assets/my-loan.png')
  }

  .ico.home-ico.active {
    background-image: url('../assets/my-loan-active.png')
  }

  .ico.bookrack-ico {
    width: .6rem;
    height: .6rem;
    background-image: url('../assets/bookrack.png')
  }

  .ico.setting-ico {
    width: .59rem;
    height: .59rem;
    background-image: url('../assets/setting.png')
  }

  .ico.bookrack-ico.active {
    background-image: url('../assets/bookrack-active.png')
  }
  .ico.trophy-alt-ico {
    width: .75rem;
    height: .75rem;
    background-size: .6rem auto;
    background-image: url('../assets/trophy-alt.png')
  }
  .footer-navigation {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 1.4rem;
    box-shadow: 0 -1px .05rem 1px rgba(226, 226, 226, .16), inset 0 1px 0 0 #e6e6e6;
    font-size: 0;
    background-color: #fff;
    padding-bottom: constant(safe-area-inset-bottom);
    padding-bottom: env(safe-area-inset-bottom);
  }

  .footer-navigation a {
    float: left;
    width: 33.333%;
    text-align: center;
    font-size: 0;
    padding-top: .1rem;
    cursor: pointer
  }
  .footer-navigation a .item{
    width: 100%;
  }
  .footer-navigation a.active span {
    color: #2f7dcd
  }

  .footer-navigation a span {
    display: inline-block;
    margin-top: .08rem;
    width: 100%;
    color: #8a8a8a;
    font-size: .34rem;
    line-height: .45rem
  }

  .footer-navigation .router-link-exact-active a span{
    color: #2f7dcd
  }
  .footer-navigation .router-link-exact-active:first-child .ico.home-ico{
    background-image: url('../assets/my-loan-active.png')
  }
  .footer-navigation .router-link-exact-active:nth-child(2) .ico.bookrack-ico{
    background-image: url('../assets/bookrack-active.png')
  }
  .footer-navigation .router-link-exact-active:nth-child(3) .ico.setting-ico{
    background-image: url('../assets/setting-active.png')
  }

</style>
