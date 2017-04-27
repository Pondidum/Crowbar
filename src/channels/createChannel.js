import React, { Component } from 'react'
import { Button, FormGroup, ControlLabel, FormControl, Modal } from 'react-bootstrap'
import { connect } from 'react-redux'
import { createChannel } from './actions'

const mapStateToProps = (state, ownProps) => {
  return {
    userid: state.cognito.user.username,
    channels: state.channels.available.map(channel => channel.name)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createChannel: (userid, name, description) => dispatch(createChannel(userid, name, description))
  }
}

class CreateChannel extends Component {

  constructor(props) {
    super(props)

    this.state = {
      showModal: false
    }
  }

  render() {

    let name = null
    let description = null

    const onClose = () => this.setState({ showModal: false})
    const onClick = e => {
      e.preventDefault()
      this.setState({ showModal: true})
    }

    const onCreate = e => {
      e.preventDefault();
      this.props.createChannel(this.props.userid, name.value, description.value)
      onClose()
    }

    return (
      <div>
        <a href="#" onClick={onClick}>Create Channel...</a>

        <Modal show={this.state.showModal} onHide={onClose}>

          <Modal.Header closeButton>
            <Modal.Title>Create Channel</Modal.Title>
          </Modal.Header>
          <form onSubmit={onCreate}>

            <Modal.Body>
              <FormGroup>
                <ControlLabel>Channel Name</ControlLabel>
                <FormControl type="text" inputRef={x => name = x} autoFocus />
              </FormGroup>
              <FormGroup>
                <ControlLabel>Channel Description</ControlLabel>
                <FormControl type="text" inputRef={x => description = x} />
              </FormGroup>
            </Modal.Body>

            <Modal.Footer>
              <Button type="submit" bsStyle="primary">Create</Button>
              <Button onClick={onClose}>Cancel</Button>
            </Modal.Footer>

          </form>
        </Modal>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateChannel)
