const _ = require("lodash");
const rp = require('request-promise');
const LocalLogger = require("../utils/LocalLogger");
const log = LocalLogger.getLogger("api_melodong");

module.exports = async function (token, name) {
  log.debug(`start ${name} api request`);
  log.debug("token:", token);
  let option = {
    url: `http://api.melodong.com/api/campaigns/v2?token=${token}&publisher_id=1946`,
    method: "GET",
    json: true
  };
  try {
    let data = await rp(option);
    let objs = [];
    if (data && data.Statuscode === 200) {
      let campaigns = data.campaigns || [];
      _.each(campaigns, function (item, key) {
        let obj = {};
        obj["advertiser_id"] = 23;
        obj["name"] = item.campaign_name;
        obj["status"] = "Active";
        obj["expire_date"] = "2020/09/01";
        obj["type"] = "Mobile";
        obj["url"] = item.tracking_link + "&sub_1={TID}&pub_idfa={DEVICE_ID}";
        obj["access_type"] = "Need Approval";
        obj["ssl"] = 0;
        obj["tracking_protocol"] = "Server Postback URL";
        obj["currency"] = 1;
        obj["payout_type"] = item.payout_type;
        obj["payout"] = parseFloat(item.payout) * 0.7; //CPA/CPC/CPS/CPI/CPA+CPS/CPL        
        obj["payout_percent"] = 0.7;
        if (item.payout_type === "CPA") {
          obj["revenue_type"] = "RPA";//RPA/RPC/RPS/RPI/RPA+RPS/RPL  待确认
        } else if (item.payout_type === "CPC") {
          obj["revenue_type"] = "RPC";
        } else if (item.payout_type === "CPS") {
          obj["revenue_type"] = "RPS";
        } else if (item.payout_type === "CPI") {
          obj["revenue_type"] = "RPI";
        } else if (item.payout_type === "CPL") {
          obj["revenue_type"] = "RPL";
        }
        obj["revenue"] = parseFloat(item.payout);
        obj["revenue_percent"] = 0.1;
        obj["need_security_token"] = 0;//0 OFF ,1 ON
        obj["force_unique"] = 0;
        obj["session_lifespan"] = "1 Day";//1 Day/1 Week/2 Weeks/1 Month
        obj["hide_referrer"] = 0;//0 OFF ,1 ON
        obj["secondary_offer"] = 0;
        obj["restriction"] = "";
        obj["has_cap_limit"] = 0;//0 OFF ,1 ON
        obj["cap_type"] = "Budget";
        if (item.download_type === "Download") {
          obj["conversion_point"] = "Download and Install";
        }
        if (item.product_info) {
          obj["preview_url"] = item.product_info.preview_link;
          obj["description"] = item.product_info.description;
          obj["app_id"] = item.product_info.package_id;
          obj["categories"] = [item.product_info.category];
          obj["ad_id"] = `${name}_${item.id}_${obj.app_id}`;
        }
        obj["cap_event_range"] = "All";//All/Initial
        obj["cap_overall_limit"] = -1;//-1: no limit
        if (item.day_cap === 30) {
          obj["cap_interval"] = "Daily";//Daily/Weekly/Monthly
          obj["cap_interval_limit"] = item.day_cap;
        }

        obj["cap_affiliate_overall_limit"] = -1;//-1: no limit
        obj["cap_affiliate_interval"] = "Daily";//Daily/Weekly/Monthly
        obj["cap_affiliate_interval_limit"] = -1;//-1: no limit

        obj["device_redirect_offer_id"] = 0;

        if (item.targeting) {
          obj["device_targeting"] = 1;//0 OFF ,1 ON
          if (item.targeting.platform) {
            obj["device_rules"] = [`1:OS:${item.targeting.platform}`];  //["1:OS:iOS"],
          }
          if (item.targeting.min_os_version) {

          }
          if (item.targeting.geo && item.targeting.geo.length > 0) {
            obj["geo_targeting"] = 1;//0 OFF ,1 ON
            obj["geo_type"] = 1;//0: exclude ,1: include
            let geos = [];
            for (let i = 0; i < item.targeting.geo.length; i++) {
              geos.push(`${item.targeting.geo[i]}:1`)
            }
            obj["geo_countries"] = geos;//["CN:1"],
          }
        } else {
          obj["device_targeting"] = 0;//0 OFF ,1 ON
        }
        obj["geo_enforce"] = 0;//0 OFF ,1 ON
        obj["geo_redirect_type"] = 0;//0: offer  1: geo offer group
        obj["geo_redirect_target_id"] = 0;
        obj["advertiser_offer_id"] = "";
        obj["traffic_type"] = "Non-Incent";
        objs.push(obj);
      })
    }
    log.debug(`end ${name} api request:`, objs);
    return objs;
  }
  catch (err) {
    log.error(`${name} api request err:`, err.message);
    return [];
  }
}