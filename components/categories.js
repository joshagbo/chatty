import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
  FlatList,
  SafeAreaView,
  useWindowDimensions,
  StyleSheet,
} from 'react-native';
import {bgLight, Size, bgPrimary, lightDark, textDark} from '../utils/colors';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {deviceTypeAndroid} from '../utils/platforms';
import {useSelector} from 'react-redux';

//List Footer
const ListFooterComponent = () => (
  <View>
    <Text
      style={{
        ...styles.description,
        fontWeight: '500',
        textAlign: 'center',
        marginBottom: 0,
      }}>
      I have interest on something else?
    </Text>
    <TouchableOpacity
      style={{
        ...styles.btnLogin,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text style={styles.btnLoginText}>Create Discussion</Text>
      <FontAwesome5 name="bullhorn" size={Size} color={bgLight} />
    </TouchableOpacity>
  </View>
);

//ListHeader
const ListHeaderComponent = () => (
  <View>
    <Text style={styles.title}>Trending Discussions</Text>
  </View>
);

export const Categories = ({navigation}) => {
  const [refreshing, setRefreshing] = useState(false);
  const [endThreshholdReached, setEndThresholdReached] = useState(false);

  const {discussionList} = useSelector(state => state.globals);

  const onImagePressed = isSelected => {
    // setCategory(isSelected);
    Alert.alert(
      'Notification',
      `${isSelected} chat Isn't available yet. Click join to be whitelisted for this feature when available`,
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
              `You have been whitelisted for the category ${isSelected} chat`,
            ),
        },
      ],
    );
  };

  const _renderItem = ({item}) => {
    return (
      <View
        style={{
          width: '100%',
          justifyContent: 'center',
          paddingVertical: 10,
        }}>
        <Text style={styles.description}>{item.title}</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('Discussion', {id: item.key})}
          style={{opacity: 0.9}}>
          <Image
            source={item.poster}
            style={{
              width: '100%',
              height: 300,
              borderRadius: 15,
              resizeMode: deviceTypeAndroid === 'Handset' ? 'stretch' : 'cover',
            }}
          />
          <TouchableOpacity
            onPress={() => onImagePressed(item.title)}
            style={{
              position: 'absolute',
              right: 30,
              top: 20,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                color: bgLight,
                fontSize: deviceTypeAndroid === 'Handset' ? 16 : 27,
                fontFamily:
                  deviceTypeAndroid === 'Handset'
                    ? 'Outfit-Medium'
                    : 'Outfit-Bold',
                marginRight: 5,
              }}>
              Join
            </Text>
            <View
              style={{
                backgroundColor: '#3b5998',
                borderRadius: 50,
                padding: 5,
              }}>
              <FontAwesome5 name="plus" size={Size / 2} color={bgLight} />
            </View>
          </TouchableOpacity>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <FlatList
        stickyHeaderHiddenOnScroll={true}
        data={discussionList}
        renderItem={_renderItem}
        keyExtractor={(_, key) => key}
        ListHeaderComponent={ListHeaderComponent}
        ListHeaderComponentStyle={{paddingBottom: 16}}
        ListFooterComponent={endThreshholdReached && ListFooterComponent}
        ListFooterComponentStyle={{paddingTop: 20}}
        contentContainerStyle={{
          paddingVertical: 20,
          width: useWindowDimensions().width - 40,
          alignSelf: 'center',
        }}
        getItemLayout={(length, index) => ({length, index})}
        refreshing={refreshing}
        onRefresh={() => {
          setRefreshing(true);
          setTimeout(() => setRefreshing(false), 5000);
        }}
        progressViewOffset={20}
        onEndReached={() => {
          setEndThresholdReached(true);
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  description: {
    fontSize: deviceTypeAndroid === 'Handset' ? 18 : 27,
    fontFamily: 'Outfit',
    color: lightDark,
    marginBottom: 10,
  },

  title: {
    fontSize: deviceTypeAndroid === 'Handset' ? 20 : 35,
    fontFamily: 'Outfit-Bold',
    color: lightDark,
    textAlign: 'center',
    marginTop: 10,
  },

  btnLogin: {
    alignSelf: 'center',
    padding: 15,
    width: '100%',
    borderRadius: 50,
    backgroundColor: bgPrimary,
    marginTop: 20,
  },
  btnLoginText: {
    fontSize: deviceTypeAndroid === 'Handset' ? 18 : 24,
    marginRight: 5,
    fontFamily:
      deviceTypeAndroid === 'Handset' ? 'Outfit-Medium' : 'Outfit-Bold',
    color: bgLight,
    textAlign: 'center',
  },
});
