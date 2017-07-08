import { CALL_API } from 'redux-api-middleware'
import { VIEWS_URL } from '../constants'

export const listAllMessages = () => {
  return {
    [CALL_API]: {
      endpoint: VIEWS_URL + 'allmessages.json',
      method: 'GET',
      types: [
        'LIST_ALL_MESSAGES_REQUEST',
        'LIST_ALL_MESSAGES_SUCCESS',
        'LIST_ALL_MESSAGES_FAILURE'
      ]
    }
  }
}
