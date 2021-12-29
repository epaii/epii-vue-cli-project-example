export default {
	getStatusbarHeight() {
		// #ifdef APP-PLUS
		return plus.navigator.getStatusbarHeight();
		// #endif
		// #ifdef H5
		return 0;
		// #endif
	},
	reLaunch(){
		Eapp.window.reLaunch("/pages/root")
	}
}
