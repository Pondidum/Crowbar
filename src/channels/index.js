import React from 'react'
import { Link } from 'react-router-dom'


export default (route) => (
  <div>
    <h2>Channels</h2>
    <ul className="nav nav-sidebar">
      <li className="active"><Link to="/" >Overview</Link></li>
      <li><Link to="/">Reports</Link></li>
      <li><Link to="/">Analytics</Link></li>
      <li><Link to="/">Export</Link></li>
    </ul>
  </div>
)
