export const sendMessage = (userId, channelId, message) => {
  return {
    type: 'SEND_MESSAGE',
    userId,
    channelId,
    message
  }
}
