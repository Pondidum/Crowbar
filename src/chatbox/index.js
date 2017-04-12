import React from 'react'
import { connect } from 'react-redux'
import { Col, FormGroup, FormControl } from 'react-bootstrap'

const sendMessage = (message) => {
  return {
    type: 'SEND_MESSAGE',
    message
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    sendMessage: (message) => dispatch(sendMessage(message))
  }
}

const ChatBox = ({ sendMessage }) => (
  <Col sm={9} md={10} smOffset={3} mdOffset={2} className="chatbox well">
    <form onSubmit={event => { event.preventDefault(); sendMessage('this is a test'); }}>
      <FormGroup>
        <FormControl type="text" placeholder="send a message..." />
      </FormGroup>
    </form>
  </Col>
);


export default connect(null, mapDispatchToProps)(ChatBox)
