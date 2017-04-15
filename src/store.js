import { createStore, combineReducers } from 'redux'

import messageReducers from './messages/reducers'
import channelsReducers from './channels/reducers'

const reducers = combineReducers({
  channels: channelsReducers,
  messages: messageReducers
})

const store = createStore(
  reducers,
  // eslint-disable-next-line no-underscore-dangle
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())


export default store
