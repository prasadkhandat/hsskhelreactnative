import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet,
    ScrollView,
    WebView,
    Platform,
    Button    
} from "react-native"; 
import * as firebase from 'firebase'
import {StackActions } from 'react-navigation';


class ApproveKhel extends Component {

    khelRef = firebase.database().ref("khels/");

    constructor(props){
        super(props);        
        this.state ={kobj : JSON.parse('{"key":"not found","name":"not found","description":"not found","intensity":"not found","audiance":"not found","min_participants":"0","max_participants":"0","video":""}')};
    }


    componentDidMount(){               

        const k = this.props.navigation.getParam("khelObj",'');        
        console.log();
        
        //console.log("khels/"+k.key);

        this.khelRef = firebase.database().ref("khels/"+JSON.parse(k).key);

        
        
        if(k.length > 0) {

            this.setState({ kobj: JSON.parse(k)}, function() {
                // do something with new state
                //console.log(this.state);                
            });            
            
        }
        
        //console.log(this.state.KhelDetailsObj); 
    }

    render() {
        //const {state} = this.props.navigation;


        return (
            <View style={{flexGrow: 1}}>
            <ScrollView contentContainerStyle={{flexGrow: 1}} >
                <View style={{margin:10}}>
                  {
                      
                    <View>
                         
                    <Text style={{fontSize: 20, fontWeight:"bold"}}>
                      {this.state.kobj.name}
                    </Text>
                    <Text style={{paddingTop:10}}>
                            {this.state.kobj.description}
                    </Text>                  
                    
                    <View style={{ height: 300 }}>
                        
                        <WebView
                               originWhitelist={['*']}
                                style={ styles.WebViewContainer }
                                javaScriptEnabled={true}
                                domStorageEnabled={true}
                                source={{uri: this.state.kobj.video }}
                        />

                    </View>
                    <Button title="Approve" onPress={this.onPressApprove} />     
                    <Button title="Reject" onPress={this.onPressReject} />     
                    </View>                      
                  }


                </View>
            </ScrollView>
            </View>
        );
    }

    onPressApprove=()=>{

        this.khelRef.update({isVerified:1});
        console.log("Approve button pressed");
        const popAction = StackActions.pop({n: 1});
        this.props.navigation.dispatch(popAction);
    }

    onPressReject=()=>{

        this.khelRef.update({isVerified:-1});
        console.log("Approve button pressed");
        const popAction = StackActions.pop({n: 1});
        this.props.navigation.dispatch(popAction);
    }
}
export default ApproveKhel;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    WebViewContainer: {
 
        marginTop: (Platform.OS == 'ios') ? 20 : 0,
     
      }
});