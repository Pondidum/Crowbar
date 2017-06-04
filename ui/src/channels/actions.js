import { CALL_API, getJSON, ApiError } from 'redux-api-middleware'
import uuid from 'uuid/v4'

export const createChannelEvent = (userId, name, desc) => {
  return {
    eventId: uuid(),
    type: 'CHANNEL_CREATED',
    timestamp: new Date().getTime(),
    channelId: uuid(),
    channelName: name,
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
              Object.assign({}, event, {
                error: new ApiError(res.status, res.statusText, json)
              })
            )
        }
      ]
    }
  }
}

export const listAllChannels = () => {
  return {
    [CALL_API]: {
      endpoint: 'https://s3-eu-west-1.amazonaws.com/crowbar-store/events/views/allchannels.json',
      method: 'GET',
      types: [
        'LIST_ALL_CHANNELS_REQUEST',
        'LIST_ALL_CHANNELS_SUCCESS',
        'LIST_ALL_CHANNELS_FAILURE'
      ]
    }
  }
}
