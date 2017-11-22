const updateChannel = (view, channelId, modification) => {
  const index = view.findIndex(c => c.id === channelId)
  const newChannel = Object.assign({}, view[index], modification(view[index]))

  const before = view.slice(0, index)
  const after = view.slice(index + 1, view.length)

  return before.concat([newChannel]).concat(after)
}

const createChannel = event => {
  return {
    id: event.channelId,
    name: event.channelName,
    description: event.channelDescription,
    users: 0
  }
}

const handlers = {
  CHANNEL_CREATED: (view, event) => {
    return view.concat([createChannel(event)])
  },

  CHANNEL_DESTROYED: (view, event) => {
    return view.filter(c => c.id !== event.channelId)
  },

  USER_JOINED_CHANNEL: (view, event) => {
    return updateChannel(view, event.channelId, existing => {
      return { users: existing.users + 1 }
    })
  },

  USER_LEFT_CHANNEL: (view, event) => {
    return updateChannel(view, event.channelId, existing => {
      return { users: Math.max(existing.users - 1, 0) }
    })
  }
}

const defaultHandler = () => {}

module.exports = event => {
  const handler = handlers[event.type] || defaultHandler

  return {
    viewName: 'allchannels',
    defaultView: [],
    callback: view => handler(view, event)
  }
}
