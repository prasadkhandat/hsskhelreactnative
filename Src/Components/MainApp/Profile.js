import React, { Component } from "react";
import { 
    View,
    Text,
    Button
} from "react-native";
import {StyleSheet} from "react-native"

import * as firebase from 'firebase'

class Profile extends Component {
    
    constructor(props){
        super(props);
        this.btnSignOut = this.btnSignOut.bind(this);
    }

    btnSignOut= () =>{

        firebase.auth().signOut().then(()=>{
            console.log('transfering to singin');
            this.props.navigation.navigate('SignIn')
        });        
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>Profile update</Text>                
                <Button title="LogOut" onPress={this.btnSignOut}></Button>
            </View>
        );
    }
}
export default Profile;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});