const projection = require('./allmessages')

let messageId = 0

const createEvent = (userId, channelId, message) => {
  return {
    eventId: 'wat',
    type: 'MESSAGE_SENT',
    timestamp: new Date().getTime(),
    messageId: messageId++,
    userId,
    channelId,
    message
  }
}

it('handles a new channel with a new message', () => {
  const event = createEvent('user', 'channel-1', 'first')
  const view = projection(event).callback({})

  expect(view).toEqual({
    'channel-1': [
      {
        messageId: event.messageId,
        text: event.message,
        userId: event.userId,
        timestamp: event.timestamp
      }
    ]
  })
})

it('handles an existing channel with a new message', () => {
  const event = createEvent('user', 'channel-1', 'first')
  const view = projection(event).callback({
    'channel-1': [
      {
        messageId: '0',
        text: 'original',
        userId: '0',
        timestamp: 123
      }
    ]
  })

  expect(view).toEqual({
    'channel-1': [
      {
        messageId: '0',
        text: 'original',
        userId: '0',
        timestamp: 123
      },
      {
        messageId: event.messageId,
        text: event.message,
        userId: event.userId,
        timestamp: event.timestamp
      }
    ]
  })
})
