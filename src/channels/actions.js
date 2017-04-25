export const viewChannel = (channelName) => {
  return {
    type: 'VIEW_CHANNEL',
    channelName
  };
}

export const createChannel = (userId, channelName, channelDescription) => {
  return {
    type: 'CREATE_CHANNEL',
    userId,
    channelName,
    channelDescription
  }
}
