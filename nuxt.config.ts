// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: [
    'element-plus/dist/index.css',
    '~/assets/style/global.less',
    '~/assets/icon/iconfont.css',
  ],
  modules: ['@pinia/nuxt', '@element-plus/nuxt'],
  proxy: {
    '/api': {
      target: 'http://localhost:3000',
      pathRewrite: { '^/api': '' },
    },
  },
})
