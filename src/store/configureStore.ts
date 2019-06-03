import configureStoreDev from './configureStore.dev'
import configureStoreProd from './configureStore.prod'
import { providerInitState, ProviderReducer } from '../provider/reducer'
import _ from 'lodash'
import { clientInitState } from '../client/reducer'

const selectedConfigureStore = process.env.NODE_ENV === 'production' ? configureStoreProd : configureStoreDev

export const { configureStore } = selectedConfigureStore

export const { history } = selectedConfigureStore

export const initState = (id: string = 'default') => {
  let initState = {
    provider: providerInitState,
    client: clientInitState
  }
  console.log('*initState', { ...initState })
  try {
    const data = localStorage.getItem(`myst-${id}`)
    initState = _.defaultsDeep(data && JSON.parse(data), initState)
  } catch (e) {
    console.error(e)
  }

  console.log('*initState', { ...initState })
  return initState
}

export const saveState = (state: { provider: ProviderReducer }, id: string = 'default') => {
  try {
    const initialState = {
      provider: {
        residentialConfirm: _.get(state, 'provider.residentialConfirm'),
        identity: _.get(state, 'provider.identity'),
        originalLocation: _.get(state, 'provider.originalLocation'),
        trafficOption: _.get(state, 'provider.trafficOption')
      },
      client: {}
    }

    localStorage.setItem(`myst-${id}`, JSON.stringify(initialState))
  } catch (e) {
    console.error(e)
  }
}
