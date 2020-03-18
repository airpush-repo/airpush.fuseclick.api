const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  offer_id: { type: Number, default: null },
  advertiser_id: { type: Number, default: 0 },
  name: { type: String, default: "" },
  status: { type: String, default: "" },//Active/Pending/Paused/Archived
  expire_date: { type: String, default: "" },//2018/09/01
  type: { type: String, default: "" },//Desktop/Mobile/Tablet
  conversion_point: { type: String, default: "" },//Email Submit/DOI/SOI/Download and Install/ etc.
  preview_url: { type: String, default: "" },
  url: { type: String, default: "" },
  access_type: { type: String, default: "" },//Public/Need Approval/Private
  ssl: { type: Number, default: 0 },//0 disable ,1 enable 
  tracking_protocol: { type: String, default: "" },
  currency: { type: Number, default: 0 },
  payout_type: { type: String, default: "" },//CPA/CPC/CPS/CPI/CPA+CPS/CPL
  payout: { type: Number, default: 0 },//?
  payout_percent: { type: Number, default: 0 },//?
  revenue_type: { type: String, default: "" },//RPA/RPC/RPS/RPI/RPA+RPS/RPL
  revenue: { type: Number, default: 0 },//?
  revenue_percent: { type: Number, default: 0 },//?
  need_security_token: { type: Number, default: 0 },//0 OFF ,1 ON
  force_unique: { type: Number, default: 0 },//0 OFF ,1 ON
  session_lifespan: { type: String, default: "" },//1 Day/1 Week/2 Weeks/1 Month
  hide_referrer: { type: Number, default: 0 },//0 OFF ,1 ON
  secondary_offer: { type: Number, default: 0 },
  description: { type: String, default: "" },
  restriction: { type: String, default: "" },
  has_cap_limit: { type: Number, default: 0 },//0 OFF ,1 ON
  cap_type: { type: String, default: "" },//Budget/Conversion
  cap_event_range: { type: String, default: "All" },//All/Initial
  cap_overall_limit: { type: Number, default: 0 },//-1: no limit
  cap_interval: { type: String, default: "" },//Daily/Weekly/Monthly
  cap_interval_limit: { type: Number, default: 0 },//-1: no limit
  cap_affiliate_overall_limit: { type: Number, default: 0 },//-1: no limit
  cap_affiliate_interval: { type: String, default: "All" },//Daily/Weekly/Monthly
  cap_affiliate_interval_limit: { type: Number, default: 0 },//-1: no limit
  device_targeting: { type: Number, default: 0 },//0 OFF ,1 ON
  device_rules: { type: Array, default: [] },
  device_redirect_offer_id: { type: Number, default: 0 },
  geo_targeting: { type: Number, default: 0 },//0 OFF ,1 ON
  geo_type: { type: Number, default: 0 },//0: exclude ,1: include
  geo_countries: { type: Array, default: [] },
  geo_enforce: { type: Number, default: 0 },//0 OFF ,1 ON
  geo_redirect_type: { type: Number, default: 0 },//0: offer  1: geo offer group
  geo_redirect_target_id: { type: Number, default: 0 },
  app_id: { type: String, default: "" },
  categories: { type: Array, default: [] },
  advertiser_offer_id: { type: String, default: "" },
  traffic_type: { type: String, default: "" },
  ad_id: { type: String, default: "" },
}, {
  versionKey: false,
  timestamps: false,
});

module.exports = db.model("offer", schema, "offer");