const aws = require('aws-sdk')

const updateView = ({
  s3 = new aws.S3(),
  viewName,
  defaultView = {},
  id,
  callback
}) => {
  const path = id
    ? `events/views/${viewName}/${id}.json`
    : `events/views/${viewName}.json`

  const query = {
    Bucket: 'crowbar-store',
    Key: path
  }

  return new Promise((resolve, reject) => {
    console.log('s3 query', query)

    s3.getObject(query, (err, data) => {
      const body = data && data.Body ? JSON.parse(data.Body) : defaultView
      const content = callback(body) || body

      const command = Object.assign({}, query, {
        Body: JSON.stringify(content, null, 2),
        ContentType: 'application/json',
        ACL: 'public-read'
      })

      console.log('s3 command', command)

      s3.putObject(command, (err, data) => {
        if (!err) {
          resolve()
        } else {
          reject(err)
        }
      })
    })
  })
}

module.exports = updateView
