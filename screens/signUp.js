import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Image,
  StatusBar,
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
  Size,
} from '../utils/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {ErrorComponent} from '../components/errors';
import {useSelector, useDispatch} from 'react-redux';
import {setError} from '../feature/reducers/errorReducer';

export const SignUpScreen = ({navigation}) => {
  const [firstname, setFirstname] = useState(null);
  const [lastname, setLastname] = useState(null);
  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [visible, setVisible] = useState(true);

  const {
    error: {error},
  } = useSelector(state => state);
  const dispatch = useDispatch();

  const iconName = visible ? 'eye-off' : 'eye';

  const handleRegister = () => {
    if (!firstname) {
      dispatch(
        setError({
          isError: true,
          message: 'Firstname is required',
        }),
      );
      return;
    }

    if (!lastname) {
      dispatch(
        setError({
          isError: true,
          message: 'Lastname is required',
        }),
      );
      return;
    }
    if (!username) {
      dispatch(
        setError({
          isError: true,
          message: 'Username is required',
        }),
      );
      return;
    }

    if (!email) {
      dispatch(
        setError({
          isError: true,
          message: 'Email is required',
        }),
      );
      return;
    }

    if (!password) {
      dispatch(
        setError({
          isError: true,
          message: 'Password is required',
        }),
      );
      return;
    }

    navigation.navigate('Login', {email});
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: {bgLight}}}>
      <StatusBar barStyle="dark-content" backgroundColor={bgLight} />
      {error.isError && <ErrorComponent message={error.message} />}
      <ScrollView
        contentContainerStyle={{
          backgroundColor: bgLight,
          paddingVertical: 20,
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
              defaultValue={firstname}
              onChangeText={fName => setFirstname(fName)}
            />
          </View>
          <View style={styles.fieldContainer}>
            <TouchableOpacity style={{position: 'absolute', left: 0, top: 16}}>
              <MaterialIcons
                name="person-outline"
                color={colorDisabled}
                size={Size}
              />
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
              defaultValue={lastname}
              onChangeText={lName => setLastname(lName)}
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
              defaultValue={username}
              onChangeText={uName => setUsername(uName)}
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
              defaultValue={email}
              onChangeText={mail => setEmail(mail)}
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
              defaultValue={password}
              onChangeText={passwd => setPassword(passwd)}
              secureTextEntry={visible}
            />
            <TouchableOpacity
              style={{position: 'absolute', right: 0, top: 16}}
              onPress={() => setVisible(!visible)}>
              <Ionicons name={iconName} color={colorDisabled} size={Size} />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={handleRegister}
            style={{
              alignSelf: 'center',
              padding: 15,
              width: '100%',
              borderRadius: 50,
              backgroundColor: bgPrimary,
              marginTop: 20,
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
          <Text
            style={{
              fontSize: 14,
              fontWeight: '500',
              color: lightDark,
              marginLeft: 20,
              marginTop: 10,
              textAlign: 'center',
              width: '80%',
              alignSelf: 'center',
            }}>
            By registering, you acknowledge and agree to our{' '}
            <Text style={{textDecorationLine: 'underline'}}>
              Terms of use and privacy policy
            </Text>
          </Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 10,
          }}>
          <TouchableOpacity>
            <MaterialIcons name="facebook" color={colorFb} size={Size + 7} />
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
            <MaterialCommunityIcons
              name="google"
              color={bgLight}
              size={Size - 5}
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
            <FontAwesome5
              name="linkedin-in"
              color={bgLight}
              size={Size - 7}
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
