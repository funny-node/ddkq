# ddkq

**ddkq -> 钉钉考勤**

根据打卡时间表（excel），获取上下班时间，加班时间以及所有打卡时间

## Install

```bash
$ npm install ddkq
```

## Usage

```js
const { getTimeAll, getTimeOn, getTimeOff, getTimeOver } = require('ddkq')
const excels = ['2018.11']

const timeAlls = getTimeAll(excels)
const timeOns = getTimeOn(excels)
const timeOffs = getTimeOff(excels)
const timeOvers = getTimeOver(excels)
```

## API

### getTimeAll(excels[, config])

根据 excels 获取所有打卡时间

* `excels` `{Array}` 格式为 `yyyy-mm`，**值必须与 excels 名一一对应**
* `config` `{Object}`
  * `sorting` `{String}` 默认结果按照 excels 数组顺序排序
    * `'asc'` 结果按照日期升序
    * `'desc'` 结果按照日期降序
  * `excelsPath` `{String}` 默认 excels 放在程序根目录下，**如果放在其他地方，需要手动指定其位置**
* return: `{Array<Object>}` 返回数组，数组内每个对象代表该天详细数据
  * `year` `{Number}` 年
  * `month` `{Number}` 月
  * `day` `{Number}` 日
  * `punchTimes` `{Array<String>}` 该日打卡时间数组，数组值 `hh:mm` 格式
  * `format` `{String}` 格式化时间，格式 `yyyy-mm-dd`

### getTimeOn(excels[, config])

根据 excels 获取所有上班打卡数据

* return: `{Array<Object>}` 返回数组，数组内每个对象代表该天详细数据
  * `year` `{Number}` 年
  * `month` `{Number}` 月
  * `day` `{Number}` 日
  * `time` `{String}` 时间，格式 `hh:mm`
  * `format` `{String}` 格式化时间，格式 `yyyy-mm-dd`
  * `timestamp` `{Number}` 该日上班打卡时间戳

### getTimeOff(excels[, config])

根据 excels 获取所有下班打卡数据

* return: `{Array<Object>}` 返回数组，数组内每个对象代表该天详细数据
  * `year` `{Number}` 年
  * `month` `{Number}` 月
  * `day` `{Number}` 日
  * `time` `{String}` 时间，格式 `hh:mm`
  * `format` `{String}` 格式化时间，格式 `yyyy-mm-dd`
  * `timestamp` `{Number}` 该日下班打卡时间戳

### getTimeOver(excels[, config])

根据 excels 获取所有加班日期数据

其他配置与前几个 API 一样，另外 `config` 可配置 `overtimeStart`，默认 `20`，即 20 点后算当天加班

* `config` `{Object}`
  * `overtimeStart` `{Number}` 默认 20，如果需要配置 20 点半，则为 `20.5`，其他时间雷同
* return: `{Array<Object>}` 返回数组，数组内每个对象代表该天详细数据
  * `year` `{Number}` 年
  * `month` `{Number}` 月
  * `day` `{Number}` 日
  * `time` `{String}` 时间，格式 `hh:mm`
  * `format` `{String}` 格式化时间，格式 `yyyy-mm-dd`
  * `timestamp` `{Number}` 该加班日下班打卡时间戳

## License

MIT