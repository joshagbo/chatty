import React, {useState} from 'react';
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
  StyleSheet,
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

export const SignUpScreen = ({navigation}) => {
  const [firstnameActive, setFirstnameActive] = useState(false);
  const [lastnameActive, setLastnameActive] = useState(false);
  const [usernameActive, setUsernameActive] = useState(false);
  const [emailActive, setEmailActive] = useState(false);
  const [passwordActive, setPasswordActive] = useState(false);

  const {width, height} = useWindowDimensions();
  const Size = 27;

  const onInputFocus = input => {};

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: {bgLight}}}>
      <StatusBar barStyle="dark-content" backgroundColor={bgLight} />
      <ScrollView
        contentContainerStyle={{
          backgroundColor: bgLight,

          paddingVertical: 40,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 40,
            marginHorizontal: 20,
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
            marginLeft: 20,
          }}>
          Explore Possibilities!
        </Text>
        <Text
          style={{
            fontSize: 18,
            fontWeight: '400',
            color: lightDark,
            marginLeft: 20,
            marginTop: 10,
          }}>
          SignUp Now
        </Text>
        <View
          style={{
            marginVertical: 45,
            marginHorizontal: 20,
          }}>
          <View style={styles.fieldContainer}>
            <TouchableOpacity style={{position: 'absolute', left: 0, top: 16}}>
              <Ionicons name="person" color={colorDisabled} size={Size} />
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
              onFocus={() => onInputFocus('firstname')}
            />
          </View>
          <View style={styles.fieldContainer}>
            <TouchableOpacity style={{position: 'absolute', left: 0, top: 16}}>
              <Ionicons name="person" color={colorDisabled} size={Size} />
            </TouchableOpacity>
            <TextInput
              placeholderTextColor={colorDisabled}
              placeholder="lastname"
              style={{
                borderBottomWidth: 1,
                borderBottomColor: colorDisabled,
                fontSize: 18,
                fontWeight: '500',
                color: lightDark,
                paddingLeft: 40,
              }}
            />
          </View>
          <View style={styles.fieldContainer}>
            <TouchableOpacity style={{position: 'absolute', left: 0, top: 16}}>
              <Ionicons
                name="person-circle"
                color={colorDisabled}
                size={Size}
              />
            </TouchableOpacity>
            <TextInput
              placeholderTextColor={colorDisabled}
              placeholder="username"
              style={{
                borderBottomWidth: 1,
                borderBottomColor: '#ccc',
                marginBottom: 10,
                fontSize: 18,
                fontWeight: '500',
                color: lightDark,
                paddingLeft: 40,
              }}
            />
          </View>

          <View style={styles.fieldContainer}>
            <TouchableOpacity style={{position: 'absolute', left: 0, top: 16}}>
              <MaterialIcons
                name="alternate-email"
                color={colorDisabled}
                size={Size}
              />
            </TouchableOpacity>
            <TextInput
              placeholderTextColor={colorDisabled}
              placeholder="email"
              style={{
                borderBottomWidth: 1,
                borderBottomColor: '#ccc',
                marginBottom: 10,
                fontSize: 18,
                fontWeight: '500',
                color: lightDark,
                paddingLeft: 40,
              }}
            />
          </View>
          <View style={styles.fieldContainer}>
            <TouchableOpacity style={{position: 'absolute', left: 0, top: 16}}>
              <MaterialIcons name="vpn-key" color={colorDisabled} size={Size} />
            </TouchableOpacity>
            <TextInput
              placeholderTextColor={colorDisabled}
              style={{
                borderBottomWidth: 1,
                borderBottomColor: '#ccc',
                fontSize: 18,
                fontWeight: '500',
                color: lightDark,
                paddingLeft: 40,
              }}
              placeholder="password"
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
              SignUp Now
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
            Already have account?{' '}
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 16,
                fontWeight: '500',
                color: textDark,
              }}>
              SignIn
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  fieldContainer: {
    marginBottom: 10,
  },
});
