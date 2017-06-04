'use strict'

const uuid = require('uuid/v4')
const project = require('./project')
const writeToStorage = require('./store')

const writeError = (message, err) =>
  console.log(message, JSON.stringify(err, null, 2))

const handleStorageError = (callback, err) => {
  writeError('Unable to store event', err)
  callback(null, {
    statusCode: '400',
    body: JSON.stringify({
      message: 'Unable to store event',
      exception: err
    })
  })
}

exports.handler = function(awsEvent, context, callback) {
  const basic = { eventId: uuid() }
  const override = {
    timestamp: new Date().getTime()
  }

  const event = Object.assign(basic, JSON.parse(awsEvent.body), override)

  writeToStorage(event)
    .catch(err => handleStorageError(callback, err))
    .then(data => {
      project(event)
        .catch(err => writeError('Unable to trigger projections', err))
        .then(() => callback(null, { statusCode: '200', body: '{}' }))
    })
}
