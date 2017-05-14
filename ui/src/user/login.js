import React from 'react'
import { connect } from 'react-redux'
import {
  Col,
  FormGroup,
  ControlLabel,
  FormControl,
  Button
} from 'react-bootstrap'

import { login } from '../cognito/user'

const mapDispatchToProps = dispatch => {
  return {
    dispatch: dispatch
  }
}

const LoginForm = ({ history, dispatch }) => {
  var usernameControl
  var passwordControl

  const onSubmit = e => {
    e.preventDefault()
    const form = {
      username: usernameControl.value,
      password: passwordControl.value
    }

    login(form, dispatch)
      .then(data => history.push('/chat'))
      .catch(e => console.error(e))
  }

  return (
    <Col sm={6} smOffset={3} className="well">
      <h1>Login</h1>
      <form>

        <FormGroup controlId="username">
          <ControlLabel>Username</ControlLabel>
          <FormControl type="text" inputRef={x => (usernameControl = x)} />
        </FormGroup>

        <FormGroup controlId="password">
          <ControlLabel>Password</ControlLabel>
          <FormControl type="password" inputRef={x => (passwordControl = x)} />
        </FormGroup>

        <Button type="submit" onClick={onSubmit}>Submit</Button>
      </form>
    </Col>
  )
}

export default connect(null, mapDispatchToProps)(LoginForm)
