const aws = require('aws-sdk')
const s3 = new aws.S3()

const appendToObject = (key, callback) => {
  const query = {
    Bucket: 'crowbar-store',
    Key: key
  }

  s3.getObject(query, (err, data) => {
    if (err && err.code !== 'NoSuchKey') {
      console.error(`Error fetching document '${key}' from S3`, err)
      return
    }

    const body = data && data.Body ? JSON.parse(data.Body) : null
    const content = callback(body)

    const command = Object.assign({}, query, {
      Body: JSON.stringify(content, null, 2),
      ContentType: 'application/json',
      ACL: 'public-read'
    })

    s3.putObject(command, (err, data) => {
      if (err) {
        console.error(`Error storing document '${key}' to S3`, err)
      } else {
        console.log(`Stored document '${key}' to S3`, data)
      }
    })
  })
}

module.exports = appendToObject
