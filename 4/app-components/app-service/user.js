export default {
	onLogin(res, tourl) {
		Eapp.localData.set('token', res.token);
		if (Eapp.localData.get("token")) {
			Eapp.http.setBaseData({
				token: Eapp.localData.get("token"),
			});
		}
		
 
		Eapp.ui.toast.success(Eapp.lang.login.login_success);
		if (tourl) {
			Eapp.window.replace(tourl);
		} else {
			Eapp.services.window.reLaunch();
		}
	},
	__onLogout() {
		Eapp.localData.remove('token');
		Eapp.services.window.reLaunch()
	},
	onLogout() {
		Eapp.ui.confirm(Eapp.lang.login.logout_sure, () => {

			// #ifdef APP-PLUS
			if (Eapp.services.runtime.cid) {
				Eapp.http.loading.post("push_notice@unbind", {
					token: Eapp.localData.get("token"),
					cid: Eapp.services.runtime.cid
				}, () => {
					this.__onLogout();
				},()=>{
					this.__onLogout();
				});
			} else {
				this.__onLogout();
			}


			// #endif

			// #ifdef H5
			this.__onLogout();
			// #endif

		})

	}


}
