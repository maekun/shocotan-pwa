/**
 * 起動時.js
 */


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