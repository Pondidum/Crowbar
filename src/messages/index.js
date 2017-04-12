import React from 'react'
import { connect } from 'react-redux'
import { Col } from 'react-bootstrap'

const mapStateToProps = (state, ownProps) => {
  return {
    messages: state.messages,
    ...ownProps
  }
}

const Messages = ({ match, messages }) => (
  <Col sm={9} md={10} smOffset={3} mdOffset={2} className="main">

    <h1>{match.params.channel}</h1>
    <hr />
    <ul>
      {messages.map((message, index) => (<li key={index}>{message}</li>))}
    </ul>
  </Col>
);

export default connect(mapStateToProps)(Messages);
