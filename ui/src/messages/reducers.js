const defaultState = {}

const createMessage = (event, status = '') => {
  return {
    messageId: event.messageId,
    text: event.message,
    userId: event.userId,
    status: status
  }
}

const updateMessages = (messages, replacement) => {
  const index = messages.findIndex(c => c.messageId === replacement.messageId)

  const before = messages.slice(0, index)
  const after = messages.slice(index + 1, messages.length)

  return before.concat([replacement]).concat(after)
}

const updateChannelMessages = (state, event, status) => {
  const messages = updateMessages(
    state[event.channelId] || [],
    createMessage(event, status)
  )

  return Object.assign({}, state, {
    [event.channelId]: messages
  })
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case 'SEND_MESSAGE_REQUEST': {
      const event = action.payload

      return updateChannelMessages(state, event, 'PENDING')
    }

    case 'SEND_MESSAGE_SUCCESS': {
      const event = action.payload

      return updateChannelMessages(state, event)
    }

    case 'SEND_MESSAGE_FAILURE': {
      const event = action.payload

      return updateChannelMessages(state, event, 'FAILED')
    }

    default:
      return state
  }
}
