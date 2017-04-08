import React from 'react'

import SideBar from '../sidebar'
import Messages from '../messages'
import ChatBox from '../chatbox'

export default () => (
  <div className="row">
    <SideBar />
    <Messages />
    <ChatBox />
  </div>
);
