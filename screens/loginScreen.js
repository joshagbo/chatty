import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Image,
  StatusBar,
  useWindowDimensions,
  TextInput,
} from 'react-native';
import {
  bgLight,
  textDark,
  lightDark,
  bgPrimary,
  colorFb,
  colorGoogle,
  colorDisabled,
} from '../utils/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export const LoginScreen = ({navigation}) => {
  const {width} = useWindowDimensions();

  const Size = 27;

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: {bgLight}}}>
      <StatusBar barStyle="dark-content" backgroundColor={bgLight} />
      <ScrollView
        contentContainerStyle={{
          backgroundColor: bgLight,
          flex: 1,
          paddingVertical: 40,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 40,
            marginHorizontal: 30,
          }}>
          <Image
            source={require('../assets/rounded-chat.png')}
            style={{width: 40, height: 40, resizeMode: 'cover'}}
          />
          <Text
            style={{
              fontSize: 24,
              fontWeight: '600',
              marginLeft: 8,
              color: lightDark,
            }}>
            Chatty
          </Text>
        </View>

        <Text
          style={{
            fontSize: 27,
            fontWeight: '500',
            color: lightDark,
            marginLeft: 30,
          }}>
          Welcome Back!
        </Text>
        <Text
          style={{
            fontSize: 18,
            fontWeight: '400',
            color: lightDark,
            marginLeft: 30,
            marginTop: 10,
          }}>
          SignIn to continue
        </Text>
        <View
          style={{
            marginVertical: 45,
            marginHorizontal: 30,
          }}>
          <View style={{marginBottom: 20}}>
            <TouchableOpacity style={{position: 'absolute', left: 0, top: 16}}>
              <MaterialIcons
                name="alternate-email"
                color={colorDisabled}
                size={Size}
              />
            </TouchableOpacity>
            <TextInput
              placeholderTextColor={colorDisabled}
              placeholder="firstname"
              style={{
                borderBottomWidth: 1,
                borderBottomColor: colorDisabled,
                marginBottom: 10,
                fontSize: 18,
                fontWeight: '500',
                color: lightDark,
                paddingLeft: 40,
              }}
              // onFocus={() => onInputFocus('firstname')}
            />
          </View>

          <View style={{marginBottom: 20}}>
            <TouchableOpacity style={{position: 'absolute', left: 0, top: 16}}>
              <MaterialIcons name="vpn-key" color={colorDisabled} size={Size} />
            </TouchableOpacity>
            <TextInput
              placeholderTextColor={colorDisabled}
              placeholder="password"
              style={{
                borderBottomWidth: 1,
                borderBottomColor: '#ccc',
                fontSize: 18,
                fontWeight: '500',
                color: lightDark,
                paddingLeft: 40,
              }}
            />
          </View>

          <TouchableOpacity
            onPress={() => navigation.navigate('Splash')}
            style={{
              alignSelf: 'center',
              padding: 15,
              width: width - 100,
              borderRadius: 50,
              backgroundColor: bgPrimary,
              marginTop: 40,
            }}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: '500',
                color: bgLight,
                textAlign: 'center',
              }}>
              Login Now
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={{alignSelf: 'center'}}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: '600',
                textAlign: 'center',
                color: lightDark,
                marginTop: 10,
              }}>
              Forget password?
            </Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 10,
          }}>
          <TouchableOpacity>
            <MaterialIcons name="facebook" color={colorFb} size={33} />
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              width: 30,
              height: 30,
              borderRadius: 50,
              backgroundColor: colorGoogle,
              alignItems: 'center',
              justifyContent: 'center',
              marginHorizontal: 8,
              marginRight: 10,
            }}>
            <Ionicons
              name="logo-google"
              color={bgLight}
              size={22}
              style={{borderRadius: 50}}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: 30,
              height: 30,
              borderRadius: 50,
              backgroundColor: bgPrimary,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Ionicons
              name="logo-linkedin"
              color={bgLight}
              size={22}
              style={{borderRadius: 50}}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            marginTop: 20,
            flexDirection: 'row',
            alignItems: 'center',
            alignSelf: 'center',
          }}>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 16,
              fontWeight: '500',
              color: lightDark,
            }}>
            Don't have account?{' '}
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 16,
                fontWeight: '500',
                color: textDark,
              }}>
              SignUp
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
