let url = $request.url;
const method = $request.method;
console.log(`spotifyjson2-2026.03.04`);
if (!$response.body) {
    console.log(`$response.body为undefined:${url}`);
    $done({});
}
let body = JSON.parse($response.body);

if (url.includes("/device-capabilities/v1/capabilities")) {
    console.log('capabilities');
    body.effective_license = 'premium';
    body.audio_quality = 'VERY_HIGH'
}

body = JSON.stringify(body);
$done({
    body
});
