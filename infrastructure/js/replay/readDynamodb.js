const aws = require('aws-sdk')
const dynamodb = new aws.DynamoDB.DocumentClient()

module.exports = () =>
  new Promise((resolve, reject) => {
    var finalSet = []
    const nextBatch = lek => {
      const query = {
        TableName: 'CrowbarEvents',
        ExclusiveStartKey: lek
      }

      dynamodb.scan(query, (err, result) => {
        if (err) {
          return reject(err)
        }

        if (result.Items.length) {
          finalSet.push.apply(finalSet, result.Items)
        }

        if (result.LastEvaluatedKey) {
          nextBatch(result.LastEvaluatedKey)
        } else {
          resolve(finalSet)
        }
      })
    }

    nextBatch()
  })
