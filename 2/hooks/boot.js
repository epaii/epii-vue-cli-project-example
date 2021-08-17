
import packagejson from '../package.json'
import '../app.css'

export default async (app) => {


    Eapp.initialize({
        vue: app
    });


    Eapp.config = APP_CONFIG;

    async function load(key) {
        return new Promise(ok => {
            import("../node_modules/" + key + "/" + key.replace("vue-ui-", "") + ".vue").then(m => {
                app.component(key.replace("vue-ui-", ""), m.default);
                ok();
            });
        });
    }
    for (let key in packagejson.dependencies) {
        if (key.indexOf("epii-vue-ui-") === 0) {
            await load(key);
        }
    }


    if (Eapp.config && Eapp.config.hasOwnProperty("api_url_base")) {
        Eapp.http.setApiBase(Eapp.config.api_url_base)
    }

    if (Eapp.localData.get("token")) {
        Eapp.http.setBaseData({
            token: Eapp.localData.get("token"),
        });
    }

    app.config.globalProperties.api={};
    app.config.globalProperties.show = function () {

        let djs = setInterval(() => {
            if (this.epii_loading) {
                clearInterval(djs)
                this.epii_loading.show()
            }
        }, 10);
    }
    app.config.globalProperties.loading = function () {
        let djs = setInterval(() => {
            if (this.epii_loading) {
                clearInterval(djs)
                this.epii_loading.loading()
            }
        }, 10);
    }

}