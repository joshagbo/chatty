import React, {useState, useContext} from 'react';
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import {ErrorComponent} from '../components/errors';
import {useDispatch, useSelector} from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {setError} from '../feature/reducers/errorReducer';

import {bgLight, lightDark, colorDisabled, bgPrimary} from '../utils/colors';

export const ResetScreen = ({navigation}) => {
  /*
    *********************************
    RESET PASSWORD STATE
    *********************************
    */
  const [newPassword, setNewPassword] = useState(null);
  const [repeat, setRepeat] = useState(null);
  const [visible, setVisible] = useState(false);

  const {error} = useSelector(state => state.error);
  const dispatch = useDispatch();

  const handleCreateNewPassword = () => {
    if (!newPassword) {
      dispatch(
        setError({
          isError: true,
          message: 'Enter new password',
        }),
      );
      return;
    }

    if (!repeat) {
      dispatch(
        setError({
          isError: true,
          message: 'Re-enter new password',
        }),
      );
      return;
    }

    if (newPassword !== repeat) {
      dispatch(
        setError({
          isError: true,
          message: 'Password do not match',
        }),
      );
      return;
    }

    navigation.navigate('Login');
  };

  const iconName = visible ? 'eye-off' : 'eye';
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
          Create New Password
        </Text>
        <Text
          style={{
            fontSize: 18,
            fontWeight: '400',
            color: lightDark,
            marginLeft: 20,
            marginTop: 10,
          }}>
          Your new password must be different from the previous ones
        </Text>
        <View style={{marginTop: 40, marginBottom: 20}}>
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
            defaultValue={newPassword}
            onChangeText={passwd => setNewPassword(passwd)}
            secureTextEntry={visible}
          />
          <TouchableOpacity
            style={{position: 'absolute', right: 20, top: 16}}
            onPress={() => setVisible(!visible)}>
            <Ionicons name={iconName} color={colorDisabled} size={Size} />
          </TouchableOpacity>
        </View>

        <TextInput
          placeholderTextColor={colorDisabled}
          placeholder="repeat password"
          style={{
            borderBottomWidth: 1,
            borderBottomColor: '#ccc',
            fontSize: 18,
            fontWeight: '500',
            color: lightDark,
            paddingLeft: 40,
          }}
          defaultValue={repeat}
          onChangeText={passwd => setRepeat(passwd)}
          secureTextEntry={visible}
        />

        <TouchableOpacity
          onPress={handleCreateNewPassword}
          style={{
            alignSelf: 'center',
            padding: 15,
            width: '100%',
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
            Reset Password
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};
