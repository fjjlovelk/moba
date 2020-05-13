<template>
  <div>
    <div class="topbar bg-black-1 py-2 px-3 d-flex ai-center">
      <img src="../assets/images/logo.png" height="30" />
      <div class="px-3 flex-1">
        <div class="text-white">王者荣耀</div>
        <div class="text-black-4 fs-xs">团队成就更多</div>
      </div>
      <button class="bg-primary">立即下载</button>
    </div>
    <div class="bg-primary py-2 text-white">
      <div class="nav nav-reverse jc-around">
        <div class="nav-item active">
          <router-link tag="div" to="/">首页</router-link>
        </div>
        <div class="nav-item">
          <router-link tag="div" to="/">攻略中心</router-link>
        </div>
        <div class="nav-item">
          <router-link tag="div" to="/">赛事中心</router-link>
        </div>
      </div>
    </div>
    <router-view />
  </div>
</template>

<script>
export default {}
</script>
