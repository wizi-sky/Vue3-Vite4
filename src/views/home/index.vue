<template>
  <div class="home-page">主页</div>
</template>

<script setup>
import { useMain } from "@/stores/mian.js";
console.log(useMain, "useMain"); // store导出函数
const mianStore = useMain(); // 调用创建store

console.log(mianStore, "mainStore"); // store对象 reactive包裹得可直接使用
console.log(mianStore.name, "pinia数据"); // 使用
</script> 

<style lang="scss" scoped></style>
