'use strict'

const uuid = require('uuid/v4')
const triggerAggregates = require('./aggregates')
const writeToStorage = require('./store')

exports.handler = function(awsEvent, context, callback) {
  const event = Object.assign({}, JSON.parse(awsEvent.body), {
    timestamp: new Date().getTime(),
    eventId: uuid()
  })

  writeToStorage(event)
    .catch(err => console.log('Unable to store event', JSON.stringify(err, null, 2)))
    .then(data => callback(null, { statusCode: '200' }))
  //triggerAggregates(event)
}
