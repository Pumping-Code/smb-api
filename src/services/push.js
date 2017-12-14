import Expo from 'expo-server-sdk';
import 'babel-polyfill';


function sendPush(somePushTokens, pushData) {
    const expo = new Expo();
    const messages = [];

    for (const pushToken of somePushTokens) {
        if (!Expo.isExpoPushToken(pushToken)) {
            console.error(`Push token ${pushToken} is not a valid Expo push token`);
            continue;
        }

        messages.push({
            to: pushToken,
            sound: 'default',
            body: `${pushData.username} NEEDS YOUR HELP!`,
            data: pushData,
        });
    }
    const chunks = expo.chunkPushNotifications(messages);

    (async () => {
        for (const chunk of chunks) {
            try {
                const receipts = await expo.sendPushNotificationsAsync(chunk);
                console.log('receipts', receipts);
            } catch (error) {
                console.error('error', error);
            }
        }
    })();
}

export { sendPush };
