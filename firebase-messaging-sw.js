// firebase-messaging-sw.js（放在 repo 根）
// 以 compat 版本在 SW 內啟用 Messaging 最單純
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

// 背景訊息顯示（頁面關閉/背景時）
messaging.onBackgroundMessage((payload) => {
  const title = payload?.notification?.title || '通知';
  const body  = payload?.notification?.body || '';
  const icon  = '/CCpaka/icon-192.png';           // 你的網站 icon
  const url   = payload?.fcmOptions?.link || '/CCpaka/';
  self.registration.showNotification(title, { body, icon, data: { url } });
});

// 點通知開啟你的打卡頁
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const url = event.notification?.data?.url || '/CCpaka/';
  event.waitUntil(clients.openWindow(url));
});
