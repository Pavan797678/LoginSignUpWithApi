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
  PermissionsAndroid,
} from 'react-native';

import {showMessage, hideMessage} from 'react-native-flash-message';
import imagePath from '../../constants/imagePath';
import DateTimePicker from 'react-native-modal-datetime-picker';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import validator from '../../utils/validations';

import api from '../../apis';

import Loader from '../../Component/Loader';
import navigationStrings from '../../constants/navigationStrings';
import colors from '../../styles/colors';
import * as ImagePicker from 'react-native-image-picker';

export default class signUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isDateTimePickerVisible: false,
      text: '',
      username: '',
      userEmail: '',
      userPassword: '',
      userConfirmPassword: '',
      isLoading: false,
      resourceimage: imagePath.profile_image,
    };
  }
  _onChangeText(key) {
    return (value) => {
      this.setState({
        [key]: value,
      });
    };
  }

  showDateTimePicker = () => {
    this.setState({isDateTimePickerVisible: true});
  };

  hideDateTimePicker = () => {
    this.setState({isDateTimePickerVisible: false});
  };

  handleDatePicked = (date) => {
    console.log('A date has been picked: ', date);
    this.hideDateTimePicker();

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    let fullFormat = day + '-' + month + '-' + year;
    this.setState({
      text: fullFormat,
    });
  };

  // testCall=()=>{
  //   axios.post("http://192.168.99.194:8002/user/registerUser",{

  //   }).then(res=>{
  //     console.log(res,'the response value');
  //   }).catch(error=>{

  //     alert(JSON.stringify(error))
  //   })
  // }
  isValidData = () => {
    const {username, userEmail, userPassword, userConfirmPassword} = this.state;
    const error = validator({
      firstName: username,
      email: userEmail,
      password: userPassword,
      confirmPassword: userConfirmPassword,
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

  mainSignUp = () => {
    const {username, userEmail, userPassword} = this.state;
    const {navigation} = this.props;
    if (this.isValidData()) {
      this.setState({
        isLoading: true,
      });
      api
        .signUp({
          email: userEmail,
          password: userPassword,
          name: username,
          languageCode: 'EN',
          signupType: 'APP',
        })
        .then((res) => {
          // console.log(JSON.stringify(res))

          this.setState({
            isLoading: false,
          });
          showMessage({
            type: 'success',
            icon: 'success',
            message: 'Account Created Successfully',
          });
          navigation.navigate(navigationStrings.LOGIN);
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
  goToLoginScreen = () => {
    const {navigation} = this.props;
    navigation.navigate(navigationStrings.LOGIN);
  };

  _profileimage = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Cool Photo App Camera Permission',
          message:
            'Cool Photo App needs access to your camera ' +
            'so you can take awesome pictures.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the camera');
        ImagePicker.launchCamera(
          {
            mediaType: 'photo',
            includeBase64: false,
            maxHeight: 200,
            maxWidth: 200,
            saveToPhotos: true,
          },
          (response) => {
            console.log(response);
            this.setState({resourcePath: response});
          },
        );
        this.setState({isModalVisibal: false});
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  _profileImageFromGallery = async () => {
    const {resourcePath} = this.state;
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: 'Cool Photo App Gallery Permission',
          message:
            'Cool Photo App needs access to your gallery ' +
            'so you can take awesome pictures.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the gallery');
        ImagePicker.launchImageLibrary(
          {
            mediaType: 'photo',
            includeBase64: false,
            maxHeight: 200,
            maxWidth: 200,
            saveToPhotos: true,
          },
          (response) => {
            // console.log(response);
            // this.setState({resourcePath: response.uri});

            const apiData = new FormData();

            apiData.append('image', {
              uri: response.uri,
              type: response.type,
              name: response.fileName,
            });
            api
              .uploadImage(apiData)
              .then((res) => {
                showMessage({
                  type: 'success',
                  icon: 'success',
                  message: 'Image Upload Successfully',
                });
                this.setState({
                  resourceimage:response
                });
              })
              .catch((error) => {
                alert(JSON.stringify(error));
                showMessage({
                  type: 'danger',
                  icon: 'danger',
                  message: 'faild to upload image',
                });
              });
          },
        );
        // this.setState({isModalVisibal: false});
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  render() {
    const {text, isLoading, resourceimage} = this.state;
    // console.log(resourcePath.uri,"image")
    console.log();
    return (
      <View style={{flex: 1, backgroundColor: colors.themeColor}}>
        <View style={styles.headerView}>
          <TouchableOpacity onPress={this.goToLoginScreen}>
            <Image
              style={styles.backButton}
              source={imagePath.backarrow}></Image>
          </TouchableOpacity>
          <View style={{width: '100%'}}>
            <Text style={styles.HeaderTitleText}>Sign Up</Text>
          </View>
        </View>
        <View style={styles.profileView}>
          <TouchableOpacity onPress={this._profileImageFromGallery}>
            <Image style={styles.profileImage} source={resourceimage}></Image>
          </TouchableOpacity>
        </View>
        <View style={{height: '60%'}}>
          <TextInput
            style={styles.userNameField}
            placeholder={'Name'}
            onChangeText={this._onChangeText('username')}
          />
          <Pressable onPress={this.showDateTimePicker}>
            <View pointerEvents="none">
              <TextInput
                style={styles.birthDateField}
                placeholder={'Date of Birth'}
                defaultValue={text}
              />
            </View>
          </Pressable>

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
          <TextInput
            style={styles.emailField}
            placeholder={'Password'}
            onChangeText={this._onChangeText('userConfirmPassword')}
          />

          <View style={styles.alreadyAccountView}>
            <TouchableOpacity onPress={this.goToLoginScreen}>
              <Text style={{ fontFamily: 'Redressed-Regular',fontSize: 18}}>Already Register?Login</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.mainSignUp}>
              <Image
                style={styles.rightarrowImage}
                source={imagePath.rightarrow}></Image>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{height: '20%', marginVertical: 50}}>
          <Text style={{marginHorizontal: 80, textAlign: 'center', fontFamily: 'Redressed-Regular',fontSize: 16}}>
            By Signing up you agree to our Terms of services and Privacy Policy
          </Text>
        </View>
        <DateTimePicker
          isVisible={this.state.isDateTimePickerVisible}
          onConfirm={this.handleDatePicked}
          onCancel={this.hideDateTimePicker}
        />
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
  profileView: {
    height: '20%',

    justifyContent: 'center',
    alignItems: 'center',
  },
  HeaderTitleText: {
    fontFamily: 'Redressed-Regular',
    fontSize: 25,
    textAlign: 'center',
  },
  backButton: {
    height: 22,
    width: 22,
    position: 'absolute',
    marginTop: 10,
    marginHorizontal: 20,
  },
  userNameField: {
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
    marginVertical: 20,
  },
  emailField: {
    backgroundColor: 'white',
    height: 50,
    marginHorizontal: 30,
    borderRadius: 5,
    borderWidth: 0.5,
  },
  alreadyAccountView: {
    marginHorizontal: 30,
    marginVertical: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rightarrowImage: {
    height: 60,
    width: 60,
  },
});
