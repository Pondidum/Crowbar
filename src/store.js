import { createStore, combineReducers } from 'redux'

import messageReducers from './messages/reducers'
import channelsReducers from './channels/reducers'
import { reducer as cognito } from './cognito/user'

const reducers = combineReducers({
  channels: channelsReducers,
  messages: messageReducers,
  cognito
})

const store = createStore(
  reducers,
  // eslint-disable-next-line no-underscore-dangle
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

export default store
