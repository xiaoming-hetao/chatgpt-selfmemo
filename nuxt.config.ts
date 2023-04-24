// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: '情绪窝',
      link: [
        {
          rel: 'stylesheet',
          href: 'https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css',
        },
      ],
    },
  },
  css: [
    'element-plus/dist/index.css',
    '~/assets/style/global.less',
    '~/assets/icon/iconfont.css',
  ],
  modules: ['@pinia/nuxt', '@element-plus/nuxt'],
  buildModules: ['@nuxtjs/pwa'],
  proxy: {
    '/api': {
      target: 'http://localhost:3000',
      pathRewrite: { '^/api': '' },
    },
  },
  pwa: {
    meta: {
      title: '情绪窝',
      author: 'xiaoming-hetao',
    },
    manifest: {
      name: '情绪窝',
      short_name: '情绪窝',
      display: 'standalone',
      start_url: './pages/hollow/index.vue',
      useWebmanifestExtension: false,
      description:
        '一个智能的树洞，记录心情，支持以特定的角色发送心情给 AI，AI 会以设定的角色回复你，这个角色可以是朋友、家人、恋人等等',
    },
    icon: {
      source: '~/static/desktop.png',
      fileName: 'desktop.png',
    },
  },
})
