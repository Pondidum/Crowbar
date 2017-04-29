import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import createHistory from 'history/createHashHistory'
import store from './store'
import App from './base/app'

const history = createHistory()

render(
  <Provider store={store}>
    <App history={history} />
  </Provider>,
  document.getElementById('root'));
