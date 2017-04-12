import React from 'react'
import { Link, Route } from 'react-router-dom'

const ChannelLink = ({ to, children }) => (
  <Route path={to} children={({ match }) => (
    <li className={match ? 'active' : ''}><Link to={to}>{children}</Link></li>
  )}/>
)

export default ChannelLink
