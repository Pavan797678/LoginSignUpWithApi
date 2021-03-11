import React, {Component} from 'react';
import {View,Button} from 'react-native';
import Routes from './src/navigation/Routes';
import FlashMessage from "react-native-flash-message";
import { getUserData } from './src/utils/utils';







class App extends Component {

   state={
     isLoggedIn:false,
   }


   componentDidMount(){

     getUserData().then((res)=>{
       console.log(res, "getUserDataResponse")
       if(res){
         this.setState({
           isLoggedIn:true
         })
       }
     }).catch(error=>console.log(error))
   }



  render() {
    const {isLoggedIn}=this.state
    console.log(isLoggedIn, "Render:B isLoggedIn")
    return (
      <View style={{ flex: 1 }}>
      <Routes isLoggedIn={isLoggedIn} />
      
      <FlashMessage position="top" /> 
    </View>
    );
  }
}


export default App;