import React from 'react'
import { render } from 'react-dom'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import createHistory from 'history/createHashHistory'

import messageReducers from './messages/reducers'
import channelsReducers from './channels/reducers'
import App from './base/app'

const history = createHistory()
const reducers = combineReducers({
  channels: channelsReducers,
  messages: messageReducers
})


const store = createStore(
  reducers,
  // eslint-disable-next-line no-underscore-dangle
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

render(
  <Provider store={store}>
    <App history={history} />
  </Provider>,
  document.getElementById('root'));
