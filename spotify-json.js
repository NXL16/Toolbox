/*
 * Spotify JSON Patch - Stable 2026
 * Chức năng: Mở khóa License Premium, Hi-Fi và On-demand play
 */

let url = $request.url;
console.log(`[Spotify-JSON] Checking: 2026.04.01`);

if (!$response || !$response.body) {
    console.log(`[Spotify-JSON] Response rỗng hoặc không có body: ${url}`);
    $done({});
} else {
    try {
        let body = JSON.parse($response.body);

        // --- 1. Patch Device Capabilities (License & Hi-Fi) ---
        if (url.includes("/device-capabilities/v1/capabilities")) {
            console.log('--- Patching Device Capabilities ---');

            body.effective_license = 'premium';

            // Khởi tạo object nếu chưa tồn tại để tránh lỗi undefined
            if (!body.supports_hifi) {
                body.supports_hifi = {};
            }
            body.supports_hifi.fully_supported = true;
            body.supports_hifi.user_eligible = true;

            // body.audio_quality = 'HIFI_24'; // Option cho tương lai
            console.log('--- Patch Capabilities Done ---');
        }

        // --- 2. Patch Metadata (Chọn bài tự do cho Album/Artist) ---
        if (url.includes("/artistview/v1/artist") || url.includes("/album-entity-view/v2/album")) {
            console.log('--- Patching Metadata (On-demand) ---');

            if (body.capabilities) {
                body.capabilities.can_play_on_demand = true;
                body.capabilities.can_skip = true;
            }
            if (body.unrestricted !== undefined) {
                body.unrestricted = true;
            }
            console.log('--- Patch Metadata Done ---');
        }

        $done({ body: JSON.stringify(body) });

    } catch (e) {
        console.log(`[Spotify-JSON] Lỗi thực thi: ${e}`);
        $done({}); // Trả về dữ liệu gốc nếu có lỗi parse
    }
}
