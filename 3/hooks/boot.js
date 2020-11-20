import Vue  from "vue";
import yitiji_ui from 'eapp-vue-yitiji'
import packagejson from '../package.json'
import   '../app.css'
export default  async ()=>{
    Eapp.initialize({
        vue: Vue
    });
 
    yitiji_ui(Eapp);
    Eapp.config = APP_CONFIG;
    async function load(key) {
        return new Promise(ok => {
            import("../node_modules/" + key + "/" + key.replace("vue-ui-", "") + ".vue").then(m => {
                Vue.component(key.replace("vue-ui-", ""), m.default);
                ok();
            });
        });
    }
    for (let key in packagejson.dependencies) {
        if (key.indexOf("epii-vue-ui-") === 0) {
            await load(key);
        }
    }
  
   if (Eapp.config&& Eapp.config.hasOwnProperty("api_url_base")) {
       Eapp.http.setApiBase(Eapp.config.api_url_base)
       
   }

   if (Eapp.localData.get("token")) {
       Eapp.http.setBaseData({
           token: Eapp.localData.get("token"),
       });
   }
   Vue.prototype.show = function() {
       let djs = setInterval(() => {
           if (this.$children.length > 0) {
               clearInterval(djs)
               if (this.$children[0] && this.$children[0]["show"] && (typeof this.$children[0]["show"] === "function")) {
                   this.$children[0].show()
               }
           }
       }, 10);
   }
   Vue.prototype.loading = function() {
       if (this.$children[0] && this.$children[0]["loading"] && (typeof this.$children[0]["loading"] === "function")) {
           this.$children[0].loading()
       }
   }
}