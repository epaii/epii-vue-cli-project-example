import Vue from "vue";
import configBase from '../config/config.base'
import configDev from '../config/config.development'
import configPro from '../config/config.production'


// #ifdef APP-PLUS
import push from 'epii-uni-push'
import eapp_push_init from 'epii-uni-push/eapp-handler'
// #endif
export default {
	install() {
		 
		Eapp.initialize();
		if (process.env.NODE_ENV === 'development') {
			Eapp.config = Object.assign(configBase, configDev);
		} else {
			Eapp.config = Object.assign(configBase, configPro);
		}
		// #ifdef APP-PLUS
		push.init();
		eapp_push_init();
		// #endif
		Eapp.window.listener.beforIn = function (url, next) {
			let url1 = url.split("?")[0];
			let checkgoto = function(){
				if(url1 === Eapp.config.root_page)
				{
					let _goto_url = Eapp.localData.get('_goto_url');
					if (_goto_url) {
						setTimeout(() => {
							Eapp.localData.remove('_goto_url')
							Eapp.window.replace(_goto_url)
						}, 1000)
					
					}
				}
				
			}
			if (Eapp.config.no_login_pages.indexOf(url1) > -1) {
				next();
				checkgoto();
				return;
			}
			if ((!Eapp.localData.get('token')) || Eapp.localData.get('token') == '') {
				Eapp.localData.set('login_goto_url',url)
				Eapp.window.replace(Eapp.config.login_page);
			} else {
				next()
				checkgoto();
			}
		}

		if (Eapp.config && Eapp.config.hasOwnProperty("api_url_base")) {
			Eapp.http.setApiBase(Eapp.config.api_url_base)
			Eapp.uploader.setUploadApi(Eapp.config.api_url_base + Eapp.config.upload_uri)
		}
		let uinfo = uni.getSystemInfoSync();
		Eapp.http.setBaseData({
			__platform: uinfo.platform,
			__version:Eapp.config.version?Eapp.config.version:0
		});
		if (Eapp.localData.get("token")) {
			Eapp.http.setBaseData({
				token: Eapp.localData.get("token"),
			});
		}
		Vue.mixin({
			data: function () {
				return {
					api: {}
				}
			}
		});
		let page_show = function (obj) {
			let djs = setInterval(() => {
				if (obj.$children.length > 0) {
					clearInterval(djs)
					if (obj.$children[0] && obj.$children[0]["show"] && (typeof obj.$children[0]["show"] === "function")) {
						obj.$children[0].show()
					}
				}
			}, 10);
		}
		let page_loading = function(obj){
			if (obj.$children[0] && obj.$children[0]["loading"] && (typeof obj.$children[0]["loading"] === "function")) {
				obj.$children[0].loading()
			}
		}
		Vue.prototype.show = function () {
			 page_show(this)
		}
		Vue.prototype.loading = function () {
			page_loading(this)
		}
		Eapp.window.show = page_show;
		Eapp.window.loading = page_loading;
	}
}
