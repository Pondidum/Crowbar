const aws = require('aws-sdk')
const s3 = new aws.S3()

exports.handler = (awsEvent, context, callback) => {
  const query = {
    Bucket: 'crowbar-store',
    Prefix: `events/views`
  }

  return s3
    .listObjectsV2(query)
    .promise()
    .catch(err => {
      console.error(err)
      callback(err)
    })
    .then(data => {
      const command = {
        Bucket: 'crowbar-store',
        Delete: {
          Objects: data.Contents.map(item => {
            return { Key: item.Key }
          })
        }
      }

      return s3
        .deleteObjects(command)
        .promise()
        .catch(err => {
          console.error(err)
          callback(err)
        })
        .then(data => {
          console.log('Deleted:', data.Deleted.map(item => item.Key))
          callback()
        })
    })
}
