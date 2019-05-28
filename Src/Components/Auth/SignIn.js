import React from "react";
import { 
    View,
    Text,
    StyleSheet,
    Button,
    TextInput,
    ScrollView,
    Keyboard,
    TouchableWithoutFeedback
} from "react-native";

import * as firebase from 'firebase'
import { AsyncStorage } from "react-native"
import { encrypt, decrypt } from 'react-native-simple-encryption';
import APIKeys from '../../Constants/APIKeys'


class SignIn extends React.Component {

    constructor(props){
        super(props);
        console.log('In sign in');
        this.state ={
            email:'',
            password:'',
            errorMessage:false
        }

        try{
            /*
            this._retrieveData(APIKeys.AuthStorageKeys.un).then((err,val)=>{
                console.log(val);
            });
            const p = this._retrieveData(APIKeys.AuthStorageKeys.pwd);
            


            if(typeof(u) === 'string')
                this.state.email = u;
            
            if(typeof(p) === 'string')
                this.state.password = p;            
                
            console.log(u);
            */
        }
        catch(e){console.log(e);}
    }

    _storeData = async (key,val) => {
        try {
          await AsyncStorage.setItem('@HSSKhel:'+key, encrypt(APIKeys.EncryptionKey,val));
        } catch (error) {
          // Error saving data
        }
    }

    _retrieveData = async (key) => {
        try {
            //console.log('in retrieve');
          const value = decrypt(APIKeys.EncryptionKey,await AsyncStorage.getItem('@HSSKhel:'+key));
          if (value !== null) {
            // We have data!!
            //console.log('and data '+value);
            return value;
          }
         } catch (error) {
             console.log(error);
           // Error retrieving data
         }         
         return '';
    }

    handleLogin = () => {
        // TODO: Firebase stuff...
        this._storeData(APIKeys.AuthStorageKeys.un,this.state.email);
        this._storeData(APIKeys.AuthStorageKeys.pwd,this.state.pwd);
        
        this._retrieveData()

        firebase.auth().signInWithEmailAndPassword(this.state.email,this.state.password).then(()=>{
            this.props.navigation.navigate('Home');
        },(error)=>{
            alert(error.message);
        });
        
/*
        firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => this.props.navigation.navigate('Main'))
        .catch(error => this.setState({ errorMessage: error.message }))*/
    }

    render() {
        return (            
            <ScrollView contentContainerStyle={{flexGrow: 1}} keyboardShouldPersistTaps='handled' onPress={Keyboard.dismiss}>
                <View style={styles.container}>
                    <Text>Login</Text>
                    {this.state.errorMessage &&
                    <Text style={{ color: 'red' }}>
                        {this.state.errorMessage}
                    </Text>}
                    <TextInput
                    style={styles.textInput}
                    autoCapitalize="none"
                    placeholder="Email"
                    onChangeText={email => this.setState({ email })}
                    value={this.state.email}
                    />
                    <TextInput
                    secureTextEntry
                    style={styles.textInput}
                    autoCapitalize="none"
                    placeholder="Password"
                    onChangeText={password => this.setState({ password })}
                    value={this.state.password}
                    />
                    <Button title="Login" onPress={this.handleLogin} />
                    <Button primary
                    title="Don't have an account? Sign Up"
                    onPress={() => this.props.navigation.navigate('SignUp')}
                    />
                </View>
            </ScrollView>         
        );
    }
}
export default SignIn;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    textInput: {
      height: 40,
      width: '90%',
      borderColor: 'gray',
      borderWidth: 1,
      marginTop: 8
    }
  });