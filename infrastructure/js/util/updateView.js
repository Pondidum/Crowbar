const aws = require('aws-sdk')

const updateView = ({ s3 = new aws.S3(), viewName, id, callback }) => {
  const path = id
    ? `events/views/${viewName}.json`
    : `events/views/${viewName}/${id}.json`

  const query = {
    Bucket: 'crowbar-store',
    Key: path
  }

  s3.getObject(query, (err, data) => {
    const body = data && data.Body ? JSON.parse(data.Body) : {}
    const content = callback(body) || body

    const command = Object.assign({}, query, {
      Body: JSON.stringify(content, null, 2),
      ContentType: 'application/json',
      ACL: 'public-read'
    })

    s3.putObject(command, (err, data) => {})
  })
}

module.exports = updateView
