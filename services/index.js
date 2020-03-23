const { partnerList, melodongData } = require("../config/config");
const _ = require("lodash");
const offerDB = require("../models/Offer");
const rp = require('request-promise');
const LocalLogger = require("../utils/LocalLogger");
const log = LocalLogger.getLogger("service_partners");

class Partners {
  async taskManager() {
    log.debug("start taskManager method");
    let that = this;
    let tasks = [];
    try {
      _.each(partnerList, function (item) {
        //根据item['type']和item['next']调整各个partner的调用时间
        tasks.push(that.getData(item.partner, item.name));
        //更新条件标记
        //打印日志
      });
      log.debug("end taskManager method");
      return Promise.all(tasks);
    }
    catch (err) {
      log.error("taskManager err:", err.message);
    }
  }
  async getData(partner, name) {
    log.debug("start getData method");
    // log.debug("partner:", partner);
    log.debug("name:", name);
    try {
      let data = await partner();
      if (!data || (data && data.length === 0)) {
        //updateOfferActiveByProvider([name])
        log.debug("end getData method");
        return [];
      } else if (data && data.length > 0) {
        log.debug("end getData method");
        return this.commonOperatesCompare(data, name);
      } else {
        log.debug("end getData method");
        return [];
      }
    }
    catch (err) {
      log.error("getData err:", err.message);
    }
  }
  async commonOperatesCompare(data, name) {
    log.debug("start commonOperatesCompare method");
    log.debug("data:", data);
    log.debug("name:", name);
    let validAdidArr = [];
    let newArr = [];
    let updateArr = [];
    try {
      for (let i = 0; i < data.length; i++) {
        let item = data[i];
        if (item && item.ad_id) {
          let obj = await this.findByAdid(item.ad_id);
          if (obj) {
            if (!(this.objectMatch(obj, item))) {
              _.assign(item, { id: obj.id });
              updateArr.push(item);
            }
            validAdidArr.push(obj.ad_id);
          } else {
            newArr.push(item);
          }
        }
      }
      //上线或者新增
      if (newArr.length) {
        // let newAd_ids = [];
        // _.each(newArr, function (item) {
        //   newAd_ids.push(item.ad_id);
        // });
        // //更新老数据的上线
        // await offerDB.update(
        //   { ad_id: { $in: newAd_ids } },
        //   { $set: { status: "Active" } },
        //   { upsert: false }
        // )

        //新数据直接新增
        let result = await offerDB.insertMany(newArr);
        await this.bulkSend(newArr, result);
      }
      //更新
      if (updateArr.length) {
        let ops = [];
        _.each(updateArr, function (item) {
          ops.push({
            updateOne: {
              filter: {
                id: item.id
              },
              update: {
                "$set": item
              }
            }
          })
        });
        await offerDB.bulkWrite(ops)
        await this.bulkSend(updateArr, []);
      }
      //批量下线
      if (validAdidArr.length) {
        let query = { ad_id: { $nin: validAdidArr }, advertiser_id: data[0].advertiser_id };
        let fields = "id";
        let update = { $set: { status: "Paused" } };
        let invalidArr = await offerDB.find(query, fields, { lean: true });
        if (invalidArr && invalidArr.length > 0) {
          await offerDB.update(query, update, { multi: true });
          invalidArr = _.map(invalidArr, item => {
            return _.assign(item, { status: "Paused" });
          })
          await this.bulkSend(invalidArr, []);
        }
      }
      log.debug("end commonOperatesCompare method");
      return "";
    }
    catch (err) {
      log.error("commonOperatesCompare err:", err.message);
    }
  }
  objectMatch(ref, obj) {
    log.debug("start objectMatch method");
    log.debug("ref:", ref);
    log.debug("obj:", obj);
    let result = true;
    _.each(obj, function (v, k) {
      if (k == "_id" || k == "to_email") {
        return;
      };
      if ((_.isUndefined(v) || _.isNull(v) || !v) && (_.isUndefined(ref[k]) || _.isNull(ref[k]) || !ref[k])) {
        return;
      }
      if (!_.isEqual(ref[k], v)) {
        result = false;
      };
    })
    log.debug("end objectMatch method:", result);
    return result;
  }
  // async find() {
  //   try {
  //     return offerDB.find({}, {}, { lean: true });
  //   }
  //   catch (err) {
  //     console.log("err:", err.message);
  //   }
  // }
  async findByAdid(adid) {
    log.debug("start findByAdid method");
    log.debug("adid:", adid);
    try {
      let offer = await offerDB.findOne({ ad_id: adid }, {}, { lean: true });
      log.debug("end findByAdid method:", offer);
      return offer;
    }
    catch (err) {
      log.error("findByAdid err:", err.message);
    }
  }
  async updateOfferId(id, offerId) {
    log.debug("start updateOfferId method");
    log.debug("id:", id);
    log.debug("offerId:", offerId);
    try {
      let result = await offerDB.findOneAndUpdate({ _id: id }, { id: offerId });
      log.debug("end updateOfferId method");
      return result;
    }
    catch (err) {
      log.error("updateOfferId err:", err.message);
    }
  }
  // async updateOffer(data) {
  //   try {
  //     let query = _.pick(data, ["offer_id"]);
  //     let update = _.omit(data, ["offer_id"]);
  //     return offerDB.findOneAndUpdate(query, update);
  //   }
  //   catch (err) {
  //     console.log("err:", err.message);
  //   }
  // }
  async send(data, ref) {
    log.debug("start send method");
    log.debug("data:", data);
    log.debug("ref:", ref);
    if (ref) {
      _.assign(data, { _id: ref._id });
    }
    if (!data.id) {
      data = _.omit(data, ["id"]);
    }
    let _id = data._id;
    data = _.omit(data, ["_id", "ad_id"]);
    let option = {
      uri: "http://airpush.fuseclick.com/api/v2/setOffer?key=67A195D1256FAFCD08633BFA77342B7C",
      method: "POST",
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      // body: data,
      form: data,
      // json: true
    };
    try {
      let result = await rp(option);
      result = JSON.parse(result);
      if (result && result.httpStatus === 201) {
        //creating
        let offerId = result.data[0].id;
        await this.updateOfferId(_id, offerId);
      } else if (result && result.httpStatus === 202) {
        //updating
        // await this.updateOffer(data);
      } else { }
      log.debug("end send method");
    }
    catch (err) {
      log.error("send err:", err.message);
    }
  }
  async bulkSend(datas, refs) {
    log.debug("start bulkSend method");
    log.debug("datas:", datas);
    log.debug("refs:", refs);
    let tasks = [];
    try {
      for (let i = 0; i < datas.length; i++) {
        tasks.push(this.send(datas[i], refs[i]));
      }
      await Promise.all(tasks);
      log.debug("end bulkSend method");
    }
    catch (err) {
      log.error("bulkSend err:", err.message);
    }
  }
  async rmInvalidData() {
    log.debug("start rmInvalidData method");
    try {
      let result = await offerDB.remove({ id: null });
      log.debug("end rmInvalidData method:", result);
      return result;
    }
    catch (err) {
      log.error("rmInvalidData err:", err.message);
    }
  }
}

module.exports = new Partners();