// RevenueCat Bypass Script - Hosted by NXL16
// Targeting: Locket Gold & Premium Apps

const appMapping = {
  '%E8%BD%A6%E7%A5%A8%E7%A5%A8': ['vip+watch_vip'],
  'Locket': ['Gold']
};

let ua = $request.headers["User-Agent"] || $request.headers["user-agent"];
let obj = JSON.parse($response.body);

const subscriptionData = {
    auto_resume_date: null,
    display_name: "Premium Plus",
    is_sandbox: false,
    ownership_type: "PURCHASED",
    billing_issues_detected_at: null,
    management_url: "https://apps.apple.com/account/subscriptions",
    period_type: "normal",
    price: { "amount": 399000.0, "currency": "VND" },
    expires_date: "2099-12-31T23:59:59Z",
    original_purchase_date: "2024-10-04T19:12:20Z",
    purchase_date: "2024-10-04T19:12:20Z",
    store: "app_store",
    store_transaction_id: "2000001108724193",
};

const entitlementData = {
    grace_period_expires_date: null,
    purchase_date: "2024-10-04T19:12:20Z",
    product_identifier: "locket_1600_1y",
    expires_date: "2099-12-31T23:59:59Z"
};

const match = Object.keys(appMapping).find(e => ua.includes(e));

if (match) {
  let [entitlement, subId] = appMapping[match];
  if (subId) {
      entitlementData.product_identifier = subId;
      obj.subscriber.subscriptions[subId] = subscriptionData;
  } else {
      obj.subscriber.subscriptions["locket_1600_1y"] = subscriptionData;
  }
  obj.subscriber.entitlements[entitlement] = entitlementData;
} else {
  // Fallback default
  obj.subscriber.subscriptions["locket_1600_1y"] = subscriptionData;
  obj.subscriber.entitlements.Gold = entitlementData;
  obj.subscriber.entitlements.pro = entitlementData;
}

$done({ body: JSON.stringify(obj) });
