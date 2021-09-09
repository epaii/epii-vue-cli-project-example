
import packagejson from '../package.json'
import '../app.css'
import JsBridge from 'web-run-local'
import yitiji_ui from 'eapp-vue-yitiji'
window.JsBridge = JsBridge


if (!APP_CONFIG.in_yitiji) {
  
    JsBridge.test('IDCard', 'getIdcardInfo', function (data, callback) {
        callback({
            code: '0',
            name: '王'+parseInt(100*Math.random()),
            sex: '男',
            nation: '汉',
            birth: '1988-12-14',
            address: '河北省石家庄市平山县平山镇洪子店村一片34号',
            idcard: '13013119881214003X',
            jigou: '元氏县公安局',
            starttime: '2015.03.04',
            endtime: '2035.03.04',
            newaddress: '无',
            imagepath:'/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/2wBDAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/wAARCAIVAZADASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAn/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAn/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCO4CS6G4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/9k==',
        })
    })

    JsBridge.test('IDCard', 'isHaveIdcard', {
        code: '0',
        msg: '身份证存在请继续',
    })
    JsBridge.test('system', "getRootConfig", {
        ytj_id: 7,
    })

}


export default async (app) => {


    Eapp.initialize({
        vue: app
    });

    yitiji_ui(Eapp);
    Eapp.config = APP_CONFIG;

    let js_brige_ws = 'ws://127.0.0.1:8866/epii'
    if (APP_CONFIG.hasOwnProperty('JsBridgeWs')) {
        js_brige_ws = APP_CONFIG.JsBridgeWs
    }


    await new Promise((ok, err) => {
        JsBridge.start(js_brige_ws, function () {
            JsBridge.require('system').getRootConfig({}, function (data) {
                Eapp.config.device_info = data;
                ok();
            })

        })
    })

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

 
    app.config.globalProperties.$JsBridge = JsBridge
}






 