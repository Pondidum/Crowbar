const aws = require('aws-sdk')

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

module.exports = triggerAggregates
