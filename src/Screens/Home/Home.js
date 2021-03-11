import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  StatusBar,
  Button,
  Pressable,
} from 'react-native';
import navigationStrings from '../../constants/navigationStrings';
import { clearUserData } from '../../utils/utils';


export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
    
    };
  }
  userLogout=()=>{
      const{navigation}=this.props
      clearUserData().then(res=>{
       navigation.navigate(navigationStrings.LOGIN)
      }).catch(error=>console.log(error))
  }

  render() {
  
    return (
      <View style={{flex: 1,justifyContent:'center',alignItems:'center'}}>
       <Text>Home Screen</Text>
       <TouchableOpacity onPress={this.userLogout}>
       <Text>Logout</Text>
       </TouchableOpacity>
      </View>
    );
  }
}

