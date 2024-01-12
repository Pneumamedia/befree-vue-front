const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,

  devServer:{
    proxy:{
      '^/storage':{
        target:'http://localhost:8000/storage',
        ws:true,
        changeOrigin:true
      }
    }
  }
})
