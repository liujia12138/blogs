### 用van-calendar实现展示指定月份并自定义日期文案

效果图:
<div align="left">
<img src=../static/images/van_calendar.jpg style="width: 300px"/>
</div>

代码：
```
<template>
  <div>
    <van-button icon="notes-o" round type="info" plain size="mini" @click="showPicker = true">
      选择日期<van-icon name="arrow-down" />
    </van-button>

    <van-popup v-model="showPicker" position="bottom">
      <van-datetime-picker
        title="选择日期"
        type="year-month"
        v-model="currentDate"
        :columns-order="['year', 'month', 'day']"
        @confirm="onConfirm"
        @cancel="showPicker = false"
        :formatter="formatter"
        :max-date="maxDate"
      />
    </van-popup>

    <van-calendar
      v-if="this.dataList.length > 0"
      :poppable="false"
      :formatter="formatterCalendar"
      :default-date="defaultDate"
      :min-date="minDate"
      :max-date="calendarMaxDate"
      :show-title="false"
      :show-subtitle="false"
      :show-confirm="false"
      @select="selectDate"
    />
  </div>
</template>

<script>
/**
 * Parse the time to string
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string}
 */
function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if (typeof time === 'string' && /^[0-9]+$/.test(time)) {
      time = parseInt(time)
    }
    if (typeof time === 'number' && time.toString().length === 10) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') {
      return ['日', '一', '二', '三', '四', '五', '六'][value]
    }
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return time_str
}

export default {
  data() {
    return {
      showPicker: false,
      currentDate: new Date(),
      maxDate: new Date(),
      minDate: new Date(),
      calendarMaxDate: new Date(),
      defaultDate: new Date(),
      dataList: [],
      classList: {}
    }
  },
  computed: {
    formatDate() {
      return parseTime(this.currentDate, this.pickerType === 'date' ? '{y}年{m}月{d}日' : '{y}年{m}月')
    }
  },
  created() {
    this.update()
  },
  methods: {
    formatter(type, val) {
      if (type === 'year') {
        return val + '年'
      }
      if (type === 'month') {
        return val + '月'
      }
      if (type === 'day') {
        return val + '日'
      }
      return val
    },
    onConfirm(value) {
      this.showPicker = false
      this.update(value)
    },
    formatterCalendar(day) {
      const date = day.date.getDate()
      const type = this.dataList[date - 1] || ''

      day.bottomInfo = type
      day.className =
        type === '优'
          ? 'level1'
          : type === '良'
          ? 'level2'
          : type === '轻度'
          ? 'level3'
          : type === '中度'
          ? 'level4'
          : type === '重度'
          ? 'level5'
          : 'level6'
      return day
    },
    update(value) {
      this.dataList = ['优', '良', '中度', '重度', '严重', '优', '优', '良', '中度', '重度', '严重']
      this.defaultDate = value || new Date()
      this.setMinMaxDay()
    },
    // 设置显示月份可选择的天数区间
    setMinMaxDay() {
      const year = new Date(this.defaultDate).getFullYear()
      const month = new Date(this.defaultDate).getMonth()
      const lastDay = new Date(year, month + 1, 0)
      this.minDate = new Date(year, month, 1)
      this.calendarMaxDate = lastDay
    },
    selectDate(date) {
      console.log(date)
    }
  }
}
</script>
<style>
.van-calendar__month-title {
  display: none;
}
.van-calendar__day {
  font-size: 12px;
  height: 30px;
  line-height: 30px;
  margin-top: 5px;
}
.van-calendar__selected-day {
  background: #cdcbc8;
  color: #515151;
  height: 30px;
  line-height: 30px;
}
.van-calendar__bottom-info {
  border-radius: 5px;
  font-size: 10px;
  padding: 1px 3px;
  color: #fff;
  position: initial;
  vertical-align: middle;
  margin-left: 5px;
}
.level1 .van-calendar__bottom-info {
  background: #b0cb8f;
}
.level2 .van-calendar__bottom-info {
  background: #f2d875;
}
.level3 .van-calendar__bottom-info {
  background: #e5a74c;
}
.level4 .van-calendar__bottom-info {
  background: #cc6065;
}
.level5 .van-calendar__bottom-info {
  background: #ac4176;
}
.level6 .van-calendar__bottom-info {
  background: #7d1f2c;
}
</style>

```