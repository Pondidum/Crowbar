const enhance = require('./enhance')
const writeToStorage = require('./store')
const project = require('./project')

const writeError = (context, message, err) => {
  console.log(message, JSON.stringify(err, null, 2))
  context.done(err)
}

exports.handler = (awsEvent, context) => {
  const attributes = awsEvent.request.userAttributes

  const event = enhance.event({
    type: 'USER_REGISTERED',
    userId: attributes.sub,
    email: attributes.email
  })

  writeToStorage(event)
    .catch(err => writeError(context, 'Unable to store event', err))
    .then(data => {
      project(event)
        .catch(err => writeError(context, 'Unable to trigger projections', err))
        .then(() => context.done(null, awsEvent))
    })
}
