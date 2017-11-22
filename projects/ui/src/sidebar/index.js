import React from 'react'
import { Col } from 'react-bootstrap'
import ChannelList from '../channels/channelList'

export default ({ match }) => (
  <Col sm={3} md={2} className="sidebar">
    <ChannelList match={match} />
  </Col>
)
