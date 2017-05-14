import React from 'react'
import { Route } from 'react-router'

import SideBar from '../sidebar'
import Messages from '../messages'
import ChatBox from '../chatbox'

const ChatApp = () => (
  <div className="row">
    <Route path="/chat/:channel?" component={SideBar} />
    <Route path="/chat/:channel?" component={Messages} />
    <ChatBox />
  </div>
)

export default ChatApp
