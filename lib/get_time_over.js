const getTimeAll = require('./get_time_all')
const { formateTime } = require('./../util/helper')
/**
* 根据 excels，获取加班日期
* @param {Array} excels 
* @param {Object} config 选填，可设置 sorting 或者 overtimeStart
*/
function getTimeOver(excels, config = {}) {
  // 如果没有设置 overtimeStart，默认 20 点后为加班
  const { overtimeStart = 20 } = config
  const timeAlls = getTimeAll(excels, config)
  const timeOvers = []
  
  timeAlls.forEach(item => {
    const { year, month, day, punchTimes } = item 
    const timeOff = punchTimes.pop()
    const hour = +timeOff.split(':')[0]

    // 判断当天是否加班
    const is_over_time = isOverTime(hour, overtimeStart)

    if (is_over_time) {
      timeOvers.push({
        year,
        month,
        day,
        time: timeOff,
        format: formateTime(year, month, day)
      })
    }
  })

  return timeOvers
}

/**
 * 根据下班小时时间判断当天是否加班
 * @param {Number} hour 
 * @param {Number} overtimeStart 
 * @return {Boolean}
 */
function isOverTime(hour, overtimeStart) {
  // 默认当天凌晨 6 点前下班也是加班
  // 得益于钉钉打卡表会将凌晨下班也归于当天
  // 这个阀值不确定，暂定 6，后续可能需要更改
  return hour >= overtimeStart || hour <= 6
}

module.exports = getTimeOver
