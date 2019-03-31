const getTimeAll = require('./get_time_all')

/**
* 根据 excels，获取上班打卡时间
* @param {Array} excels 
* @param {Object} config 选填，可设置 sorting
*/
function getTimeOn(excels, config = {}) {
  const timeAlls = getTimeAll(excels, config)
  
  const timeOns = timeAlls.map(item => {
    const { year, month, day, format, punchTimes } = item
    const time = punchTimes[0]

    return {
      year,
      month,
      day,
      time,
      format,
      timestamp: +new Date(`${format} ${time}`)
    }
  })

  return timeOns
}

module.exports = getTimeOn
