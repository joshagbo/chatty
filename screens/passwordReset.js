import React, {useState} from 'react';
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useDispatch, useSelector} from 'react-redux';
import {ErrorComponent} from '../components/errors';
import {setError} from '../feature/reducers/errorReducer';

import {bgLight, lightDark, colorDisabled, bgPrimary} from '../utils/colors';

export const PasswordResetScreen = ({navigation}) => {
  /*
    *********************************
    RESET PASSWORD STATE
    *********************************
    */
  const [resetEmail, setResetEmail] = useState();

  const {error} = useSelector(state => state.error);
  const dispatch = useDispatch();

  const handleSendInstructions = () => {
    if (!resetEmail) {
      dispatch(setError({message: 'Email field is empty', isError: true}));
      return;
    }
    navigation.navigate('Reset');
  };

  const Size = 27;

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: bgLight}}>
      <StatusBar barStyle="dark-content" backgroundColor={bgLight} />
      {error.isError && <ErrorComponent message={error.message} />}
      <ScrollView
        contentContainerStyle={{
          backgroundColor: bgLight,
          paddingHorizontal: 20,
          marginTop: 100,
        }}>
        <Text
          style={{
            fontSize: 27,
            fontWeight: '500',
            color: lightDark,
            marginLeft: 20,
          }}>
          Reset password
        </Text>
        <Text
          style={{
            fontSize: 18,
            fontWeight: '400',
            color: lightDark,
            marginLeft: 20,
            marginTop: 10,
          }}>
          Enter the email associated with your account and we'll send email with
          reset instructions to reset your password.
        </Text>

        <View style={{marginTop: 40}}>
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
              borderBottomColor: colorDisabled,
              marginBottom: 10,
              fontSize: 18,
              fontWeight: '500',
              color: lightDark,
              paddingLeft: 40,
            }}
            defaultValue={resetEmail}
            onChangeText={mail => setResetEmail(mail)}
          />
        </View>

        <TouchableOpacity
          onPress={handleSendInstructions}
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
            Send Instruction
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};
