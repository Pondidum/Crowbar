'use strict'

const aws = require('aws-sdk')
const uuid = require('uuid/v4')

const getAggregateFunctions = () => {
  return [] //list the functions here to start with, move to s3 later.
}

const triggerAggregates = event => {
  const lambda = new aws.Lambda({
    region: 'eu-west-1'
  })

  const functions = getAggregateFunctions()
  const baseDto = {
    InvocationType: 'Event',
    Payload: JSON.stringify(event)
  }

  functions
    .map(functionName => Object.assign({}, baseDto, { FunctionName: functionName }))
    .map(dto => lambda.invoke(dto))
    .forEach(request => request.send())
}

const writeToStorage = event => {
  const dynamo = new aws.DynamoDB.DocumentClient()

  const dto = {
    TableName: 'CrowbarEvents',
    Item: event
  }

  return new Promise((resolve, reject) =>
    dynamo.put(dto, (err, data) => {
      if (err) {
        reject(err)
      } else {
        resolve(data)
      }
    })
  )
}

exports.handler = function(awsEvent, context, callback) {
  //todo: validate it's actually json, and fail if not
  const event = JSON.parse(awsEvent.body)
  event.timestamp = new Date().getTime()
  event.eventId = uuid()

  writeToStorage(event)
    .catch(err => console.log('Unable to store event', JSON.stringify(err, null, 2)))
    .then(data => callback(null, { statusCode: '200' }))
  //triggerAggregates(event)
}
