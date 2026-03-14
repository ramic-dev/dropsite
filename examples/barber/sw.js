/* dropsite service worker — suppresses 404 console errors from content discovery */
self.addEventListener('install', function() { self.skipWaiting(); });
self.addEventListener('activate', function(e) { e.waitUntil(self.clients.claim()); });
self.addEventListener('fetch', function(e) {
    /* only intercept same-origin requests (content discovery);
       let cross-origin CDN resources (CSS, fonts, icons) pass through */
    if (new URL(e.request.url).origin !== self.location.origin) return;

    e.respondWith(
        fetch(e.request).then(function(res) {
            if (res.ok) {
                /* fix missing MIME for SVG (some static servers send octet-stream) */
                if (e.request.url.endsWith('.svg') && (res.headers.get('Content-Type') || '').indexOf('svg') === -1) {
                    return new Response(res.body, {
                        status: res.status,
                        headers: { 'Content-Type': 'image/svg+xml' }
                    });
                }
                return res;
            }
            /* replace error responses with empty 200 + marker header */
            return new Response('', {
                status: 200,
                headers: { 'X-Dropsite-Empty': '1', 'Content-Type': 'text/plain' }
            });
        }).catch(function() {
            return new Response('', {
                status: 200,
                headers: { 'X-Dropsite-Empty': '1', 'Content-Type': 'text/plain' }
            });
        })
    );
});
