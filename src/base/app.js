import React from 'react'
import { Route, Router } from 'react-router'

import SideBar from '../sidebar'
import Messages from '../messages'
import ChatBox from '../chatbox'

export default ({ history }) => (
  <Router history={history}>
    <div className="row">
      <SideBar />
      <Route path="/channel/:channel" component={Messages} />
      <ChatBox />
    </div>
  </Router>
);
