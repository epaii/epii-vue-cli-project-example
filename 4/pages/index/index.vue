<template>
	<epii-loading>
	<view class="content">
		 
		<view class="text-area">
			<text class="title">{{title}}</text>
		</view>
		<button    plain    @click="submit"  >alert</button>
	</view>
	</epii-loading>
</template>

<script>
	export default {
		data() {
			return {
				title: '主要功能: \n1、Eapp 的基础实现\n2、页面基础加载epii-loading\n3、软件更新功能\n4、config配置\n 5,自带登录逻辑 \n 6,通过在入口增加 url参数，实现金进入首页后自动跳转'
			}
		},
		onLoad() {
			setTimeout(()=>{
				this.show()	
			},3000)
			
		},
		methods: {
			submit(){
				 Eapp.ui.alert("alert in Eapp")
			}
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
