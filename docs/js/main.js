/**
 * 起動時.js
 */
const messaging = firebase.messaging();

if ('serviceWorker' in navigator) {
  // サービスワーカーの登録
  navigator.serviceWorker.register('./js/sw.js').then((registration) => {
    // サービスワーカー登録成功
    console.log('ServiceWorker registration successful with scope: ', registration.scope);
    // 今回はこのサービスワーカーを指定します
    messaging.useServiceWorker(registration);
    // 通知の受信許可を確認する
    messaging.requestPermission()
      .then(() => {
        console.log('Notification permission granted.');
        // トークンを取得する
        messaging.getToken()
          .then((currentToken) => {
            // 今回はコンソールに出力して取得します。実運用では適切な方法で保管する必要があります。
            if (currentToken) {
              console.log(currentToken);
            } else {
              console.log('No Instance ID token available. Request permission to generate one.');
            }
          })
          .catch((err) => {
            console.log('An error occurred while retrieving token. ', err);
          });
      })
      .catch((err) => {
          console.log('Unable to get permission to notify.', err);
      });
  }).catch((err) => {
    // サービスワーカー登録失敗
    console.log('ServiceWorker registration failed: ', err);
  });
}