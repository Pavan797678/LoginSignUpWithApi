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
import imagePath from '../../constants/imagePath';
import validator from '../../utils/validations';
import api from '../../apis';
import Loader from '../../Component/Loader';
import navigationStrings from '../../constants/navigationStrings';
import {showMessage, hideMessage} from 'react-native-flash-message';
import colors from '../../styles/colors';
import { UserContext } from '../../context/context';

export default class signUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userEmail: '',
      userPassword: '',
      isLoading: false,
    };
  }
  
static contextType=UserContext;

  _onChangeText(key) {
    return (value) => {
      this.setState({
        [key]: value,
      });
    };
  }
  isValidData = () => {
    const {userEmail, userPassword} = this.state;
    const error = validator({
      email: userEmail,
      password: userPassword,
    });
    if (error) {
      showMessage({
        type: 'danger',
        icon: 'danger',
        message: error,
      });
      return false;
    }
    return true;
  };

  mainLogin = () => {
    const {userEmail, userPassword} = this.state;
    const {navigation} = this.props;
    if (this.isValidData()) {
      this.setState({
        isLoading: true,
      });
      api
        .login({
          email: userEmail,
          password: userPassword,
        })
        .then((res) => {
          console.log(JSON.stringify(res));

          this.setState({
            isLoading: false,
          });
          showMessage({
            type: 'success',
            icon: 'success',
            message: 'Login Successfully',
          });
         
              this.context.onLogin();
        })
        .catch((error) => {
          this.setState({
            isLoading: false,
          });
          showMessage({
            type: 'danger',
            icon: 'danger',
            message: error,
          });
        });
    }
  };
  goToSignUpPage =()=>{
    const {navigation}=this.props
    navigation.navigate(navigationStrings.SIGNUP)
  }


  render() {
    const {isLoading} = this.state;
    return (
      <View style={{flex: 1}}>
        <View style={styles.headerView}>
          {/* <Image style={styles.backButton} source={imagePath.backarrow}></Image> */}
          <Text style={styles.HeaderTitleText}>Sign In</Text>
        </View>
        <View style={styles.profileView}>
          <Image
            style={styles.profileImage}
            source={{
              uri:
                'https://i.pinimg.com/236x/34/c8/d4/34c8d49902cd59e235e82cc962f4f3f0.jpg',
            }}></Image>
        </View>
        <View>
          <TextInput
            style={styles.emailField}
            placeholder={'Email'}
            onChangeText={this._onChangeText('userEmail')}
          />
          <TextInput
            style={styles.birthDateField}
            placeholder={'Password'}
            onChangeText={this._onChangeText('userPassword')}
          />
          <TouchableOpacity onPress={this.mainLogin}>
            <View style={styles.signInButtonView}>
              <Text style={{color: colors.buttonTextColor}}>Sign In</Text>
            </View>
          </TouchableOpacity>

          <View style={styles.lastLoginView}>
            <Text style={{fontSize: 18, marginVertical: 20, fontFamily: 'Redressed-Regular',}}>
              Fogort Password?
            </Text>
            <View style={styles.facebookLoginView}>
              <Image
                style={styles.facebookLoginImage}
                source={imagePath.facebook_login}
              />
              <Text style={{marginHorizontal:30,color:colors.buttonColor}}>SIGN IN WITH FACEBOOK</Text>
            </View>
            <TouchableOpacity onPress={this.goToSignUpPage}>
            <Text style={{fontSize: 18,marginVertical:20,fontFamily: 'Redressed-Regular'}}>Don't have an account? Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Loader isLoading={isLoading} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  headerView: {
    marginVertical: 10,
  },
  profileImage: {
    height: 100,
    width: 100,
    borderRadius: 50,
    resizeMode: 'cover',
  },
  backButton: {
    height: 22,
    width: 22,
    marginHorizontal: 20,
    position: 'absolute',
    marginTop: 10,
  },
  HeaderTitleText: {
    fontFamily: 'Redressed-Regular',
    fontSize: 25,
    textAlign: 'center',
  },
  profileView: {
    height: '30%',

    justifyContent: 'center',
    alignItems: 'center',
  },
  emailField: {
    backgroundColor: 'white',
    height: 50,
    marginHorizontal: 30,
    borderRadius: 5,
    borderWidth: 0.5,
  },
  birthDateField: {
    backgroundColor: 'white',
    height: 50,
    marginHorizontal: 30,
    borderRadius: 5,
    borderWidth: 0.5,
    marginVertical: 40,
  },
  signInButtonView: {
    backgroundColor: colors.buttonColor,
    height: 45,
    marginHorizontal: 50,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  facebookLoginImage: {
    height: 30,
    width: 30,
    marginVertical: 10,
   
    marginHorizontal:20
    
  },
  lastLoginView: {
    alignItems: 'center',
   
  },
  facebookLoginView: {
    
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius:30,
    borderColor:colors.buttonColor,
    borderWidth:1
    
    
  },
});
