<template>
  <epii-loading>
    <view class="content">
      <view class="text-area">
        <text class="title">正在模拟登录</text>
      </view>
    </view>
  </epii-loading>
</template>

<script>
export default {
  data() {
    return {
      title: "",
    };
  },
  onLoad() {
    setTimeout(() => {
      this.show();
    }, 10);
    setTimeout(() => {
      let token = "asdfasdfasdf";
      Eapp.localData.set("token", token);
      Eapp.http.setBaseData({
        token: token,
      });
      Eapp.window.replace(Eapp.config.root_page);
    }, 2000);
  },
  methods: {
    submit() {
      Eapp.ui.alert("alert in Eapp");
    },
  },
};
</script>

<style>
</style>
