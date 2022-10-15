const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  productionSourceMap:false,
  lintOnSave:false,
  devServer:{
    proxy:{
      "/api":{
        target:"https://networkproject-ooqthrslx-xuepeng184.vercel.app"
      },
      
    }
  }
})
