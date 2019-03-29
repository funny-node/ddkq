const getTimeAll = require('./get_time_all')
const { formateTime } = require('./../util/helper')

/**
* 根据 excels，获取上班打卡时间
* @param {Array} excels 
* @param {Object} config 选填，可设置 sorting
*/
function getTimeOn(excels, config = {}) {
  const timeAlls = getTimeAll(excels, config)
  
  const timeOns = timeAlls.map(item => {
    const { year, month, day, punchTimes } = item
    
    return {
      year,
      month,
      day,
      time: punchTimes[0],
      format: formateTime(year, month, day)
    }
  })

  return timeOns
}

module.exports = getTimeOn
