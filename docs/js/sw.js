self.addEventListener('push', (event) => {
    const recieveNotification = event.data.json().notification;
    event.waitUntil(
        self.registration.showNotification("New message from Alice", {
            actions: [
                {action: 'like', title: '👍Like'},
                {action: 'reply', title: '⤻ Reply'}]
        })
        // self.registration.showNotification(recieveNotification.title, {
        //     'body': recieveNotification.body,
        //     'icon': '../image/pwa-logo.svg',
        //     'actions': [
        //         {action: 'open', title: '開く'},
        //         {action: 'close', title: '閉じる'}
        //     ]
        // })
    );
});

self.addEventListener('notificationclick', (event) => {

    event.notification.close();

    switch (event.action) {
        case 'open':
            // event.waitUntilを利用することで、処理中にサービスワーカーが自動再起動しないようにする
            event.waitUntil(
                //ここに処理
                clients.openWindow(TOP_URL)
            )
            break;

        case 'close':
            event.waitUntil(
                event.notification.close()
            )
            break;
        default:
            break;
    }

//     if (event.action === 'action1') {
//     clients.openWindow("/action1");
//   } else if (event.action === 'action2') {
//     clients.openWindow("/action2");
//   } else {
//     clients.openWindow("/");
//   }
});