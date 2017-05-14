const defaultState = {}

export default (state = defaultState, action) => {
  switch (action.type) {
    case 'SEND_MESSAGE_REQUEST': {
      const event = action.payload
      const messages = state[event.channelId] || []

      return Object.assign({}, state, {
        [event.channelId]: messages.concat([event.message])
      })
    }

    default:
      return state
  }
}
