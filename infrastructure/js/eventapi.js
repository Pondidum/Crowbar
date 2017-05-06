'use strict'

const uuid = require('uuid/v4')
const triggerAggregates = require('./aggregates')
const writeToStorage = require('./store')

const writeError = (message, err) =>
  console.log(message, JSON.stringify(err, null, 2))

exports.handler = function(awsEvent, context, callback) {
  const event = Object.assign({}, JSON.parse(awsEvent.body), {
    timestamp: new Date().getTime(),
    eventId: uuid()
  })

  writeToStorage(event)
    .catch(err => {
      writeError('Unable to store event', err)
      callback(null, {
        statusCode: '400',
        body: JSON.stringify({
          message: 'Unable to store event',
          exception: err
        })
      })
    })
    .then(data => {
      triggerAggregates(event)
        .catch(err => writeError('Unable to trigger aggregates', err))
        .then(() => callback(null, { statusCode: '200', body: '{}' }))
    })
}
