import { CALL_API, getJSON, ApiError } from 'redux-api-middleware'
import uuid from 'uuid/v4'

export const viewChannel = channelName => {
  return {
    type: 'VIEW_CHANNEL',
    channelName
  }
}

export const createEvent = (userId, channelName, channelDescription) => {
  return {
    eventId: uuid(),
    type: 'CREATE_CHANNEL',
    timestamp: new Date().getTime(),
    channelId: uuid(),
    channelName,
    channelDescription: channelDescription === '' ? null : channelDescription,
    userId
  }
}

export const createChannel = (userId, channelName, channelDescription) => {
  const event = createEvent(userId, channelName, channelDescription)

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
