
import packagejson from '../package.json'
import '../app.css'
import { autoRegisterComponent } from "epii-xx-auto-register-component";

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

    const ctx = require.context('../app-components/app-service', true, /\.js$/);
    Eapp.services = {};

    ctx.keys().forEach(key => {
        const keyArr = key.split('/')
        keyArr.shift()
        Eapp.services[keyArr.join('.').replace(/\.js$/g, '')] = ctx(key).default

    });

    autoRegisterComponent(app, require.context('../app-components/app-ui', true, /\.vue$/), "app-ui");
    autoRegisterComponent(app, require.context('../app-components/app-module', true, /\.vue$/), "app-m");
    autoRegisterComponent(app, require.context('../app-components/app-page', true, /\.vue$/), "app-page");

    if (Eapp.config && Eapp.config.hasOwnProperty("api_url_base")) {
        Eapp.http.setApiBase(Eapp.config.api_url_base)
    }

    if (Eapp.localData.get("token")) {
        Eapp.http.setBaseData({
            token: Eapp.localData.get("token"),
        });
    }

    app.config.globalProperties.api = {};
    app.config.globalProperties.$app = app;

    app.config.globalProperties.show = function () {

        this.$nextTick(() => {
            if (!this.epii_loading) {
                let hasObjct = this;
                while (true) {
                    if (hasObjct.epii_loading) {
                        this.epii_loading = hasObjct.epii_loading;
                        break;
                    }
                    if (hasObjct.$parent) {
                        hasObjct = hasObjct.$parent

                    } else {
                        break;
                    }
                }

            }

            if (this.epii_loading) {
                setTimeout(() => {
                    this.epii_loading.show()
                }, 1500);

            }
        })
    }
    app.config.globalProperties.loading = function () {

        this.$nextTick(() => {
            if (!this.epii_loading) {
                let hasObjct = this;
                while (true) {
                    if (hasObjct.epii_loading) {
                        this.epii_loading = hasObjct.epii_loading;
                        break;
                    }
                    if (hasObjct.$parent) {
                        hasObjct = hasObjct.$parent
                    } else {
                        break;
                    }
                }

            }

            if (this.epii_loading) {
                this.epii_loading.loading()
            }
        })
    }

    app.config.globalProperties.$go = Eapp.window.open;

}