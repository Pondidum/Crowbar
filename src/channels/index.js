import React from 'react'
import ChannelLink from './channelLink'

export default (route) => (
  <div>
    <h2>Channels</h2>
    <ul className="nav nav-sidebar">
      <ChannelLink to="/channel/everything">Everything</ChannelLink>
      <ChannelLink to="/channel/banter">Banter</ChannelLink>
      <ChannelLink to="/channel/oncall">On Call</ChannelLink>
    </ul>
  </div>
)
