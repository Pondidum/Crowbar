const uuid = require('uuid')

module.exports = {
  event: e => {
    const basic = { eventId: uuid() }
    const override = {
      timestamp: new Date().getTime()
    }

    return Object.assign(
      basic,
      typeof e === 'string' ? JSON.parse(e) : e,
      override
    )
  }
}
