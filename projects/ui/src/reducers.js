import { routerReducer } from 'react-router-redux'
import { combineReducers } from 'redux'

import messageReducers from './messages/reducers'
import channelsReducers from './channels/reducers'
import { reducer as cognito } from './cognito/user'

export default combineReducers({
  channels: channelsReducers,
  messages: messageReducers,
  cognito,
  router: routerReducer
})
