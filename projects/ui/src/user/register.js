import React from 'react'
import { connect } from 'react-redux'
import {
  Col,
  FormGroup,
  ControlLabel,
  FormControl,
  Button
} from 'react-bootstrap'

import { register } from '../cognito/user'

const mapDispatchToProps = dispatch => {
  return {
    dispatch: dispatch
  }
}

const RegisterForm = ({ history, dispatch }) => {
  var emailControl
  var passwordControl
  var nameControl

  const onSubmit = e => {
    e.preventDefault()
    const form = {
      username: emailControl.value,
      password: passwordControl.value,
      name: nameControl.value
    }

    register(form, dispatch)
      .then(data => history.push('/user/verify'))
      .catch(e => console.error(e))
  }

  return (
    <Col sm={6} smOffset={3} className="well">
      <h1>Register</h1>
      <form>
        <FormGroup controlId="username">
          <ControlLabel>Email Address</ControlLabel>
          <FormControl type="text" inputRef={x => (emailControl = x)} />
        </FormGroup>

        <FormGroup>
          <ControlLabel>Display Name</ControlLabel>
          <FormControl type="text" inputRef={x => (nameControl = x)} />
        </FormGroup>

        <FormGroup controlId="password">
          <ControlLabel>Password</ControlLabel>
          <FormControl type="password" inputRef={x => (passwordControl = x)} />
        </FormGroup>

        <Button type="submit" onClick={onSubmit}>
          Register
        </Button>
      </form>
    </Col>
  )
}

export default connect(null, mapDispatchToProps)(RegisterForm)
