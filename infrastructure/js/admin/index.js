const clearViews = require('./clearViews')

exports.clearViews = (awsEvent, context, callback) =>
  clearViews()
    .then(data => callback(null, data))
    .catch(error => callback(error))
