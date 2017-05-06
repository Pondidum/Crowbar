import { CALL_API } from 'redux-api-middleware'
import uuid from 'uuid/v4'

export const viewChannel = channelName => {
  return {
    type: 'VIEW_CHANNEL',
    channelName
  }
}

export const createChannel = (userId, channelName, channelDescription) => {
  const event = {
    eventId: uuid(),
    timestamp: new Date().getTime(),
    channelId: uuid(),
    channelName,
    channelDescription,
    userId
  }

  return {
    [CALL_API]: {
      endpoint: 'https://9a0hixeit8.execute-api.eu-west-1.amazonaws.com/api/events',
      method: 'POST',
      body: JSON.stringify(event),
      types: [
        { type: 'CREATE_CHANNEL_REQUEST', payload: event },
        { type: 'CREATE_CHANNEL_SUCCESS', payload: event },
        { type: 'CREATE_CHANNEL_FAILURE', payload: event }
      ]
    }
  }
}
