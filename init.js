module.exports = async function(copy,fs,readline){
    console.log(
        "请选择项目模板\n" +
        "1、epii-vue 项目\n" +
        "2、epii-vue 带Eapp 项目\n" +
        "3、epii-vue 带一体机版本的Eapp 项目\n" +
        "4、uniapp 带Eapp 项目"
      );
      let leixing = await readline();
  
      if ((leixing == 1 || leixing == 2 || leixing == 3)) {
  
        copy(__dirname + "/1", process.cwd());
        if (leixing == 2 || leixing == 3) {
          setTimeout(() => {
            let pdata = JSON.parse(fs.readFileSync(process.cwd() + "/package.json"));
            pdata.dependencies["eapp-h5-plus-vue"] = ">=1.0.0";
            pdata.dependencies["epii-vue-ui-loading"]=">=0.0.3";
            copy(__dirname + "/2", process.cwd())
            if (leixing == 3) {
              pdata.dependencies["eapp-vue-yitiji"] = "latest";
              copy(__dirname + "/3", process.cwd())
            }
  
            fs.writeFileSync(process.cwd() + "/package.json", JSON.stringify(pdata))
            console.log("Init Success，Get started with the following commands:\n  npm install")
          }, 1000);
  
        }
      } else if (leixing == 4) {
        copy(__dirname + "/4", process.cwd());
        console.log("Init Success，It is need run \n npm install \n open this dir from hbuilderx")
      }
}