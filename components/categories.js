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
} from 'react-native';

const dark = '#333';
const lightDark = '#666';
const bgPrimary = '#4D4A95';

const categoryList = [
  {
    title: 'Metaverse',
    key: 'Meta',
    poster: require('../assets/meta.jpg'),
    tags: [],
  },
  {
    title: 'AI',
    key: 'AI',
    poster: require('../assets/ai.jpg'),
    tags: [],
  },
  {
    title: 'Aria Photography',
    key: 'Aria Photography',
    poster: require('../assets/aria_photography.jpg'),
    tags: [],
  },
  {
    title: 'Climate Change',
    key: 'Climate Change',
    poster: require('../assets/climate.jpg'),
    tags: [],
  },
];

//List Footer
const ListFooterComponent = () => (
  <View>
    <Text
      style={{
        color: lightDark,
        textAlign: 'center',
        fontSize: 18,
        fontWeight: '600',
      }}>
      I have interest on something else?
    </Text>
    <TouchableOpacity
      style={{
        backgroundColor: bgPrimary,
        padding: 12,
        marginTop: 10,
        borderRadius: 15,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Image
        source={require('../assets/discussion.png')}
        style={{width: 35, height: 35, marginRight: 10}}
      />
      <Text
        style={{
          color: dark,
          textAlign: 'center',
          fontSize: 18,
          fontWeight: '600',
          color: '#fff',
        }}>
        Create Discussion
      </Text>
    </TouchableOpacity>
  </View>
);

//ListHeader
const ListHeaderComponent = () => (
  <View>
    <Text
      style={{
        fontSize: 18,
        fontWeight: '500',
        color: dark,
        textAlign: 'center',
      }}>
      Pick a interest. Join the discussion
    </Text>
  </View>
);

export const Categories = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [endThreshholdReached, setEndThresholdReached] = useState(false);

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
        <Text
          style={{
            fontSize: 18,
            fontWeight: '500',
            color: lightDark,
            marginBottom: 10,
          }}>
          {item.title}
        </Text>
        <TouchableOpacity onPress={() => onImagePressed(item.title)}>
          <Image
            source={item.poster}
            style={{
              width: '100%',
              height: 200,
              borderRadius: 15,
            }}
          />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <FlatList
        stickyHeaderHiddenOnScroll={true}
        data={categoryList}
        renderItem={_renderItem}
        keyExtractor={(item, key) => item.key}
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
