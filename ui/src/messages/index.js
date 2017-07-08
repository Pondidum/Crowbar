import React from 'react'
import { connect } from 'react-redux'
import { Col } from 'react-bootstrap'
import Message from './message'

const mapStateToProps = (state, ownProps) => {
  const channel = state.channels.available.find(
    c => c.name === ownProps.match.params.channel
  )

  return {
    channel: channel || {},
    messages: channel ? state.messages[channel.id] || [] : []
  }
}

const Messages = ({ channel, messages }) => {
  return (
    <Col sm={9} md={10} smOffset={3} mdOffset={2} className="main">
      <h1>
        {channel.name}
      </h1>
      {channel.description}
      <hr />
      <ul className="list-unstyled">
        {messages.map((message, index) =>
          <Message key={index} message={message} />
        )}
      </ul>
    </Col>
  )
}

export default connect(mapStateToProps)(Messages)
