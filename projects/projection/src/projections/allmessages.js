const handlers = {
  MESSAGE_SENT: (view, event) => {
    const message = {
      messageId: event.messageId,
      timestamp: event.timestamp,
      text: event.message,
      userId: event.userId
    }

    const existingChannel = view[event.channelId] || []

    return Object.assign(view, {
      [event.channelId]: existingChannel.concat([message])
    })
  }
}

const defaultHandler = () => {}

module.exports = event => {
  const handler = handlers[event.type] || defaultHandler

  return {
    viewName: 'allmessages',
    defaultView: {},
    callback: view => handler(view, event)
  }
}
