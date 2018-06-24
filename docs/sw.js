
// Service Worker スクリプトのインストールと更新処理 については以下の記事が詳しい
// https://nhiroki.jp/2018/02/15/service-worker-install-and-update-scripts

/**
 * 通知をクリックした時にさせたい動作をimportして
 * サービスワーカーにキャッシュさせる.
 * クリック時にさせたい画面遷移や操作はimportで使うようにしたい.
 */
importScripts('./js/hello.js');


//// showNotification()に渡せる設定一覧

// "//": "Visual Options",
// "body": "<String>",
// "icon": "<URL String>",
// "image": "<URL String>",
// "badge": "<URL String>",
// vibrate: [200, 100, 200, 100, 200, 100, 200],
// "sound": "<URL String>",
// "dir": "<String of 'auto' | 'ltr' | 'rtl'>",

// "//": "Behavioural Options",
// "tag": "<String>",
// "data": "<Anything>",
// "requireInteraction": "<boolean>",
// "renotify": "<Boolean>",
// "silent": "<Boolean>",

// "//": "Both Visual & Behavioural Options",
// "actions": "<Array of Strings>",

// "//": "Information Option. No visual affect.",
// "timestamp": "<Long>"

/**
 * push通知表示.
 */
self.addEventListener('push', (event) => {
    const parsedNotification = event.data.json().notification;
    event.waitUntil(
        self.registration.showNotification(parsedNotification.title, {
            body: parsedNotification.body,
            icon: './image/pwa-logo.svg',
            actions: [
                {action: 'open', icon: '', title: '開く'},
                {action: 'close', icon: '', title: '閉じる'}
            ],
            data: {
                url: "urlurlurl"
            }
        })
    );
});

/**
 * push通知クリック時の処理.
 */
self.addEventListener('notificationclick', (event) => {
    event.notification.close();

    hello();

    // dataで渡した情報は以下のようにアクセスできる
    // event.notification.data.url

    // event.waitUntilを利用することで、処理中にサービスワーカーが自動再起動しないようにする
    event.waitUntil(() => {
        switch (event.action) {

            case 'open':
                clients.openWindow('/')
                break;

            case 'close':
                self.clients.openWindow('/api/close')
                break;
            default:
                break;
        }
    });
});