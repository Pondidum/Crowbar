const updateView = require('./updateView')

it('can store new objects', () => {
  let command = null

  const s3 = {
    getObject: (query, callback) => callback(),
    putObject: cmd => (command = cmd)
  }

  const testView = { key: 'value' }

  updateView({
    s3: s3,
    viewName: 'wat',
    callback: view => {
      return testView
    }
  })

  expect(command.Body).toEqual(JSON.stringify(testView, null, 2))
})

it('can store updated objects', () => {
  let command = null

  const s3 = {
    getObject: (query, callback) => callback(),
    putObject: cmd => (command = cmd)
  }

  updateView({
    s3: s3,
    viewName: 'wat',
    callback: view => {
      view.key = 'hype!'
    }
  })

  expect(command.Body).toEqual(JSON.stringify({ key: 'hype!' }, null, 2))
})
