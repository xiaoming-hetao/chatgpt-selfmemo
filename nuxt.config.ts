// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: '情绪窝',
      link: [
        { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css' }
      ]
    },
  },
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
