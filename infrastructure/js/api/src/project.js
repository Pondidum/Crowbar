const aws = require('aws-sdk')

module.exports = event => {
  const lambda = new aws.Lambda({
    region: 'eu-west-1'
  })

  const command = {
    InvocationType: 'Event',
    Payload: JSON.stringify(event),
    FunctionName: 'crowbar_projections'
  }

  return new Promise((resolve, reject) =>
    lambda.invoke(command, (err, data) => {
      if (err) {
        console.error('error invoking projection lambda', err)
        reject(err)
      } else {
        resolve(data)
      }
    })
  )
}
