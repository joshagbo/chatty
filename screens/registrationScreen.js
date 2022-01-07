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
} from 'react-native';
import {
  bgLight,
  textDark,
  lightDark,
  bgPrimary,
  colorFb,
  colorGoogle,
} from '../utils/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export const RegistrationScreen = ({navigation}) => {
  const {height, width} = useWindowDimensions();

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: bgLight}}>
      <StatusBar barStyle="dark-content" backgroundColor={bgLight} />
      <ScrollView
        contentContainerStyle={{
          backgroundColor: bgLight,
          paddingBottom: 40,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 20,
            marginHorizontal: 20,
          }}>
          <Image
            source={require('../assets/rounded-chat.png')}
            style={{
              width: 40,
              height: 40,
              marginVertical: 40,
            }}
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

        <Image
          source={require('../assets/connect_world.png')}
          style={{
            width: '100%',
            height: 250,
            resizeMode: 'cover',
            marginBottom: 40,
          }}
        />

        <View style={{marginBottom: 40}}>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 24,
              fontWeight: 'bold',
              color: textDark,
            }}>
            Welcome To Chatty!
          </Text>
          <Text
            style={{
              textAlign: 'center',
              color: lightDark,
              fontSize: 18,
              fontWeight: '400',
            }}>
            A Next generation chat application
          </Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            marginVertical: 10,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Login')}
            style={{
              backgroundColor: bgPrimary,
              paddingVertical: 10,
              borderRadius: 50,
              paddingHorizontal: 20,
              marginRight: 20,
            }}>
            <Text
              style={{
                color: bgLight,
                fontSize: 18,
                fontWeight: '500',
              }}>
              Login
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('Signup')}
            style={{
              paddingVertical: 10,
              borderRadius: 50,
              paddingHorizontal: 20,
              borderWidth: 1,
            }}>
            <Text
              style={{
                color: textDark,
                fontSize: 18,
                fontWeight: '500',
              }}>
              SignUp
            </Text>
          </TouchableOpacity>
        </View>

        <Text
          style={{
            fontSize: 18,
            textAlign: 'center',
            fontWeight: '500',
            marginTop: 40,
            color: lightDark,
          }}>
          Or via social media
        </Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 10,
          }}>
          <TouchableOpacity>
            <MaterialIcons name="facebook" color={colorFb} size={43} />
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              width: 36,
              height: 36,
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
              size={24}
              style={{borderRadius: 50}}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: 36,
              height: 36,
              borderRadius: 50,
              backgroundColor: bgPrimary,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Ionicons
              name="logo-linkedin"
              color={bgLight}
              size={24}
              style={{borderRadius: 50}}
            />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};