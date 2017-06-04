const aws = require('aws-sdk')

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

module.exports = writeToStorage
