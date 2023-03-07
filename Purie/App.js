import React,{useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { DrawerNavigation, Navigation } from './src/navigation';
import { Drawer } from './src/navigation';
import { connect } from 'react-redux';
import FlashMessage from 'react-native-flash-message';
import { storeUser } from './src/Store/user/actions';
import { API_LINK } from './src/constants/Strings';
import { showMessage } from 'react-native-flash-message';
import messaging from "@react-native-firebase/messaging";
import PushNotification, {Importance} from 'react-native-push-notification';



const App = ({reduxUser}) =>{

  useEffect(() => {

    //
    // This is a function for receiving the notification message and displaying notification
    //
    async function onMessageReceivedFore(message) {
        // onDisplayNotification(message);
        console.log("********************************")
        console.log('message received Foreground');
        console.log(JSON.stringify(message))
        console.log("********************************")
        createNotificationChannel("1","1","This is channel",message.notification.title, message.notification.body);
        // createNotificationChannel();
    }
    //
    //This is for receiving notification onForeground
    //
    const unsubscribe = messaging().onMessage(onMessageReceivedFore);

    return () => {
        console.log('component unmount');
        // onNotificationInteraction()
        unsubscribe()
    }

}, [])

  // useEffect(()=>{
  //   messaging().onMessage(async remoteMessage => { () => {
  //     console.log("*************onMessage****************");
  //     console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));
  //     console.log("*****************************"); 
  //   }
  //   });
  
  //   messaging().onNotificationOpenedApp(remoteMessage => {
  //     console.log("************onNotificationOpenedApp*****************");
  //     console.log('onNotificationOpenedApp: ', JSON.stringify(remoteMessage));
  //     console.log("*****************************");
  //   });
  
  //   messaging()
  //     .getInitialNotification()
  //     .then(remoteMessage => {
  //       if (remoteMessage) {
  //         console.log("*************getInitialNotification****************");
  //         console.log(
  //           'Notification caused app to open from quit state:',
  //           JSON.stringify(remoteMessage),
  //         );
  //         console.log("*****************************");
  //       }
  //     });
  //   messaging().setBackgroundMessageHandler(async remoteMessage => {
  //     console.log("*************setBackgroundMessageHandler****************");
  //     console.log('Message handled in the background!', remoteMessage);
  //     console.log("*****************************");
  //   });
  // })
   return(
     <NavigationContainer>
       {
         (!reduxUser.isLoggedIn)
         ?
           <Navigation/>  
         :
          <DrawerNavigation />
       }
        
      <FlashMessage />
     </NavigationContainer>
     
   )
 }


const createNotificationChannel = (channelId, channelName, channelDescription, notiTitle, notiDescription ) => {
  PushNotification.createChannel(
    {
      channelId: channelId, // (required)
      channelName: channelName, // (required)
      channelDescription: channelDescription, // (optional) default: undefined.
      playSound: false, // (optional) default: true
      soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
      importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
      vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
    },
    (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
  );
  pushLocalNotification(channelId,notiTitle,notiDescription);
}

const pushLocalNotification = (channelId,notiTitle,notiDescription) =>{
  PushNotification.localNotification({
    /* Android Only Properties */
    channelId: channelId, // (required) channelId, if the channel doesn't exist, notification will not trigger.
    ticker: "My Notification Ticker", // (optional)
    showWhen: true, // (optional) default: true
    autoCancel: true, // (optional) default: true
    largeIcon: "ic_launcher", // (optional) default: "ic_launcher". Use "" for no large icon.
    largeIconUrl: "https://www.example.tld/picture.jpg", // (optional) default: undefined
    smallIcon: "ic_notification", // (optional) default: "ic_notification" with fallback for "ic_launcher". Use "" for default small icon.
    bigPictureUrl: "https://www.example.tld/picture.jpg", // (optional) default: undefined
    bigLargeIcon: "ic_launcher", // (optional) default: undefined
    bigLargeIconUrl: "https://www.example.tld/bigicon.jpg", // (optional) default: undefined
    color: "red", // (optional) default: system default
    vibrate: true, // (optional) default: true
    vibration: 300, // vibration length in milliseconds, ignored if vibrate=false, default: 1000
    tag: "some_tag", // (optional) add tag to message
    group: "group", // (optional) add group to message
    groupSummary: false, // (optional) set this notification to be the group summary for a group of notifications, default: false
    ongoing: false, // (optional) set whether this is an "ongoing" notification
    priority: "high", // (optional) set notification priority, default: high
    visibility: "private", // (optional) set notification visibility, default: private
    ignoreInForeground: false, // (optional) if true, the notification will not be visible when the app is in the foreground (useful for parity with how iOS notifications appear). should be used in combine with `com.dieam.reactnativepushnotification.notification_foreground` setting
    shortcutId: "shortcut-id", // (optional) If this notification is duplicative of a Launcher shortcut, sets the id of the shortcut, in case the Launcher wants to hide the shortcut, default undefined
    onlyAlertOnce: false, // (optional) alert will open only once with sound and notify, default: false
    
    when: null, // (optional) Add a timestamp (Unix timestamp value in milliseconds) pertaining to the notification (usually the time the event occurred). For apps targeting Build.VERSION_CODES.N and above, this time is not shown anymore by default and must be opted into by using `showWhen`, default: null.
    usesChronometer: false, // (optional) Show the `when` field as a stopwatch. Instead of presenting `when` as a timestamp, the notification will show an automatically updating display of the minutes and seconds since when. Useful when showing an elapsed time (like an ongoing phone call), default: false.
    timeoutAfter: null, // (optional) Specifies a duration in milliseconds after which this notification should be canceled, if it is not already canceled, default: null
  
    messageId: "google:message_id", // (optional) added as `message_id` to intent extras so opening push notification can find data stored by @react-native-firebase/messaging module. 
  
    invokeApp: true, // (optional) This enable click on actions to bring back the application to foreground or stay in background, default: true
  
    /* iOS only properties */
    category: "", // (optional) default: empty string
  
    /* iOS and Android properties */
    id: 0, // (optional) Valid unique 32 bit integer specified as string. default: Autogenerated Unique ID
    title: notiTitle, // (optional)
    message: notiDescription, // (required)
    picture: "https://www.example.tld/picture.jpg", // (optional) Display an picture with the notification, alias of `bigPictureUrl` for Android. default: undefined
    userInfo: {}, // (optional) default: {} (using null throws a JSON value '<null>' error)
    playSound: false, // (optional) default: true
    soundName: "default", // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)
    
  });
}
const mapStateToProps = state => {
  return {
    reduxUser : state.user
  };
}

export default connect(mapStateToProps)(App);