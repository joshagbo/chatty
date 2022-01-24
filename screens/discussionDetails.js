import React from 'react';
import {
  View,
  Text,
  StatusBar,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {bgLight, bgPrimary, lightDark, Size} from '../utils/colors';
import {useSelector} from 'react-redux';
import {deviceTypeAndroid} from '../utils/platforms';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

export const DiscussionDetails = ({navigation, route}) => {
  //hook up to redux store
  const {discussionList} = useSelector(state => state.globals);

  const discussion = discussionList.filter(_ => _.key === route.params.id);
  const handleJoin = () =>
    // alert user of incoming features
    Alert.alert(
      'Aah!',
      `${discussion[0].title} chat Isn't available yet. Click join to be whitelisted for this feature when available`,
      [
        {
          text: 'Cancel',
          onPress: () => Alert.alert('Nothing was done!'),
          style: 'cancel',
        },

        {
          text: 'Join waiting list',
          onPress: () =>
            Alert.alert(
              'Congratulations!',
              `You have been whitelisted for the category`,
            ),
        },
      ],
    );

  return (
    <>
      <ImageBackground
        source={discussion[0].poster}
        style={{width: '100%', resizeMode: 'cover'}}>
        <StatusBar
          translucent
          barStyle="dark-contents"
          backgroundColor={'transparent'}
        />
      </ImageBackground>
      <SafeAreaView style={{flex: 1, backgroundColor: bgLight}}>
        <ScrollView contentContainerStyle={StyleSheet.container}>
          <ImageBackground
            source={discussion[0].poster}
            style={styles.bannerImage}>
            <View
              style={{
                width: '100%',
                height: '100%',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text style={styles.title}>{discussion[0].title}</Text>
              <TouchableOpacity
                onPress={handleJoin}
                style={{
                  padding: 5,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: 20,
                  alignSelf: 'flex-end',
                }}>
                <Text
                  style={[
                    styles.description,
                    {marginRight: 5, color: bgLight},
                  ]}>
                  Join
                </Text>
                <View
                  style={{
                    backgroundColor: '#3b5998',
                    borderRadius: 50,
                    padding: 5,
                  }}>
                  <FontAwesome5
                    name={'plus'}
                    size={
                      deviceTypeAndroid === 'Handset' ? Size / 2 : Size / 1.5
                    }
                    color={bgLight}
                  />
                </View>
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: bgLight,
  },
  bannerImage: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
  },

  description: {
    fontSize: deviceTypeAndroid === 'Handset' ? 18 : 27,
    color: lightDark,
    fontFamily: 'Outfit',
  },

  title: {
    fontSize: deviceTypeAndroid === 'Handset' ? 24 : 30,
    fontFamily: 'Outfit-Bold',
    color: bgLight,
    textAlign: 'center',
    marginLeft: 20,
  },
});
