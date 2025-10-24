self.addEventListener('install', e => self.skipWaiting());
self.addEventListener('activate', e => self.clients.claim());
// 不攔截導覽，先完全當作沒 SW：讓瀏覽器照常請求 /CCpaka/ 路徑
