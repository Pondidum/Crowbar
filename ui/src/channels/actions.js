import { CALL_API, getJSON, ApiError } from 'redux-api-middleware'
import uuid from 'uuid/v4'

export const createChannelEvent = (userId, name, desc) => {
  return {
    eventId: uuid(),
    type: 'CREATE_CHANNEL',
    timestamp: new Date().getTime(),
    channelId: uuid(),
    name,
    channelDescription: desc === '' ? null : desc,
    userId
  }
}

export const createChannel = (userId, channelName, channelDescription) => {
  const event = createChannelEvent(userId, channelName, channelDescription)

  return {
    [CALL_API]: {
      endpoint: 'https://9a0hixeit8.execute-api.eu-west-1.amazonaws.com/api/events',
      method: 'POST',
      body: JSON.stringify(event),
      types: [
        { type: 'CREATE_CHANNEL_REQUEST', payload: event },
        { type: 'CREATE_CHANNEL_SUCCESS', payload: event },
        {
          type: 'CREATE_CHANNEL_FAILURE',
          payload: (action, state, res) =>
            getJSON(res).then(json =>
              Object.assign(
                { request: event },
                new ApiError(res.status, res.statusText, json)
              )
            )
        }
      ]
    }
  }
}
