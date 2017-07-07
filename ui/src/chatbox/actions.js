import { CALL_API } from 'redux-api-middleware'
import uuid from 'uuid/v4'
import { API_URL } from '../constants'

export const sendMessage = (userId, channelId, message) => {
  const event = {
    eventId: uuid(),
    type: 'MESSAGE_SENT',
    timestamp: new Date().getTime(),
    messageId: uuid(),
    userId,
    channelId,
    message
  }

  return {
    [CALL_API]: {
      endpoint: API_URL,
      method: 'POST',
      body: JSON.stringify(event),
      types: [
        { type: 'SEND_MESSAGE_REQUEST', payload: event },
        { type: 'SEND_MESSAGE_SUCCESS', payload: event },
        'SEND_MESSAGE_FAILURE'
      ]
    }
  }
}
