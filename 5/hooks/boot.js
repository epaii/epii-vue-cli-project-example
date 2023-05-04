import xxAdmin from 'epii-xx-admin'
import { proxy } from "epii-xx-admin";
import { onCreateApp } from 'epii-vue3-create-app';
import '../app.css'
import routes from "../runtime/spa_router";
//测试使用，正式需要删除
import test from '../src/pages/test/test.js';

export default async (app) => {
    proxy.pages.installRoutes(routes)
    app.use(test);
    
    let onCreateAppFunction = async function (app) {
        await xxAdmin.install(app);
        // app.use(xxAdmin)
        //测试工程
        // app.use(test);

        app.config.globalProperties.$xxAdmin = proxy;


        app.config.globalProperties.api = {};
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
   await onCreateAppFunction(app);
    onCreateApp(onCreateAppFunction);


}