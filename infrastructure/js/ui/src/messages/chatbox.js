import React from 'react'
import { connect } from 'react-redux'
import { Col, FormGroup, FormControl } from 'react-bootstrap'
import { sendMessage } from './actions'
import { withRouter } from 'react-router'

const mapStateToProps = (state, ownProps) => {
  const channel = state.channels.available.find(
    c => c.name === ownProps.match.params.channel
  )

  return {
    userId: state.cognito.user.username,
    channelId: channel && channel.id
  }
}

const mapDispatchToProps = dispatch => {
  return {
    sendMessage: (userid, channelId, message) =>
      dispatch(sendMessage(userid, channelId, message))
  }
}

const ChatBox = ({ userId, channelId, sendMessage }) => {
  var textbox = null

  const submit = event => {
    event.preventDefault()
    sendMessage(userId, channelId, textbox.value)
    textbox.value = ''
  }

  return (
    <Col sm={9} md={10} smOffset={3} mdOffset={2} className="chatbox well">
      <form onSubmit={submit}>
        <FormGroup>
          <FormControl
            type="text"
            inputRef={x => (textbox = x)}
            autoFocus
            placeholder="send a message..."
          />
        </FormGroup>
      </form>
    </Col>
  )
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ChatBox))
