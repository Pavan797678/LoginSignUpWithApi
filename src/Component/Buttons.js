import React from 'react';
import {View,Text,StyleSheet} from 'react-native';
import colors from '../styles/colors';


export default function Buttons() {

    return(
        <View style={styles.signInButtonView}>
        <Text style={{color: colors.buttonTextColor}}>Sign In</Text>
      </View>
    )
    
} 

const styles = StyleSheet.create({
    signInButtonView: {
        backgroundColor: colors.buttonColor,
        height: 45,
        marginHorizontal: 50,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
      },
})