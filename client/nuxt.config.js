const pkg = require('./package')


const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin')

module.exports = {
  ssr: false,

  /*
  ** Headers of the page
  */
  head: {
    title: 'Vue Material Admin Template',
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {
        hid: 'description', name: 'description', content: 'Vue Material Admin Template is a \n' +
          'Google Material Design inspired admin dashboard template built with Vue and Vuetify.'
      }
    ],
    link: [
      {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'},
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons'
      }
    ],
    script: [
      {src: 'https://cdnjs.cloudflare.com/ajax/libs/echarts/4.0.4/echarts-en.min.js'}
    ]
  },

  router: {
    middleware: ['auth']
  },

  /*
  ** Customize the progress-bar color
  */
  loading: {color: '#3adced'},

  /*
  ** Global CSS
  */
  css: [
    '~/assets/style/theme.styl',
    '~/assets/style/app.styl',
    'font-awesome/css/font-awesome.css',
    'roboto-fontface/css/roboto/roboto-fontface.css'
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '@/plugins/vuetify',
    '@/plugins/vee-validate',
    {src: '~/plugins/toast.js', ssr: false},
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/auth',
    // '@nuxtjs/proxy'
  ],


  axios: {
    // proxy: true,
    baseURL: 'http://localhost:5000'
  },
  
  auth: {
    redirect: {
      login: '/login',
      logout: false,
      home: '/dashboard'
    },
    strategies: {
      local: {
        endpoints: {
          login: { url: '/api/auth/login', method: 'post', propertyName: 'data.token' },
          logout: false,
          //user: { url: '/api/auth/user', method: 'get', propertyName: 'user' }
          user: false
        },
      }
    }
  },
  
  // proxy: {
  //   '/api/': { target: 'http://localhost:5000', pathRewrite: {'^/api': ''} }
  // },

  publicRuntimeConfig: {
    axios: {
      browserBaseURL: 'http://localhost:5000'
    }
  },

  privateRuntimeConfig: {
    axios: {
      baseURL: 'http://localhost:5000'
    }
  },

  /*
  ** Build configuration
  */
  build: {
    transpile: ['vuetify/lib', 'vee-validate/dist/rules'],
    plugins: [new VuetifyLoaderPlugin()],
    loaders: {
      stylus: {
        import: ["~assets/style/variables.styl"]
      }
    },

    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {

    }
  }
}
