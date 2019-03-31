const xlsx = require('xlsx')
const path = require('path')
const appDir = path.dirname(require.main.filename)
const { formateTime } = require('./../util/helper')

/**
 * 根据 excel 中的列，获取周末日期（周末默认在 excel 显示 '六', '日'）
 * @param {*} col
 * @param {*} sheet
 */
function getTheDateOfWeekend(col, sheet) {
  // 往前找
  let tmp = col 
  while (tmp) {
    let cell_ref_day = xlsx.utils.encode_cell({c: tmp, r: 2})
    let day = sheet[cell_ref_day].v
    if (!isNaN(day)) return +day + col - tmp
    tmp -= 1
  }

  // 往后找
  tmp = col 
  while (tmp) {
    let cell_ref_day = xlsx.utils.encode_cell({c: tmp, r: 2})
    let day = sheet[cell_ref_day].v
    if (!isNaN(day)) return +day - (tmp - col)
    tmp += 1
  }
}

/**
 * 将数据根据日期升序或者降序排列
 * @param {Array} ret 
 * @param {String} sorting 
 */
function reorder(ret, sorting) {
  if (!sorting) {
    return ret
  } else if (sorting === 'asc') { // 升序
    ret.sort((a, b) => {
      if (a.year !== b.year) return a.year - b.year 
      else if (a.month !== b.month) return a.month - b.month 
      else return a.day - b.day
    })
  } else if (sorting === 'desc') { // 降序
    ret.sort((a, b) => {
      if (a.year !== b.year) return b.year - a.year 
      else if (a.month !== b.month) return b.month - a.month 
      else return b.day - a.day
    })
  } else {
    throw new Error('参数错误')
  }

  return ret
}

/**
 * 根据 excels，获取所有打卡时间
 * @param {Array} excels 
 * @param {Object} config 选填，可设置 sorting
 */
function getTimeAll(excels, config = {}) {
  const { excelsPath = './' } = config 

  // 保存数据
  const ret = []

  excels.forEach(excel_name => {
    const [year, month] = excel_name.split('-').map(item => +item)
    const workbook = xlsx.readFileSync(path.join(appDir, excelsPath, `./${excel_name}.xlsx`))
    const firstSheetName = workbook.SheetNames[0]
    const sheet = workbook.Sheets[firstSheetName]

    const range = xlsx.utils.decode_range(sheet['!ref'])
    const [col_start, col_end] = [5, range.e.c]

    for(let C = col_start; C <= col_end; ++C) {
      let cell_ref = xlsx.utils.encode_cell({c: C, r: 3})
      let cell_ref_day = xlsx.utils.encode_cell({c: C, r: 2})

      if (sheet[cell_ref]) {
        // 当天所有打卡时间
        const punchTimes = sheet[cell_ref].v.split('\n').map(item => item.trim())

        // 当天的日
        let day = +sheet[cell_ref_day].v
        
        // 如果是周末，重新计算日（周末在 excel 默认显示 '六' '日'）
        isNaN(day) && (day = getTheDateOfWeekend(C, sheet))

        ret.push({
          year,
          month,
          day,
          punchTimes,
          format: formateTime(year, month, day)
        })
      }
    }
  }) 
  
  return reorder(ret, config.sorting)
}

module.exports = getTimeAll
