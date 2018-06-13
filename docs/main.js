/**
 * 起動時.js
 */
// Initialize Firebase
const config = {
  apiKey: "AIzaSyDde1epM6vV3Gv9YscN2N0zfXP5fUo3PEA",
  authDomain: "shocotan-pwa.firebaseapp.com",
  databaseURL: "https://shocotan-pwa.firebaseio.com",
  projectId: "shocotan-pwa",
  storageBucket: "shocotan-pwa.appspot.com",
  messagingSenderId: "1098161935702"
};
firebase.initializeApp(config);
// [START get_messaging_object]
// Retrieve Firebase Messaging object.
const messaging = firebase.messaging();
// [END get_messaging_object]
// [START set_public_vapid_key]
// Add the public key generated from the console here.
messaging.usePublicVapidKey(
  'BFdunUMKBZ5rKcagYnz-WWyBxq_YLpbP7ut-0oV4ZOMthrkk7uNBWpmb7Dg8oVMHSC_G9BLPI5oHJliAkqlQP-8');
// [END set_public_vapid_key]

if ('serviceWorker' in navigator) {
  // サービスワーカーの登録
  navigator.serviceWorker.register('./sw.js').then((registration) => {
    // サービスワーカー登録成功
    console.log('ServiceWorker registration successful with scope: ', registration.scope);
    // 今回はこのサービスワーカーを指定します \
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

// [START receive_message]
// Handle incoming messages. Called when:
// - a message is received while the app has focus
// - the user clicks on an app notification created by a service worker
//   `messaging.setBackgroundMessageHandler` handler.
messaging.onMessage(function(payload) {
  console.log('Message received. ', payload);
  // [START_EXCLUDE]
  // Update the UI to include the received message.
  alert("反応した");
  alert(payload);
  // [END_EXCLUDE]
});
// [END receive_message]


// [START refresh_token]
// Callback fired if Instance ID token is updated.
messaging.onTokenRefresh(function () {
  messaging.getToken().then(function (refreshedToken) {
    console.log('Token refreshed.');
    sendTokenToServer(refreshedToken);
  }).catch(function (err) {
    console.log('Unable to retrieve refreshed token ', err);
  });
});
// [END refresh_token]