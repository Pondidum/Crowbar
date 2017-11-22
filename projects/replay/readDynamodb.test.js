const readDynamodb = require('./readDynamodb')
const aws = require('aws-sdk')

const config = {
  region: 'eu-east-1',
  endpoint: new aws.Endpoint('http://localhost:8000')
}
const dynamo = new aws.DynamoDB(config)
const documentClient = new aws.DynamoDB.DocumentClient(config)

it('should talk to localhost', () => {
  dynamo
    .createTable({
      TableName: 'CrowbarEvents',
      KeySchema: [{ AttributeName: 'eventId', KeyType: 'HASH' }],
      AttributeDefinitions: [
        {
          AttributeName: 'eventId',
          AttributeType: 'S'
        }
      ],
      ProvisionedThroughput: {
        ReadCapacityUnits: 20,
        WriteCapacityUnits: 5
      }
    })
    .promise()
    .then(() =>
      readDynamodb(documentClient)
        .then(data => console.log('win', data))
        .catch(err => console.error('fail', err))
    )
})
