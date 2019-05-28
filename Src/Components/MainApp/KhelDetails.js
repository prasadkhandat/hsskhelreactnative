import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet,
    ScrollView,
    WebView,
    Platform 
} from "react-native";

class KhelDetails extends Component {
    constructor(props){
        super(props);        
        this.state ={kobj : JSON.parse('{"key":"not found","name":"not found","description":"not found","intensity":"not found","audiance":"not found","min_participants":"0","max_participants":"0","video":""}')};
    }

    componentDidMount(){               

        const k = this.props.navigation.getParam("khelObj",'');        
        //console.log('this is data : '+k);

        
        if(k.length > 0) {

            this.setState({ kobj: JSON.parse(k)}, function() {
                // do something with new state
                console.log(this.state);
            });            
            
        }
        
        //console.log(this.state.KhelDetailsObj); 
    }

    render() {
        //const {state} = this.props.navigation;


        return (
            <ScrollView contentContainerStyle={{flexGrow: 1}} >
                <View style={{margin:10}}>
                  {
                      <View>
                    <Text>
                      {this.state.kobj.name}
                    </Text>
                    <Text>
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
                    
                    </View>                      
                  }
                </View>
            </ScrollView>
        );
    }
}
export default KhelDetails;

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