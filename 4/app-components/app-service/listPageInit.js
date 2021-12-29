export default function(config) {
	if (!config) config = {}
	return {
		data() {
			let data = Object.assign({
				options: {
					is_load_more_ing: false,
					is_show: false,
					page: 1,
					limit: 50
				},
				listData: {
					rows:[]
				},
				on_load_get_data:true

			}, config.data ? config.data() : {});

			if (!data.post) {
				Eapp.ui.alert("请设置post参数");
			} else {
				if (!data.post.api) {
					Eapp.ui.alert("请设置post.api参数");
				}
				if (!data.post.data) {
					Eapp.ui.alert("请设置post.data参数");
				}
			}
			return data;
		},
		watch: {
			post: {
				handler(newValue, oldName) {
					console.log(newValue)
					console.log(oldName)
				 	this.showList();
				},
				immediate: false,
				deep: true

			}
		},
		mounted() {
			 if(config.mounted){
				 config.mounted.bind(this)();
			 }
		},
		onNavigationBarButtonTap() {
			 if(config.onNavigationBarButtonTap){
				 config.onNavigationBarButtonTap.bind(this)();
			 }
		},
		onLoad(options) {
			if (config.onLoad) {
				config.onLoad.bind(this)(options);
			}
			//console.log(this.on_load_get_data)
			if(this.on_load_get_data){
				this.getListData(() => {
					this.show();
					this.options.is_show = true;
				});
			}else{
				this.show();
				this.options.is_show = true;
			}
			
		},
		onReachBottom() {
			console.log("onReachBottom" + this.options.is_load_more_ing)
			if (this.options.is_load_more_ing) {
				return;
			}
			this.options.is_load_more_ing = true;
			this.options.page++
			this.getListData(() => {

			});
		},
		onShow() {

		},
		onPullDownRefresh() {
			console.log("onPullDownRefresh")
			this.options.page = 1;
			this.getListData(() => {
				uni.stopPullDownRefresh();
			});
		},
		methods: Object.assign({
			showList() {

				this.options.page = 1;
				this.getListData(() => {

				});
			},
			getListData(callback) {
				let apido = Eapp.http;
				if (this.options.is_show) apido = apido.loading;
				this.options.is_load_more_ing = true;
				apido.post(this.post.api, Object.assign({
					page: this.options.page,
					limit: this.options.limit
				}, this.post.data), (data) => {
					this.options.is_load_more_ing = false;
					if (!(data.hasOwnProperty("listData")||data.hasOwnProperty("rows"))) {
						Eapp.ui.alert(Eapp.lang.order.err_tip);
					}
				
					if (this.options.page == 1)
						this.listData = data.rows?data.rows:data.listData.rows;
					else {
						this.listData = this.listData.concat(data.rows?data.rows:data.listData.rows)
					}
					if (callback) {
						callback();
					}
					if (config.onGetDat) {
						config.onGetDat.bind(this)(data)
					}
				});
			}
		}, config.methods ? config.methods : {})
	}
}
