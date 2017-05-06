const aws = require('aws-sdk')

const getAggregateFunctions = () => {
  const s3 = new aws.S3()

  const query = {
    Bucket: 'crowbar-store',
    Key: 'events/projections.json'
  }

  return new Promise((resolve, reject) =>
    s3.getObject(query, (err, data) => {
      if (err) {
        reject(err)
      } else {
        resolve(JSON.parse(data.Body))
      }
    })
  )
}

const triggerAggregates = event => {
  const lambda = new aws.Lambda({
    region: 'eu-west-1'
  })

  const baseDto = {
    InvocationType: 'Event',
    Payload: JSON.stringify(event)
  }

  return new Promise((resolve, reject) =>
    getAggregateFunctions()
      .catch(err => {
        console.log('Unable to read projections file', err)
        reject(err)
      })
      .then(functions => {
        functions
          .map(name => Object.assign({}, baseDto, { FunctionName: name }))
          .map(dto => lambda.invoke(dto))
          .forEach(request => request.send())
        resolve()
      })
  )
}

module.exports = triggerAggregates
