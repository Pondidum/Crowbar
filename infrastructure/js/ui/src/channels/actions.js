import { CALL_API, getJSON, ApiError } from 'redux-api-middleware'
import { API_URL, VIEWS_URL } from '../constants'
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
      endpoint: API_URL,
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
      endpoint: VIEWS_URL + 'allchannels.json',
      method: 'GET',
      types: [
        'LIST_ALL_CHANNELS_REQUEST',
        'LIST_ALL_CHANNELS_SUCCESS',
        'LIST_ALL_CHANNELS_FAILURE'
      ]
    }
  }
}
