import React from "react";
import { 
    View,
    Text,
    StyleSheet,
    Button,
    TextInput
} from "react-native";
import * as firebase from 'firebase'

class SignUp extends React.Component {

    state = { email: '', password: '', errorMessage: null,displayName:'',phone:'' }

    constructor(props){
        super(props);       
    }

    handleSignUp = () => {
        // TODO: Firebase stuff...       
        console.log('handleSignUp')

        firebase
        .auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then(() => {
          firebase.auth().currentUser.updateProfile({displayName:this.state.displayName, phone:this.state.phone});
          this.props.navigation.navigate('Home')
        })
        .catch(error => this.setState({ errorMessage: error.message }))
        
    }

    render() {
        return (
            <View style={styles.container}>
            <Text>Sign Up</Text>
            {this.state.errorMessage &&  <Text style={{ color: 'red' }}> {this.state.errorMessage}  </Text>}
            <TextInput            
              placeholder="Name"
              autoCapitalize="none"
              style={styles.textInput}
              onChangeText={displayName => this.setState({ displayName })}
              value={this.state.displayName}
            />
            <TextInput
              keyboardType="phone-pad"
              placeholder="Phone"
              autoCapitalize="none"
              style={styles.textInput}
              onChangeText={phone => this.setState({ phone })}
              value={this.state.phone}
            />
            <TextInput
              keyboardType="email-address"
              placeholder="Email"
              autoCapitalize="none"
              style={styles.textInput}
              onChangeText={email => this.setState({ email })}
              value={this.state.email}
            />
            <TextInput
              secureTextEntry              
              placeholder="Password"
              autoCapitalize="none"
              style={styles.textInput}
              onChangeText={password => this.setState({ password })}
              value={this.state.password}
            />
            <Button title="Sign Up" onPress={this.handleSignUp} />
            <Button
              title="Already have an account? Login"
              onPress={() => this.props.navigation.navigate('SignIn')}
            />
          </View>
        );
    }
}
export default SignUp;

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