const aws = require('aws-sdk')
const dynamo = new aws.DynamoDB()

module.exports = () =>
  new Promise(function(resolve, reject) {
    const deleteCommand = {
      TableName: 'CrowbarEvents'
    }

    dynamo
      .deleteTable(deleteCommand)
      .promise()
      .then(data => {
        console.log('rerun terraform apply')
        resolve(data)
      })
      .catch(err => {
        console.error(err)
        reject(err)
      })
  })
