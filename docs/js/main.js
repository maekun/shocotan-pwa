/**
 * 起動時.js
 */
// service workerが有効なら、service-worker.js を登録します
window.addEventListener('load', function() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register("./sw.js")
      .then(function(registration) {
        // console.log('Service Worker Registered');
        return registration.pushManager.getSubscription()
          .then(function(subscription) {
            if (subscription) {
              return subscription
            }
            return registration.pushManager.subscribe({
              userVisibleOnly: true
            })
          })
      }).then(function(subscription) {
        console.log("pushManager endpoint:", subscription.endpoint) 
      }).catch(function(error) {
        console.warn("serviceWorker error:", error)
      })
  }
});