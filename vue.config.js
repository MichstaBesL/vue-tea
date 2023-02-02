const path = require("path");
function resolve(dir) {
  return path.join(__dirname, dir);
}
 
module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',  // 后台接口地址
        ws: true,        //如果要代理 websockets，配置这个参数
        secure: false,  // 如果是https接口，需要配置这个参数
        changeOrigin: true,  //是否跨域
        pathRewrite: {    // 重写路径
          '^/api': '/api'
        }
      }
    }
  },
  chainWebpack: config => {
    config.resolve.alias
     .set("@", resolve("src"))
     .set("@assets", resolve("src/assets"))
     .set("@components", resolve("src/components"))
     .set("@base", resolve("baseConfig"))
     .set("@public", resolve("public"));
  },
}