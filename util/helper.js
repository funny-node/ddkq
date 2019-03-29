/**
 * 日期格式化
 */
module.exports.formateTime = function(year, month, day) {
  return [year, String(month).padStart(2, '0'), String(day).padStart(2, '0')].join('-')
}

