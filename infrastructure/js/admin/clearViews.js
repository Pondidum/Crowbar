const aws = require('aws-sdk')
const s3 = new aws.S3()

module.exports = () =>
  new Promise((resolve, reject) => {
    const query = {
      Bucket: 'crowbar-store',
      Prefix: `events/views`
    }

    return s3
      .listObjectsV2(query)
      .promise()
      .catch(err => reject(err))
      .then(data => {
        if (!data.Contents || data.Contents.length === 0) {
          return resolve()
        }

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
          .catch(err => reject(err))
          .then(data => {
            console.log('Deleted:', data.Deleted.map(item => item.Key))
            resolve(data)
          })
      })
  })
