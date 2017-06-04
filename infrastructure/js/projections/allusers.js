const handlers = {
  USER_REGISTERED: (view, event) => {
    return Object.assign({}, view, {
      [event.userId]: {
        name: event.userName
      }
    })
  },
  USER_JOINED_CHANNEL: (view, event) => {},
  USER_LEFT_CHANNEL: (view, event) => {}
}

const defaultHandler = () => {}

module.exports = event => {
  const handler = handlers[event.type] || defaultHandler

  return {
    viewName: 'allusers',
    defaultView: {},
    callback: view => handler(view, event)
  }
}
