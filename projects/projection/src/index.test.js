const handler = require('./index').handler

it('should be able to handle an event', () => {
  const event = {
    channelId: '864d0d9f-8517-4902-b28d-091240f685db',
    eventId: 'f3263939-4bec-49c8-ba41-b2fef04c5086',
    message: 'wat',
    messageId: 'aaa51bed-4db9-43c3-b948-d8b907cbd54f',
    timestamp: 1496583896541,
    type: 'MESSAGE_SENT'
  }

  return handler(event)
})
