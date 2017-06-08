import React from 'react'
import { Route } from 'react-router'
import Login from './login'
import Register from './register'
import Verify from './verify'

const UserPage = ({ match }) => (
  <div className="row">
    <Route path={`${match.url}/login`} component={Login} />
    <Route path={`${match.url}/register`} component={Register} />
    <Route path={`${match.url}/verify`} component={Verify} />
  </div>
)

export default UserPage
