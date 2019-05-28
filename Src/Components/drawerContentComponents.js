import React, { Component } from 'react';
import {NavigationActions} from 'react-navigation';
import { Text, View, StyleSheet, ImageBackground,Image } from 'react-native'
import * as firebase from 'firebase'

export default class drawerContentComponents extends Component {

    navigateToScreen = ( route ) =>(
        () => {
            console.log('Navigating to : '+route);
        const navigateAction = NavigationActions.navigate({
            routeName: route
        });
        this.props.navigation.dispatch(navigateAction);
    })

    getAdminControl = ()=>{
        
        return (
            firebase.auth().currentUser.email=='prasad.khandat@gmail.com' ? 
            <View style={styles.screenStyle}><Text onPress={()=>{
                const navigateAction = NavigationActions.navigate({
                    routeName: 'AdminHome'
                });
                this.props.navigation.dispatch(navigateAction);

            }}>Admin</Text></View>
            :null
        );
    }

  render() {  

    return (
        
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <ImageBackground source={require('../../assets/dback.jpg')} style={{flex: 1, width: 280, justifyContent: 'center'}} >
                    <Image source={require('../../assets/logonew1.png')} style={{flex:1, height: undefined, width: undefined,marginTop:50}} resizeMode="contain"></Image>
                </ImageBackground>
            </View>
            <View style={styles.screenContainer}>
            
                <View style={styles.screenStyle}>
                    <Text onPress={this.navigateToScreen('Home')}>Home</Text>
                </View>
                {
                    this.getAdminControl()
                }
                <View style={styles.screenStyle}>
                    <Text onPress={this.navigateToScreen('Profile')}>Profile</Text>
                </View>                
            
            </View>
        </View>
    
    )
  }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    headerContainer: {
        height: 200,
    },
    headerText: {
        color: '#fff8f8',
    },
    screenContainer: {
        paddingTop: 20
    },
    screenStyle: {
        height: 50,
        marginTop: 2,
        flexDirection: 'row',
        alignItems: 'center'
    },
    screenTextStyle:{
        fontSize: 20,
        marginLeft: 20
    },

});