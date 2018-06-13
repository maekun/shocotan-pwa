// Service Worker スクリプトのインストールと更新処理 については以下の記事が詳しい
// https://nhiroki.jp/2018/02/15/service-worker-install-and-update-scripts
// importScripts('imported_script.js');

/**
 * push通知表示.
 */
self.addEventListener('push', (event) => {
    const parsedNotification = event.data.json().notification;
    event.waitUntil(
        self.registration.showNotification(parsedNotification.title, {
            body: parsedNotification.body,
            actions: [
                {action: 'open', title: '開く'},
                {action: 'close', title: '閉じる'}
            ],
            // vibrate: [200, 100, 200, 100, 200, 100, 200],
            data: {
                url: "urlurlurl"
            },
            icon: './image/pwa-logo.svg'
        })
    );
});

/**
 * push通知クリック時の処理.
 */
self.addEventListener('notificationclick', (event) => {
    event.notification.close();

    // dataで渡した情報は以下のようにアクセスできる
    // event.notification.data.url

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
});