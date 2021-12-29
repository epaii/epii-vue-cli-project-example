import Vue from "vue";
import configBase from '../config/config.base'
import configDev from '../config/config.development.example'
import configPro from '../config/config.production'


// #ifdef APP-PLUS
import push from 'epii-uni-push'
import eapp_push_init from 'epii-uni-push/eapp-handler'
// #endif
export default {
	async install() {

		Eapp.initialize();
		if (process.env.NODE_ENV === 'development') {
			Eapp.config = Object.assign(configBase, configDev);
		} else {
			Eapp.config = Object.assign(configBase, configPro);
		}


		const ctx = require.context('../app-components/app-service', true, /\.js$/);
		Eapp.services = {};
		Eapp.user = {};
		ctx.keys().forEach(key => {
			const keyArr = key.split('/')
			keyArr.shift() // 移除.
			//console.log(keyArr.join('.').replace(/\.js$/g, ''))
			Eapp.services[keyArr.join('.').replace(/\.js$/g, '')] = ctx(key).default

		});
		Eapp.user.onTokenExpired = function () {
			Eapp.ui.alert("登录信息已过期，请重新登录", () => {
				Eapp.services.user.__onLogout();
			})

		}
		Eapp.http.setDataHander(function (data) {
			if (data.hasOwnProperty("__wrap__")) {
				let info = data.__wrap__;
				if (info.type && info.type == "sendEvent") {
					if (info.eventName && (info.eventName.length > 0)) {
						Eapp.event.emit(info.eventName, {});
					}
					if (info.eventNames && (info.eventNames.length > 0)) {
						info.eventNames.forEach(name => {
							Eapp.event.emit(name, {});
						})
					}

				}
				return data.data;
			} else {
				return data;
			}
		});



		Eapp.window.listener.beforIn = function (url, next) {
			let url1 = url.split("?")[0];
			let checkgoto = function () {
				if (url1 === Eapp.config.root_page) {
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
				Eapp.localData.set('login_goto_url', url)
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
			__version: Eapp.config.version ? Eapp.config.version : 0
		});
		if (Eapp.localData.get("token")) {
			Eapp.http.setBaseData({
				token: Eapp.localData.get("token"),
			});
		}


		// #ifdef APP-PLUS

		push.init();
		push.clear();
		eapp_push_init();
		// 这个是任总的
		push.getCid((cid) => {
			console.log("cid:" + cid)
			Eapp.services.runtime.cid = cid;
			if (cid.length > 3) {
				Eapp.localData.set('cid', cid)
				let bindtouser = function () {
					if (Eapp.localData.get("token")) {
						Eapp.http.post("push_notice@bind", {
							token: Eapp.localData.get("token"),
							cid: cid
						});
					} else {
						setTimeout(bindtouser, 1000)
					}
				}
				setTimeout(bindtouser, 1000)

			}
		});



		push.setHandler("event", (e) => {
			Eapp.event.emit(e.args.name, {});
		});

		 
		// #endif





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
		let page_loading = function (obj) {
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
		Vue.prototype.go = Eapp.window.open;
		Vue.prototype.gogo = Eapp.window.open;
		Vue.prototype.eapp = Eapp;
		Vue.prototype.vuex = Eapp.services.runtime;

		if (process.env.NODE_ENV === 'development') {
			const ctxconfig = require.context('../lang/', true, /\.json$/);
			let lang={};
			ctxconfig.keys().forEach(key => {
				lang = Object.assign(lang,ctxconfig(key));
			});
			Vue.prototype.$lang =lang;
			Eapp.lang = lang;
		} else {
			Eapp.config.server_config =  await Eapp.http.post("config@index", {})
			if(Eapp.config.server_config.hasOwnProperty("lang")){
				Vue.prototype.$lang = JSON.parse(Eapp.config.server_config.lang);
				Eapp.lang = Vue.prototype.$lang;
			}
		}
	}
}