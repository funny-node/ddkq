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
// 
const excels = ['2018.11']

// 获取所有打卡时间
const timeAlls = getTimeAll(excels)

// 获取上班打卡时间
const timeOns = getTimeOn(excels)

// 获取下班打卡时间
const timeOffs = getTimeOff(excels)

// 获取加班时间
const timeOvers = require(excels)
```

## API

### getTimeAll(excels[, config])


