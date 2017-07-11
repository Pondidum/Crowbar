const aws = require('aws-sdk')
const kinesis = new aws.Kinesis()

module.exports = events => {
  var command = {
    StreamName: 'crowbar_replay_stream',
    Records: events.map(event => {
      return {
        Data: JSON.stringify(event),
        PartitionKey: event.eventId // ???
      }
    })
  }

  return kinesis.putRecords(command).promise()
}
