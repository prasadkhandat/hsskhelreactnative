import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet,
    Button,
    TextInput,
    ScrollView,
    KeyboardAvoidingView 
} from "react-native";
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';

import * as firebase from 'firebase'


class AddKhel extends Component {

    khelRef = firebase.database().ref("khels/");

    state = {
      formation:'0',intensity:'0',audiance:'0',mnpart:'0',mxpart:'0',ylink:'',
       ylink:'', errorMessage: null,name:'',description:'',
    fTypes : [
      {label: 'Tati  ', value: 0 },
      {label: 'Mandal  ', value: 1 },
      {label: 'One Court  ', value: 2 },
      {label: 'Multi Court', value: 3 }
    ],
    iTypes : [
      {label: 'Extreme  ', value: 0 },
      {label: 'High  ', value: 1 },
      {label: 'Medium  ', value: 2 },
      {label: 'Low', value: 3 }
    ],
    aTypes : [
      {label: 'Sevak  ', value: 0 },
      {label: 'Sevika  ', value: 1 },
      {label: 'Both  ', value: 2 }      
    ],
    mnTypes : [
      {label: '1-5  ', value: 0 },
      {label: '6-10  ', value: 1 },
      {label: '11-15  ', value: 2 },
      {label: '15-20', value: 3 },
      {label: '>20', value: 4 }
    ],
    mxTypes : [
      {label: '1-5  ', value: 0 },
      {label: '6-10  ', value: 1 },
      {label: '11-15  ', value: 2 },
      {label: '15-20', value: 3 },
      {label: '>20', value: 4 }
    ]
  }

    btnAddKhel = ()=>{

      this.khelRef.push({
        audiance:this.state.audiance,
        description:this.state.description,
        formation:this.state.formation,
        intensity:this.state.intensity,
        max_participants: this.state.mxpart,
        min_participants:this.state.mnpart,
        name:this.state.name,
        video:this.state.ylink,
        uploadedbyEmail: firebase.auth().currentUser.email,
        uploadedbyName: firebase.auth().currentUser.displayName,
        uploadedbyUID: firebase.auth().currentUser.uid,
        isVerified:0
      }).then((data)=>{
        //success callback
        alert("Game added succesfully. It will be available once admin verifies.");
        this.props.navigation.navigate('KhelList');
    }).catch((error)=>{
        //error callback
        console.log('error ' , error)
    });

      console.log(this.state.formation+' '+this.state.intensity+' '+this.state.audiance+' '+this.state.mnpart+' '+this.state.mxpart+' '+this.state.ylink);

    }
    

    render() {
        return (
          <KeyboardAvoidingView behavior="padding" enabled>
        <ScrollView>
            <View style={styles.container}>
            
            <Text>Add New Khel</Text>
            {this.state.errorMessage &&  <Text style={{ color: 'red' }}> {this.state.errorMessage}  </Text>}
            <TextInput            
              placeholder="Name"
              autoCapitalize="none"
              style={styles.textInput}
              onChangeText={name => this.setState({ name })}
              value={this.state.name}
            />
            <TextInput
              multiline = {true}
              placeholder="Description"
              autoCapitalize="none"
              editable = {true}              
              style={styles.textInputml}
              onChangeText={description => this.setState({ description })}
              value={this.state.description}
            />

          <Text style={{ marginTop: 5,fontWeight:'bold' }}>Formation</Text>
          <RadioForm
              style={{ marginTop: 5 }}
              radio_props={this.state.fTypes}
              initial={0}
              //formHorizontal={true}
              //labelHorizontal={true}
              buttonColor={'#2196f3'}
              animation={true}
              onPress={(value) => {this.setState({formation:value})}}
            />

            <Text style={{ marginTop: 5,fontWeight:'bold' }}>Intensity</Text>
            <RadioForm
              style={{ marginTop: 5 }}
              radio_props={this.state.iTypes}
              initial={0}
              //formHorizontal={true}
              //labelHorizontal={true}
              buttonColor={'#2196f3'}
              animation={true}
              onPress={(value) => {this.setState({intensity:value})}}
            />

            <Text style={{ marginTop: 5,fontWeight:'bold' }}>Audiance</Text>
            <RadioForm
              style={{ marginTop: 5 }}
              radio_props={this.state.aTypes}
              initial={0}
              //formHorizontal={true}
              //labelHorizontal={true}
              buttonColor={'#2196f3'}
              animation={true}
              onPress={(value) => {this.setState({audiance:value})}}
            />

            <Text style={{ marginTop: 5,fontWeight:'bold' }}>Min Participants</Text>
            <RadioForm
              style={{ marginTop: 5 }}
              radio_props={this.state.mnTypes}
              initial={0}
              //formHorizontal={true}
              //labelHorizontal={true}
              buttonColor={'#2196f3'}
              animation={true}
              onPress={(value) => {this.setState({mnpart:value})}}
            />

          <Text style={{ marginTop: 5,fontWeight:'bold' }}>Max Participants</Text>
            <RadioForm
              style={{ marginTop: 5 }}
              radio_props={this.state.mxTypes}
              initial={0}
              //formHorizontal={true}
              //labelHorizontal={true}
              buttonColor={'#2196f3'}
              animation={true}
              onPress={(value) => {this.setState({mxpart:value})}}
            />

            <TextInput             
              placeholder="Youtube Video Link"
              autoCapitalize="none"
              editable = {true}
              maxLength = {40}
              style={styles.textInputml}
              onChangeText={ylink => this.setState({ ylink })}
              value={this.state.ylink}
            />
            <Button title="Add Khel"  onPress={this.btnAddKhel} />
            
            <Text style={{ marginTop: 5 }}></Text>            
            <Text style={{ marginTop: 5 }}></Text>
          </View>
          </ScrollView>
          </KeyboardAvoidingView>
        );
    }
}
export default AddKhel;


const styles = StyleSheet.create({
    container: {
      flex: 1,      
      left:15,
      right:5,
      bottom:0,
      top:10
    },
    textInput: {
      height: 40,
      width: '90%',
      borderColor: 'gray',
      borderWidth: 1,
      marginTop: 8
    },
    textInputml: {
        height: 80,
        width: '90%',
        borderColor: 'gray',
        borderWidth: 1,
        marginTop: 8
      }
  });