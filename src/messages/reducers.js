export default (state = [], action) => {

  switch (action.type) {
    case "SEND_MESSAGE":
      return state.concat([ action.message ]);

    default:
      return state;
  }
}
