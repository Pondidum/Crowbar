import React from 'react'
import { Router, Route, Redirect } from 'react-router'
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
      <Route path="/chat" render={() => (
        user ? (<ChatApp />) : (<Redirect to="/" />)
      )} />
      <Route exact path="/" component={LandingPage} />
      <Route path="/user" component={UserPage} />
    </div>
  </Router>
)

export default connect(mapStateToProps)(App)
