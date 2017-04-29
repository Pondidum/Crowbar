import React from  'react'
import { Link } from 'react-router-dom'

const LandingPage = () => (
  <div className="row">
    <h1>You're not logged in</h1>
    <ul>
      <li><Link to="/user/login">Login</Link></li>
      <li><Link to="/user/register">Register</Link></li>
    </ul>
  </div>
)

export default LandingPage
