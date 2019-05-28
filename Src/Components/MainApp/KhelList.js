import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView
} from "react-native";
import * as firebase from 'firebase'
import ActionButton from 'react-native-action-button';
//import { Permissions, Notifications } from 'expo';

class KhelList extends Component { 

    khelRef = firebase.database().ref("khels/");

    state = {khels: []}
    
    componentWillMount(){

        //let token = await Notifications.getExpoPushTokenAsync();
    console.log('TOken : '+global.deviceToken);


    }

    componentDidMount() {

        this.khelRef.orderByChild("isVerified").equalTo(1).on('value', function (snapshot) {

            var khls = [];                 

            snapshot.forEach((child) => {                

                    khls.push(
                    {
                        key :child.key,
                        name:child.val().name,
                        description :child.val().description,
                        intensity:child.val().intensity,
                        audiance:child.val().audiance,
                        min_participants:child.val().min_participants,
                        max_participants:child.val().max_participants,
                        video:child.val().video
                    }) ;
            });
            this.setState({ khels:khls });            
        }.bind(this));
    }

    alertItemName = (item) => {
        this.props.navigation.navigate('KhelDetails',{khelObj:JSON.stringify(item)});
    }

    addNeKhelPressed(){

        this.props.navigation.navigate('AddKhel');
    }
    
    render() {        
        
        return (
            <View style={{flexGrow: 1}}>
            <ScrollView contentContainerStyle={{flexGrow: 1}} >
            <View>
                {
                this.state.khels.map((item, index) => (
                    <TouchableOpacity
                        key = {item.key}
                        style = {styles.container}
                        onPress = {() => this.alertItemName(item)}>
                        <Text style = {styles.text}>
                            {item.name}
                        </Text>
                        <Text style = {styles.textDescription}   numberOfLines={5}>
                            {item.description}
                        </Text>                       
                    </TouchableOpacity>
                ))
                }
            </View>            
            </ScrollView>   
            <ActionButton buttonColor="rgba(231,76,60,1)" onPress={()=>this.addNeKhelPressed()}>          
            </ActionButton>
            </View>
        ); 
    }
}
export default KhelList;

const styles = StyleSheet.create ({
    container: {
       padding: 15,
       marginTop: 3,       
       backgroundColor: '#d9f9b1',
       //alignItems: 'center',
    },
    text: {
       color: '#4f603c',
       fontSize: 15,
       fontWeight: 'bold'
    },
    textDescription: {
        color: '#4f603c',
        fontSize: 15,      
        marginTop:5,
        borderBottomColor : "black"       
     }
 })