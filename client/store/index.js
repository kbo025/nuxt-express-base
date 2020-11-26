const cookieparser = process.server ? require('cookieparser') : undefined

export const state = () => ({
  drawer: true,
  auth: null
})

export const mutations = {
  toggleDrawer(state) {
    state.drawer = !state.drawer
  },

  drawer(state, val) {
    state.drawer = val
  },

  setAuth (state, auth) {
    state.auth = auth
  },

  isAuthenticated(state) {
    return state.auth.loggedIn
  },

  loggedInUser(state) {
    return state.auth.user
  }
}

export const actions = {
  nuxtServerInit ({ commit }, { req }) {
    let auth = null
    if (req.headers.cookie) {
      const parsed = cookieparser.parse(req.headers.cookie)
      try {
        auth = JSON.parse(parsed.auth)
      } catch (err) {
        // No valid cookie found
      }
    }
    commit('setAuth', auth)
  }
}
