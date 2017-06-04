const updateView = require('./util/updateView')
const allChannels = require('./projections/allchannels')
const allUsers = require('./projections/allusers')

const projections = [allChannels, allUsers]

exports.handler = event => {
  const promises = projections.map(project => {
    const command = project(event)
    return updateView(command)
  })

  return Promise.all(promises)
}
