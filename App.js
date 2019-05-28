import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import AppNavigator from "./Src/Navigation/AppNavigator"
import APIKeys from './Src/Constants/APIKeys'
import * as firebase from 'firebase'
import { Permissions, Notifications } from 'expo';

export default class App extends React.Component {

  async registerForPushNotificationsAsync() {
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    );
    let finalStatus = existingStatus;
  
    // only ask if permissions have not already been determined, because
    // iOS won't necessarily prompt the user a second time.
    if (existingStatus !== 'granted') {
      // Android remote notification permissions are granted during the app
      // install, so this will only ask on iOS
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }
  
    global.deviceToken='';
    //console.log('this is status : '+finalStatus);
    // Stop here if the user did not grant permissions
    if (finalStatus !== 'granted') {
      return;
    }

    let token = await Notifications.getExpoPushTokenAsync();
    global.deviceToken =  token;
    //console.log(token);
  }

  componentWillMount() { 
    this.registerForPushNotificationsAsync();
    this._notificationSubscription = Notifications.addListener(this._handleNotification);
  }

  componentWillUnmount(){
    this._notificationSubscription && Notifications.removeListener(this._handleNotification);
  }

  _handleNotification = (notification) => {
    console.log(notification);
  };

  constructor(props){
    super(props);
    this.state={ 
      isLoadingComplete:false,
      isAuthenticationReady:false,
      isAuthenticated:false
    }    
    try
    {
      
      if(!firebase.apps.length){
        firebase.initializeApp(APIKeys.FireBaseConfiguration);
      }
      console.log('firebase App initialized');
    }
    catch(e){console.log(e);}
  }

  render() {
    return (
      <AppNavigator />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
