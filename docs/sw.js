/**
 * service-worker.js
 */
// self.addEventListener('install', (e) => {
//   console.log('[ServiceWorker] Install');
// });

// self.addEventListener('activate', (e) => {
//   console.log('[ServiceWorker] Activate');
// });

// // 現状では、この処理を書かないとService Workerが有効と判定されないようです
// self.addEventListener('fetch', (event) => {});

self.addEventListener("push", (event) => {
  event.waitUntil(
    self.registration.pushManager.getSubscription()
      .then((subscription) => {
          if (subscription) {
            return subscription.endpoint
          }
          throw new Error('User not subscribed')
      })
      .then((res) => {
        return fetch('./notifications.json')
      })
      .then((res) => {
        if (res.status === 200) {
          return res.json()
        }
        throw new Error('notification api response error')
      })
      .then((res) => {
        return self.registration.showNotification(res.title, {
          icon: './image/p-chan.png',
          body: res.body
        })
      })
  )
})