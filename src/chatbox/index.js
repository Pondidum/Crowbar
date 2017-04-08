import React from 'react'
import { Col, FormGroup, FormControl } from 'react-bootstrap'

export default () => (
  <Col sm={9} md={10} smOffset={3} mdOffset={2} className="chatbox well">
    <form>
      <FormGroup>
        <FormControl type="text" placeholder="send a message..." />
      </FormGroup>
    </form>
  </Col>
);
