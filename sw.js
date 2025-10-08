// 這段是最簡的版本，不會快取、不會離線，只做「單一實例」的啟用
self.addEventListener('install', e => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));
