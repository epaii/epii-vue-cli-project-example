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
				let  data = {token : "asdfasdfasdf"};
				this.onlogin(data);
			}, 2000);
		},
		methods: {
			 
			onlogin(data) {
				Eapp.localData.set("token", data.token);
				Eapp.http.setBaseData({
					token: data.token,
				});
				if (Eapp.localData.get("login_goto_url")) {
					Eapp.window.replace(Eapp.localData.get("login_goto_url"));
					Eapp.localData.remove('login_goto_url')
				} else
					Eapp.window.replace(Eapp.config.root_page);
			}
		},
	};
</script>

<style>
</style>
