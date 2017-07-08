import { listAllChannels } from './channels/actions'

export default dispatch => {
  dispatch(listAllChannels())
}
