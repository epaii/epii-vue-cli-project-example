<template>
  <button @click="openintab">在tab中打开页面</button>
  <button @click="openindialog">在dialog中打开页面</button>
  <button @click="openindialog1">在dialog中打开自己</button>
</template>

<script>
import { proxy } from "epii-xx-admin";
import page1Vue from "./page1.vue";
import page2Vue from "./page2.vue";
import pageTest from "./page_test.vue";
export default {
  methods: {
    openintab() {
      proxy.tabs.add(page1Vue, {}, { title: "测试页面1" });
    },
    openindialog() {
      proxy.dialog.show(page2Vue, {}, { title: "测试页面2" });
    },
    openindialog1() {
      proxy.dialog.show(pageTest, {}, { title: "测试页面2" });
    },
  },
};
</script>

<style>
</style>