import React from 'react'
import { connect } from 'react-redux'
import { Col } from 'react-bootstrap'

const mapStateToProps = (state, ownProps) => {
  const channel = state.channels.available.find(
    c => c.name === ownProps.match.params.channel
  )

  return {
    channel: channel || {},
    messages: channel ? state.messages[channel.id] || [] : []
  }
}

const renderMessage = (message, index) => {
  const style = {}
  if (message.status === 'FAILED') style.color = 'red'
  if (message.status === 'PENDING') style.color = '#999'

  return <li key={index} style={style}>{message.text}</li>
}

const Messages = ({ channel, messages }) => {
  return (
    <Col sm={9} md={10} smOffset={3} mdOffset={2} className="main">
      <h1>{channel.name}</h1>{channel.description}
      <hr />
      <ul className="list-unstyled">
        {messages.map((message, index) => renderMessage(message, index))}
      </ul>
    </Col>
  )
}

export default connect(mapStateToProps)(Messages)
