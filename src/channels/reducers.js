export default (state = {}, action) => {

  switch (action.type) {
    case "VIEW_CHANNEL":
      return Object.assign({}, state, { selectedChannel: action.channel });

    default:
      return state;
  }
}
