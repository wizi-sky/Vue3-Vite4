<template>
  <div class="home-page">主页123</div>
  <div>
    <img class="icon" src="@/assets/images/icob.jpg" alt="测试图片">
  </div>
</template>

<script setup>
import { useMain } from "@/stores/mian.js";
console.log(useMain, "useMain"); // store导出函数
const mianStore = useMain(); // 调用创建store

console.log(mianStore, "mainStore"); // store对象 reactive包裹得可直接使用
console.log(mianStore.name, "pinia数据"); // 使用
</script> 

<style lang="scss" scoped>
.home-page{
  font-family: font_DIN;
}
.icon{
  width: 100%;
}
</style>
