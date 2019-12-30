import NODE from '../api'

const actions = {
  SESSION_CHALLENGE: ({ commit }) => {
    NODE.get('/api/session_challenge')
      .then(() => {
        commit('IS_AUTHED', true)
      })
      .catch(() => {
        commit('IS_AUTHED', false)
      })
  },
}

export default actions
