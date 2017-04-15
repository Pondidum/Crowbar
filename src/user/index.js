import React from 'react'
import { Route } from 'react-router'
import Login from './login'

const UserPage = ({ match }) => (
  <div className="row">
    <Route path={`${match.url}/login`} component={Login} />
  </div>
)

export default UserPage
