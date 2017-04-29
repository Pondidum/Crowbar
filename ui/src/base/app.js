import React from 'react'
import { Router, Route } from 'react-router'
import { connect } from 'react-redux'

import LandingPage from './landing'
import ChatApp from './chatApp'
import UserPage from '../user'

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.cognito.user,
    ...ownProps
  }
}

const App = ({ history, user }) => (
  <Router history={history}>
    <div>
      <Route path="/" component={true ? ChatApp : LandingPage} />
      <Route path="/user" component={UserPage} />
    </div>
  </Router>
)

export default connect(mapStateToProps)(App)
