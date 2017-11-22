const clearViews = require('./clearViews')
const clearEvents = require('./clearEvents')

exports.clearViews = (awsEvent, context, callback) =>
  clearViews()
    .then(data => callback(null, data))
    .catch(error => callback(error))

exports.clearEvents = (awsEvent, context, callback) =>
  clearEvents()
    .then(data => callback(null, data))
    .catch(error => callback(error))
