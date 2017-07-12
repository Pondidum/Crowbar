const project = require('./project')

exports.handler = (event, context, callback) => {
  var p = Promise.resolve()

  event.Records.forEach(record => {
    p = p.then(() => project(record))
  })

  return p
}
