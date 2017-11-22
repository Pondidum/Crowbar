const createChannel = (action, status = '') => {
  return {
    id: action.channelId,
    name: action.channelName,
    description: action.channelDescription,
    creator: action.userId,
    status: status
  }
}

const replaceChannel = (available, channel) => {
  let index = available.findIndex(c => c.id === channel.id)

  if (index < 0) {
    index = available.length
  }

  const before = available.slice(0, index)
  const after = available.slice(index + 1, available.length)

  return before.concat([channel]).concat(after)
}

const handleCreateChannel = (state, event, type) =>
  Object.assign({}, state, {
    available: replaceChannel(state.available, createChannel(event, type))
  })

const defaultState = {
  available: []
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case 'CREATE_CHANNEL_REQUEST': {
      return handleCreateChannel(state, action.payload, action.type)
    }

    case 'CREATE_CHANNEL_SUCCESS': {
      return handleCreateChannel(state, action.payload, action.type)
    }

    case 'CREATE_CHANNEL_FAILURE': {
      return handleCreateChannel(state, action.payload, action.type)
    }

    case 'LIST_ALL_CHANNELS_SUCCESS': {
      return Object.assign({}, state, {
        available: action.payload
      })
    }

    default:
      return state
  }
}
