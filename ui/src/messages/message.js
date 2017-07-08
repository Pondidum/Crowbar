import React from 'react'

const Message = ({ message }) => {
  const style = {}
  if (message.status === 'FAILED') style.color = 'red'
  if (message.status === 'PENDING') style.color = '#999'

  return (
    <li style={style}>
      {message.text}
    </li>
  )
}

export default Message
