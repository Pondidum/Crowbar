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
  let index = available.findIndex(c => c.channelId === channel.channelId)

  if (index < 0) {
    index = available.length
  }

  const before = available.slice(0, index)
  const after = available.slice(index + 1, available.length)

  return before.concat([channel]).concat(after)
}

const defaultState = {
  available: [],
  selectedChannel: null
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case 'VIEW_CHANNEL':
      return Object.assign({}, state, {
        selectedChannel: action.channelName
      })

    case 'CREATE_CHANNEL_REQUEST': {
      const channel = createChannel(action.payload, 'PENDING')

      return Object.assign({}, state, {
        available: replaceChannel(state.available, channel)
      })
    }

    case 'CREATE_CHANNEL_SUCCESS': {
      const channel = createChannel(action.payload)

      return Object.assign({}, state, {
        available: replaceChannel(state.available, channel)
      })
    }

    case 'CREATE_CHANNEL_FAILURE': {
      const channel = createChannel(action.payload.request, 'ERROR')

      return Object.assign({}, state, {
        available: replaceChannel(state.available, channel)
      })
    }

    default:
      return state
  }
}
