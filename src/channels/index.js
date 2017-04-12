import React from 'react'
import { Link } from 'react-router-dom'


export default (route) => (
  <div>
    <h2>Channels</h2>
    <ul className="nav nav-sidebar">
      <li className="active"><Link to="/channel/everything" >Overview</Link></li>
      <li><Link to="/channel/banter">Banter</Link></li>
      <li><Link to="/channel/oncall">On Call</Link></li>
    </ul>
  </div>
)
