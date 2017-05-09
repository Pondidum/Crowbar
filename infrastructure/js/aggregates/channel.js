const appendToObject = require('./s3append')

const handles = eventType => eventType === 'CREATE_CHANNEL'

exports.handler = (event, context) => {
  if (!handles(event.type)) {
    return
  }

  return appendToObject('events/views/allchannels.json', content => {
    const newChannel = {
      id: event.channelId,
      name: event.channelName,
      description: event.channelDescription,
      usersWatching: []
    }

    return content ? content.concat([newChannel]) : [newChannel]
  })
}
