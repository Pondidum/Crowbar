const update = require('./updateView')
const updateView = (viewName, id, callback) =>
  update({
    viewName,
    id,
    callback
  })

const handleCreateChannel = event => {
  const channel = {
    id: event.channelId,
    name: event.channelName,
    description: event.channelDescription
  }

  updateView('CHANNEL', event.channelId, view => {
    return Object.assign({}, channel, { users: [] })
  })

  updateView('ALL_CHANNELS', null, view => {
    return Object.assign({}, channel, { users: 0 })
  })
}

const handleUserJoinedChannel = event => {
  updateView('CHANNEL', event.channelId, view => {
    view.users.push(userView[event.userId].name)
  })

  updateView('ALL_CHANNELS', null, view => {
    view[event.channelId].users += 1
  })
}

exports.handler = (event, context) => {
  switch (event.type) {
    case 'CREATE_CHANNEL': {
      return handleCreateChannel(event)
    }

    case 'USER_JOINED_CHANNEL': {
      return handleUserJoinedChannel(event)
    }
  }

  return appendToObject('events/views/allchannels.json', content => {
    const newChannel = {
      id: event.channelId,
      name: event.channelName,
      description: event.channelDescription,
      usersWatching: []
    }

    return content ? content.concat([newChannel]) : [newChannel]
  })
}
