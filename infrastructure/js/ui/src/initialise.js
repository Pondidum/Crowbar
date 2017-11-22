import { listAllChannels } from './channels/actions'
import { listAllMessages } from './messages/actions'

export default dispatch => {
  dispatch(listAllChannels())
  dispatch(listAllMessages())
}
