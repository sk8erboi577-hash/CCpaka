self.addEventListener('install', e => self.skipWaiting());
self.addEventListener('activate', e => self.clients.claim());
// 不攔截導覽，先完全當作沒 SW：讓瀏覽器照常請求 /CCpaka/ 路徑

/* =======================
   你的 PWA 快取/離線邏輯 …
   （保留你原本 sw.js 的內容）
   ======================= */

// 常見：宣告一個版本，讓 SW 更新時能立即接管
self.addEventListener('install', (event) => {
  self.skipWaiting(); // 立刻啟用新 SW
});
self.addEventListener('activate', (event) => {
  event.waitUntil(clients.claim()); // 立刻接管所有頁面
});

/* =======================
   👉 FCM 區塊開始（data-only）
   ======================= */
importScripts('https://www.gstatic.com/firebasejs/10.13.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.13.1/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyBI09r-_a-sCnuCpiBfZLJQqGDK08TkieI",
  authDomain: "paka-push.firebaseapp.com",
  projectId: "paka-push",
  storageBucket: "paka-push.firebasestorage.app",
  messagingSenderId: "1039244883323",
  appId: "1:1039244883323:web:b964319fdc14ce3e2cf9de"
});

const messaging = firebase.messaging();

// 只處理 data-only 訊息，這樣不會跟系統自動通知重複
messaging.onBackgroundMessage(({ data }) => {
  const title = data?.title || '通知';
  const body  = data?.body  || '';
  const url   = data?.url   || '/CCpaka/';

  self.registration.showNotification(title, {
    body,
    icon: '/CCpaka/icon-192.png',
    data: { url } // 讓 notificationclick 能取到
  });
});

// 點通知 → 回到既有分頁或開新分頁
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const url = event.notification?.data?.url || '/CCpaka/';
  event.waitUntil((async () => {
    const all = await clients.matchAll({ type: 'window', includeUncontrolled: true });
    // 若已有同站分頁就聚焦，否則開新
    for (const c of all) {
      if (c.url.includes('/CCpaka/')) { await c.focus(); return; }
    }
    await clients.openWindow(url);
  })());
});
/* =======================
   👉 FCM 區塊結束
   ======================= */
