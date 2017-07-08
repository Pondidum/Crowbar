import React from 'react'
import { Col } from 'react-bootstrap'
import moment from 'moment'

const Message = ({ message }) => {
  const style = {}

  if (message.status === 'FAILED') style.color = 'red'
  if (message.status === 'PENDING') style.color = '#999'

  return (
    <li className="row" style={style}>
      <Col sm={2}>
        {moment(message.timestamp).fromNow()}
      </Col>
      <Col sm={10}>
        {message.text}
      </Col>
    </li>
  )
}

export default Message
