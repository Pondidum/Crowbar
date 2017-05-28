const updateChannel = (view, channelId, modification) => {
  const index = view.findIndex(c => c.id === channelId)
  const newChannel = Object.assign({}, modification(view[index]))

  const before = view.slice(0, index)
  const after = view.slice(index + 1, view.length)

  return before.concat([newChannel]).concat(after)
}

const handlers = {
  CHANNEL_CREATED: (view, event) => {
    return view.concat([
      {
        id: event.channelId,
        name: event.channelName,
        description: event.channelDescription,
        users: 0
      }
    ])
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
      return { users: existing.users - 1 }
    })
  }
}

module.exports = event => {
  const handler = handlers[event.type]

  return {
    viewName: 'allchannels',
    defaultView: [],
    callback: view => handler(view, event)
  }
}
