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
import { UserContext } from '../../context/context';
import { clearUserData } from '../../utils/utils';



export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
    
    };
  }
  static contextType=UserContext;
  userLogout=()=>{
    
      this.context.onLogout();
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

