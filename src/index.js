import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import createHistory from 'history/createHashHistory'

import channelsReducers from './channels/reducers'
import AppRouter from './base/appRouter'

const history = createHistory()
const store = createStore(channelsReducers)

render(
  <Provider store={store}>
    <AppRouter history={history} />
  </Provider>,
  document.getElementById('root'));
