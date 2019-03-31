const getTimeAll = require('./get_time_all')

/**
* 根据 excels，获取下班打卡时间 
* @param {Array} excels 
* @param {Object} config 选填，可设置 sorting
*/
function getTimeOff(excels, config = {}) {
  const timeAlls = getTimeAll(excels, config)

  const timeOffs = timeAlls.map(item => {
    const { year, month, day, format, punchTimes } = item
    const time = punchTimes.pop()

    return {
      year,
      month,
      day,
      time,
      format,
      timestamp: +new Date(`${format} ${time}`)
    }
  })

  return timeOffs
}

module.exports = getTimeOff
