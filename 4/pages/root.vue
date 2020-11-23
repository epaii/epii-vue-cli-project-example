<template>
  <epii-loading> </epii-loading>
</template>

<script>
export default {
  data() {
    return {};
  },
  onLoad() {
    if (this.$route.query.url) {
      Eapp.localData.set("_goto_url", this.$route.query.url);
    }
    Eapp.window.open(Eapp.window.config.root_page);
  },
  methods: {},
};
</script>

<style>
</style>
