let url = $request.url;
const method = $request.method;

console.log(`[Spotify-JSON] Checking: 2026.04.01`);

if (!$response || !$response.body) {
    console.log(`[Spotify-JSON] Response body rỗng: ${url}`);
    $done({});
} else {
    try {
        let body = JSON.parse($response.body);

        if (url.includes("/device-capabilities/v1/capabilities")) {
            console.log('--- Đang Patch Device Capabilities ---');

            // 1. Ép kiểu giấy phép thiết bị thành Premium
            body.effective_license = 'premium';

            // 2. Mở khóa Hi-Fi (Lossless)
            // Sử dụng cách gán trực tiếp để đảm bảo luôn tồn tại object
            if (!body.supports_hifi) {
                body.supports_hifi = {};
            }
            body.supports_hifi.fully_supported = true;
            body.supports_hifi.user_eligible = true;

            // 3. Mở khóa chất lượng âm thanh cao nhất (Option)
            // body.audio_quality = 'HIFI_24'; 

            console.log('--- Patch Capabilities Hoàn tất ---');
        }

        $done({ body: JSON.stringify(body) });

    } catch (e) {
        console.log(`[Spotify-JSON] Lỗi thực thi: ${e}`);
        $done({});
    }
}
