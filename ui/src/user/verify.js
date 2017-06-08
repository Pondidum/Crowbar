import React from 'react'
import { connect } from 'react-redux'
import {
  Col,
  FormGroup,
  ControlLabel,
  FormControl,
  Button
} from 'react-bootstrap'

import { verify } from '../cognito/user'

const mapDispatchToProps = dispatch => {
  return {
    dispatch: dispatch
  }
}

const VerifyForm = ({ history, dispatch }) => {
  var codeControl

  const onSubmit = e => {
    e.preventDefault()
    const form = {
      code: codeControl.value
    }

    verify(form, dispatch)
      .then(data => history.push('/chat'))
      .catch(e => console.error(e))
  }

  return (
    <Col sm={6} smOffset={3} className="well">
      <h1>Verify</h1>
      <form>

        <FormGroup controlId="code">
          <ControlLabel>Verification Code</ControlLabel>
          <FormControl type="text" inputRef={x => (codeControl = x)} />
        </FormGroup>

        <Button type="submit" onClick={onSubmit}>Verify</Button>
      </form>
    </Col>
  )
}

export default connect(null, mapDispatchToProps)(VerifyForm)
