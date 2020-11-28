<template>
	<epii-loading></epii-loading>
</template>

<script>
	export default {
		data() {
			return {};
		},
		onLoad() {

			if (Eapp.window.params("url")) {
				Eapp.localData.set("_goto_url", Eapp.window.params("url"));
			}
			Eapp.window.replace(Eapp.config.root_page);
		},
		methods: {},
	};
</script>

<style>
</style>
