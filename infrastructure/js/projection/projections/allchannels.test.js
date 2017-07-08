const projection = require('./allchannels')

const createEvent = type => {
  return {
    type: type,
    channelId: 123,
    channelName: 'some channel',
    channelDescription: 'some description'
  }
}

it('handles CHANNEL_CREATED when there are no channels', () => {
  const event = createEvent('CHANNEL_CREATED')
  const view = projection(event).callback([])

  expect(view).toEqual([
    {
      id: event.channelId,
      name: event.channelName,
      description: event.channelDescription,
      users: 0
    }
  ])
})

it('handles CHANNEL_CREATED when there is one channel', () => {
  const event = createEvent('CHANNEL_CREATED')
  const view = projection(event).callback([{ id: 'abc' }])

  expect(view).toEqual([
    { id: 'abc' },
    {
      id: event.channelId,
      name: event.channelName,
      description: event.channelDescription,
      users: 0
    }
  ])
})

it('handles CHANNEL_CREATED when there are many channels', () => {
  const event = createEvent('CHANNEL_CREATED')
  const view = projection(event).callback([
    { id: 'abc' },
    { id: 'def' },
    { id: 'hij' }
  ])

  expect(view).toEqual([
    { id: 'abc' },
    { id: 'def' },
    { id: 'hij' },
    {
      id: event.channelId,
      name: event.channelName,
      description: event.channelDescription,
      users: 0
    }
  ])
})

it('handles CHANNEL_DESTROYED when there are no channels', () => {
  const event = createEvent('CHANNEL_DESTROYED')
  const view = projection(event).callback([])

  expect(view).toEqual([])
})

it('handles CHANNEL_DESTROYED when there is a matching channel', () => {
  const event = createEvent('CHANNEL_DESTROYED')
  const view = projection(event).callback([{ id: event.channelId }])

  expect(view).toEqual([])
})

it('handles CHANNEL_DESTROYED when there are many channels', () => {
  const event = createEvent('CHANNEL_DESTROYED')
  const view = projection(event).callback([
    { id: 'abc' },
    { id: event.channelId },
    { id: 'def' }
  ])

  expect(view).toEqual([{ id: 'abc' }, { id: 'def' }])
})

it('handles USER_JOINED_CHANNEL when there are no users in a matching channel', () => {
  const event = createEvent('USER_JOINED_CHANNEL')
  const view = projection(event).callback([
    { id: 1, users: 3 },
    { id: event.channelId, users: 0 },
    { id: 2, users: 5 }
  ])

  expect(view).toEqual([
    { id: 1, users: 3 },
    { id: event.channelId, users: 1 },
    { id: 2, users: 5 }
  ])
})

it('handles USER_JOINED_CHANNEL when there are users in a matching channel', () => {
  const event = createEvent('USER_JOINED_CHANNEL')
  const view = projection(event).callback([
    { id: 1, users: 3 },
    { id: event.channelId, users: 17 },
    { id: 2, users: 5 }
  ])

  expect(view).toEqual([
    { id: 1, users: 3 },
    { id: event.channelId, users: 18 },
    { id: 2, users: 5 }
  ])
})

it('handles USER_LEFT_CHANNEL when there are no users in a matching channel', () => {
  const event = createEvent('USER_LEFT_CHANNEL')
  const view = projection(event).callback([
    { id: 1, users: 3 },
    { id: event.channelId, users: 0 },
    { id: 2, users: 5 }
  ])

  expect(view).toEqual([
    { id: 1, users: 3 },
    { id: event.channelId, users: 0 },
    { id: 2, users: 5 }
  ])
})

it('handles USER_LEFT_CHANNEL when there are users in a matching channel', () => {
  const event = createEvent('USER_LEFT_CHANNEL')
  const view = projection(event).callback([
    { id: 1, users: 3 },
    { id: event.channelId, users: 17 },
    { id: 2, users: 5 }
  ])

  expect(view).toEqual([
    { id: 1, users: 3 },
    { id: event.channelId, users: 16 },
    { id: 2, users: 5 }
  ])
})
