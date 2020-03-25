const _ = require("lodash");
const moment = require("moment");
const melodong = require("../services/melodong");

let config = {};

config.mongoose = {
  uri: "mongodb://47.244.181.166:27017/offerDB",
  option: {
    useNewUrlParser: true,
    poolSize: 200,
    socketTimeoutMS: 5 * 60 * 1000,
    keepAlive: true,
    reconnectTries: 30,
    reconnectInterval: 500
  }
}

config.partnerList = [
  {
    partner: _.partial(melodong, "3a4f8687-fd69-48e9-84ea-c6ae6d8cef8c", "melodong"),
    name: 'melodong',
    next: moment().unix(),
    type: 4
  }
];

config.LOG4JSCONFIG = require('./log/LOG4JSCONFIG');

config.melodongData = [{
  offer_id: 0,
  advertiser_id: 23,
  name: "CPI - Airbnb - ios(CN) - IDFA - NoCPA-Private to Naomi 06link",
  status: "Active",
  expire_date: "2020/09/01",
  type: "Mobile",
  conversion_point: "Download and Install",
  preview_url: "https://itunes.apple.com/app/id401626263",
  url: "http://api.melodong.com/api/v4/click?campaign_id=38372&publisher_id=1946&rt=200309040946&_po=b1cbe6bc3405433d40219d6e6e18e672&_mw=ap&_c=30&_cw=p&_ad=1024&app_name=&sub_1={TID}&pub_idfa={DEVICE_ID}",
  access_type: "Need Approval",
  ssl: 1,//0 disable ,1 enable 
  tracking_protocol: "Server Postback URL",
  currency: 1,
  payout_type: "CPI",//CPA/CPC/CPS/CPI/CPA+CPS/CPL
  payout: 1.7,//?
  payout_percent: 0.7,//?
  revenue_type: "RPS",//RPA/RPC/RPS/RPI/RPA+RPS/RPL
  revenue: 0.1,//?
  revenue_percent: 0.1,//?
  need_security_token: 0,//0 OFF ,1 ON
  force_unique: 0,//0 OFF ,1 ON
  session_lifespan: "1 Day",//1 Day/1 Week/2 Weeks/1 Month
  hide_referrer: 0,//0 OFF ,1 ON
  secondary_offer: 0,
  description: "全球最大的特色民宿短租、度假公寓预订平台，千万旅游达人、旅行攻略力荐 - 来 Airbnb 爱彼迎找到你心仪的民宿房源！Airbnb 爱彼迎在国内外有超过 600 万特色房源，民宿、短租公寓、连锁酒店、客栈，覆盖全球超过 191 个国家和地区，不管去哪儿旅行度假、商务出行，都能住进旅途中的家！无论是日本民宿、台湾民宿、巴黎民宿、冰岛民宿、澳大利亚度假民宿，还是东京旅馆、泰国度假酒店、巴厘岛旅游客栈，无论去北京、上海、广州出差实习住民宿和短租公寓，还是去重庆、成都旅行住当地民宿，无论去大理丽江...",
  restriction: "",
  has_cap_limit: 0,//0 OFF ,1 ON
  cap_type: "Budget",//Budget/Conversion
  cap_event_range: "All",//All/Initial
  cap_overall_limit: -1,//-1: no limit
  cap_interval: "Daily",//Daily/Weekly/Monthly
  cap_interval_limit: 30,//-1: no limit
  cap_affiliate_overall_limit: -1,//-1: no limit
  cap_affiliate_interval: "Daily",//Daily/Weekly/Monthly
  cap_affiliate_interval_limit: -1,//-1: no limit
  device_targeting: 0,//0 OFF ,1 ON
  device_rules: ["1:OS:iOS"],
  device_redirect_offer_id: 0,
  geo_targeting: 0,//0 OFF ,1 ON
  geo_type: 1,//0: exclude ,1: include
  geo_countries: ["CN:1"],
  geo_enforce: 0,//0 OFF ,1 ON
  geo_redirect_type: 0,//0: offer  1: geo offer group
  geo_redirect_target_id: 0,
  app_id: 401626263,
  categories: ["Travel"],
  advertiser_offer_id: "",
  traffic_type: "Non-Incent"
},{
  offer_id: 0,
  advertiser_id: 23,
  name: "CPI - Airbnb - ios(CN) - IDFA - NoCPA-Private to Naomi 06link",
  status: "Active",
  expire_date: "2020/09/01",
  type: "Mobile",
  conversion_point: "Download and Install",
  preview_url: "https://itunes.apple.com/app/id401626263",
  url: "http://api.melodong.com/api/v4/click?campaign_id=38372&publisher_id=1946&rt=200309040946&_po=b1cbe6bc3405433d40219d6e6e18e672&_mw=ap&_c=30&_cw=p&_ad=1024&app_name=&sub_1={TID}&pub_idfa={DEVICE_ID}",
  access_type: "Need Approval",
  ssl: 1,//0 disable ,1 enable 
  tracking_protocol: "Server Postback URL",
  currency: 1,
  payout_type: "CPI",//CPA/CPC/CPS/CPI/CPA+CPS/CPL
  payout: 1.7,//?
  payout_percent: 0.7,//?
  revenue_type: "RPS",//RPA/RPC/RPS/RPI/RPA+RPS/RPL
  revenue: 0.1,//?
  revenue_percent: 0.1,//?
  need_security_token: 0,//0 OFF ,1 ON
  force_unique: 0,//0 OFF ,1 ON
  session_lifespan: "1 Day",//1 Day/1 Week/2 Weeks/1 Month
  hide_referrer: 0,//0 OFF ,1 ON
  secondary_offer: 0,
  description: "全球最大的特色民宿短租、度假公寓预订平台，千万旅游达人、旅行攻略力荐 - 来 Airbnb 爱彼迎找到你心仪的民宿房源！Airbnb 爱彼迎在国内外有超过 600 万特色房源，民宿、短租公寓、连锁酒店、客栈，覆盖全球超过 191 个国家和地区，不管去哪儿旅行度假、商务出行，都能住进旅途中的家！无论是日本民宿、台湾民宿、巴黎民宿、冰岛民宿、澳大利亚度假民宿，还是东京旅馆、泰国度假酒店、巴厘岛旅游客栈，无论去北京、上海、广州出差实习住民宿和短租公寓，还是去重庆、成都旅行住当地民宿，无论去大理丽江...",
  restriction: "",
  has_cap_limit: 0,//0 OFF ,1 ON
  cap_type: "Budget",//Budget/Conversion
  cap_event_range: "All",//All/Initial
  cap_overall_limit: -1,//-1: no limit
  cap_interval: "Daily",//Daily/Weekly/Monthly
  cap_interval_limit: 30,//-1: no limit
  cap_affiliate_overall_limit: -1,//-1: no limit
  cap_affiliate_interval: "Daily",//Daily/Weekly/Monthly
  cap_affiliate_interval_limit: -1,//-1: no limit
  device_targeting: 0,//0 OFF ,1 ON
  device_rules: ["1:OS:iOS"],
  device_redirect_offer_id: 0,
  geo_targeting: 0,//0 OFF ,1 ON
  geo_type: 1,//0: exclude ,1: include
  geo_countries: ["CN:1"],
  geo_enforce: 0,//0 OFF ,1 ON
  geo_redirect_type: 0,//0: offer  1: geo offer group
  geo_redirect_target_id: 0,
  app_id: 401626263,
  categories: ["Travel"],
  advertiser_offer_id: "",
  traffic_type: "Non-Incent"
}]

module.exports = config;