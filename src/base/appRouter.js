import React from 'react'
import { Route, Router } from 'react-router'

import App from './app'

const AppRouter = ({ history }) => (
  <Router history={history}>
    <Route exact path="/" component={App} />
  </Router>
)

export default AppRouter
