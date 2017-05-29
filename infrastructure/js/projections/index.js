const updateView = require('./util/updateView')
const allChannels = require('./allChannels')
const allUsers = require('./allUsers')

const projections = [allChannels, allUsers]

module.exports = event => {
  const promises = projections.map(project => {
    const update = project(event)
    updateView(update)
  })

  return Promise.all(promises)
}
