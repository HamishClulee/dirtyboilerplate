import { State } from './state'

const getters = {
  windowwidth: (state: State) => state.windowwidth,
  isauthed: (state: State) => state.isauthed,
}

export default getters
