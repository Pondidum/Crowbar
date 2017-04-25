
const createChannel = (action) => {
  return {
    name: action.channelName,
    description: action.channelDescription,
    creator: action.userId
  }
}

const defaultState = {
  available: [],
  selectedChannel: null
}

export default (state = defaultState, action) => {

  switch (action.type) {

    case "VIEW_CHANNEL":
      return Object.assign({}, state, {
        selectedChannel: action.channelName
      });

    case 'CREATE_CHANNEL':
      const available = state.available.concat([ createChannel(action) ]);

      return Object.assign({}, state, {
        available: available
      });

    default:
      return state;
  }
}
