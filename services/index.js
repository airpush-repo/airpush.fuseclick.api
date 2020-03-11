const partnerList = require("../config/config").partnerList;
const _ = require("lodash");

class Partners {
  taskManager() {
    let that = this;
    _.each(partnerList, function (item) {
      //根据item['type']和item['next']调整各个partner的调用时间
      that.getData(item.partner, item.name, function () {
        //更新条件标记
        //打印日志
      })
    })
  }
  getData(partner, name, cb) {
    partner(function (err, data) {
      if (err) {
        //打印错误日志
        cb(null);
      }      
      if (!data || (data && data.length == 0)) {        
        //updateOfferActiveByProvider([name])
        cb(null);
      }
      if (data && data.length > 0) {
        console.log("data:", data)
        //commonOperatesCompare(data, name, cb)
      }
      cb(null);
    })
  }
}

module.exports = new Partners();