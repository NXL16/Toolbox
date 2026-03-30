// SoundCloud Go+ Premium Unlock
// Author: NXL16

let obj = JSON.parse($response.body);

// Inject Premium Plan Information
obj.plan = {
    "vendor": "apple",
    "id": "high_tier",
    "manageable": true,
    "plan_id": "go-plus",
    "plan_name": "SoundCloud Go+"
};

// Override Feature Flags
obj.features = [
    { "name": "offline_sync", "enabled": true, "plans": ["mid_tier", "high_tier"] },
    { "name": "no_audio_ads", "enabled": true, "plans": ["mid_tier", "high_tier"] },
    { "name": "hq_audio", "enabled": true, "plans": ["high_tier"] },
    { "name": "system_playlist_in_library", "enabled": true, "plans": [] },
    { "name": "ads_krux", "enabled": false, "plans": [] },
    { "name": "new_home", "enabled": true, "plans": [] }
];

console.log("[SoundCloud] Go+ Features Injected Successfully.");
$done({ body: JSON.stringify(obj) });
