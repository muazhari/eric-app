const moment = require('moment-timezone')

const getCurrentDateTime = () => {
  const a = moment().tz('Asia/Jakarta')
  const currentDateTime = a.format('YYYY-MM-DDTHH:mm:ss.SSS[Z]')
  return currentDateTime
}

module.exports = {
  getCurrentDateTime,
}
