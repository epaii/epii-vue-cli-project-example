import Vue from 'vue'
import App from './App'
import  epii from './epii/index.js'


// #ifdef APP-PLUS
if(plus.android.runtimeMainActivity){
	let main = plus.android.runtimeMainActivity();
	//为了防止快速点按返回键导致程序退出重写quit方法改为隐藏至后台  
	plus.runtime.quit = function() {
	    main.moveTaskToBack(false);
	};
	//重写toast方法如果内容为 ‘再次返回退出应用’ 就隐藏应用，其他正常toast 
	plus.nativeUI.toast = (function(str) {
	    if (str =='再次返回退出应用') {
	        plus.runtime.quit();
	    } else {
	        uni.showToast({
	            title: '再次返回退出应用',
	            icon: 'none'
	        })
	    }
	});
}

// #endif


Vue.config.productionTip = false
 
App.mpType = 'app'


let runapp = async ()=>{
	await epii.install();
	const app = new Vue({
		...App
	})
	
	
	
	app.$mount()
	Vue.__app = app;
}
runapp();
