const handlers = {
  MESSAGE_SENT: (view, event) => {
    const message = {
      messageId: event.messageId,
      text: event.message,
      userId: event.userId,
      status: ''
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
