import React  from 'react';
import {View,Text,StyleSheet,Image}from 'react-native';
import imagePath from '../constants/imagePath';



export default function Header({screenName,isBackButton}) {

   return(
    <View style={styles.headerView}>
    {
     isBackButton ? <Image
     style={styles.backButton}
     source={imagePath.backarrow}></Image> :<></>
    }      
    
  
  <View style={{width: '100%'}}>
    <Text style={styles.HeaderTitleText}>{screenName}</Text>
  </View>
</View>
   )
    
}

const styles = StyleSheet.create({
    headerView: {
        marginVertical: 10,
      },
      backButton: {
        height: 22,
        width: 22,
        position: 'absolute',
        marginTop: 10,
        marginHorizontal: 20,
      },HeaderTitleText: {
        fontFamily: 'Redressed-Regular',
        fontSize: 25,
        textAlign: 'center',
      },
})