const readDynamodb = require('./readDynamodb')
const writeToKinesis = require('./writeToKinesis')

exports.handler = (event, context, callback) => {
  return readDynamodb()
    .then(data => {
      console.log(`Fetched ${data.length} items`)
      writeToKinesis(data)
        .then(data => {
          console.log('Wrote to Kinesis')
          callback(null, data)
        })
        .catch(err => {
          console.error(err)
          callback(null)
        })
    })
    .catch(err => {
      console.error(err)
      callback(err)
    })
}
