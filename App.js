import React, {Component} from 'react';
import {View,Button} from 'react-native';
import Routes from './src/navigation/Routes';
import FlashMessage from "react-native-flash-message";
import {clearUserData, getUserData } from './src/utils/utils';
import { UserContext } from './src/context/context';







class App extends Component {

   state={
     isLoggedIn:false,
   }


   componentDidMount(){

     getUserData().then((res)=>{
        if(res){
          this.setState({
            isLoggedIn:true
          })
        }
       
     })
   }

   onLogin=()=>{
     this.setState({
       isLoggedIn:true 
     })
   }

   onLogout=()=>{ 

    this.setState({
      isLoggedIn:false 
    })
    clearUserData();

  }

  render() {
    // const {isLoggedIn}=this.state
    // console.log(isLoggedIn, "Render:B isLoggedIn")
    return (


<UserContext.Provider value={
{isLoggedIn:this.state.isLoggedIn, onLogin:this.onLogin,onLogout:this.onLogout}
}>
      <Routes  />
      
      <FlashMessage position="top" /> 
      </UserContext.Provider>

    );
  }
}


export default App;