import React from 'react'
import { render } from 'react-dom'

import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'

import createHistory from 'history/createHashHistory'
import { Route } from 'react-router'

import { ConnectedRouter, routerMiddleware } from 'react-router-redux'
import { apiMiddleware } from 'redux-api-middleware'

import ChatApp from './base/chatApp'
import LandingPage from './base/landing'
import UserPage from './user'
import reducers from './reducers'

import { listAllChannels } from './channels/actions'

const history = createHistory()
const middleware = routerMiddleware(history)

const createSToreWithMiddleware = applyMiddleware(apiMiddleware, middleware)(
  createStore
)

const store = createSToreWithMiddleware(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

store.dispatch(listAllChannels())

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div>
        <Route path="/" exact component={LandingPage} />
        <Route path="/chat/:channel?" component={ChatApp} />
        <Route path="/user" component={UserPage} />
      </div>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
)
