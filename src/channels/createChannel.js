import React, { Component } from 'react'
import { Button, FormGroup, ControlLabel, FormControl, Modal } from 'react-bootstrap'


class CreateChannel extends Component {

  constructor(props) {
    super(props)

    this.state = {
      showModal: false
    }
  }

  render() {

    let nameControl = null
    let descriptionControl = null

    const onClose = () => this.setState({ showModal: false})
    const onClick = e => {
      e.preventDefault()
      this.setState({ showModal: true})
    }

    const onCreate = () => {
      //this.props.onCreate();
    }

    return (
      <div>
        <a href="#" onClick={onClick}>Create Channel...</a>

        <Modal show={this.state.showModal} onHide={onClose}>
          <Modal.Header closeButton>
            <Modal.Title>Create Channel</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <FormGroup>
                <ControlLabel>Channel Name</ControlLabel>
                <FormControl type="text" inputRef={x => nameControl = x} autoFocus />
              </FormGroup>
              <FormGroup>
                <ControlLabel>Channel Description</ControlLabel>
                <FormControl type="text" inputRef={x => descriptionControl = x} />
              </FormGroup>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button bsStyle="primary" onClick={onCreate}>Create</Button>
            <Button onClick={onClose}>Cancel</Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}

export default CreateChannel
