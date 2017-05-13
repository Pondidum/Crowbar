//const expect = require('chai').expect
import uuid from 'uuid/v4'

import { createEvent } from './actions'
import reducer from './reducers'

it('handles CREATE_CHANNEL_REQUEST with no existing channels', () => {
  const state = { available: [] }
  const event = createEvent(uuid(), 'new channel', 'some description')

  const newState = reducer(state, {
    type: 'CREATE_CHANNEL_REQUEST',
    payload: event
  })

  expect(newState.available).toEqual([
    {
      id: event.channelId,
      name: event.channelName,
      description: event.channelDescription,
      creator: event.userId,
      status: 'PENDING'
    }
  ])
})

it('handles CREATE_CHANNEL_REQUEST with one existing channel', () => {
  const state = {
    available: [
      {
        id: 'existing id',
        name: 'existing name',
        description: 'existing description',
        creator: 'existing user',
        status: ''
      }
    ]
  }

  const event = createEvent(uuid(), 'new channel', 'some description')

  const newState = reducer(state, {
    type: 'CREATE_CHANNEL_REQUEST',
    payload: event
  })

  expect(newState.available).toEqual([
    {
      id: 'existing id',
      name: 'existing name',
      description: 'existing description',
      creator: 'existing user',
      status: ''
    },
    {
      id: event.channelId,
      name: event.channelName,
      description: event.channelDescription,
      creator: event.userId,
      status: 'PENDING'
    }
  ])
})

it('handles CREATE_CHANNEL_REQUEST with two existing channels', () => {
  const state = {
    available: [
      {
        id: 'first id',
        name: 'first name',
        description: 'first description',
        creator: 'first user',
        status: ''
      },
      {
        id: 'second id',
        name: 'second name',
        description: 'second description',
        creator: 'second user',
        status: ''
      }
    ]
  }

  const event = createEvent(uuid(), 'new channel', 'some description')

  const newState = reducer(state, {
    type: 'CREATE_CHANNEL_REQUEST',
    payload: event
  })

  expect(newState.available).toEqual([
    {
      id: 'first id',
      name: 'first name',
      description: 'first description',
      creator: 'first user',
      status: ''
    },
    {
      id: 'second id',
      name: 'second name',
      description: 'second description',
      creator: 'second user',
      status: ''
    },
    {
      id: event.channelId,
      name: event.channelName,
      description: event.channelDescription,
      creator: event.userId,
      status: 'PENDING'
    }
  ])
})

it('handles CREATE_CHANNEL_SUCCESS with an existing channel', () => {
  const event = createEvent(uuid(), 'new channel', 'some description')
  const state = {
    available: [
      {
        id: event.channelId,
        name: event.channelName,
        description: event.channelDescription,
        creator: event.userId,
        status: 'PENDING'
      }
    ]
  }

  const newState = reducer(state, {
    type: 'CREATE_CHANNEL_SUCCESS',
    payload: event
  })

  expect(newState.available).toEqual([
    {
      id: event.channelId,
      name: event.channelName,
      description: event.channelDescription,
      creator: event.userId,
      status: ''
    }
  ])
})
