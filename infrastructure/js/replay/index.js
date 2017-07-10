const aws = require('aws-sdk')

const dynamodb = new aws.DynamoDB()
//const kinesis = new aws.Kinesis()

const sendToKinesis = item => {}

const getAll = () =>
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

exports.handler = (event, context, callback) => {
  return getAll()
    .then(data => {
      console.log(`Fetched ${data.length} items`)
      callback(null, data)
    })
    .catch(err => {
      console.error(err)
      callback(err)
    })
}
