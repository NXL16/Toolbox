let obj = JSON.parse($response.body);

if (obj && obj.subscriber) {
    const originalDate = "2024-10-04T19:12:20Z";
    const expirationDate = "2099-12-31T23:59:59Z";
    const productID = "com.locket02.premium.yearly";

    const goldData = {
        "expires_date": expirationDate,
        "purchase_date": originalDate,
        "original_purchase_date": originalDate,
        "product_identifier": productID,
        "ownership_type": "PURCHASED",
        "store": "app_store"
    };

    obj.subscriber.entitlements = { "Gold": goldData, "gold": goldData, "premium": goldData };
    obj.subscriber.subscriptions = {};
    obj.subscriber.subscriptions[productID] = {
        ...goldData,
        "is_sandbox": false
    };
}

$done({body: JSON.stringify(obj)});
