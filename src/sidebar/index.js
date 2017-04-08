import React from 'react'
import { Col } from 'react-bootstrap'
import ChannelList from '../channels'

export default () => (
  <Col sm={3} md={2} className="sidebar">
    <ChannelList />
  </Col>
)
