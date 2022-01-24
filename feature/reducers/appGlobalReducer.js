import {createSlice} from '@reduxjs/toolkit';
import {bgPrimary} from '../../utils/colors';

const slides = [
  {
    key: 'welcome',
    title: 'welcome, Chatty!',
    text: 'A next-gen chat application. Click Next to begin',
    image: require('../../assets/images/welcome.png'),
    backgroundColor: bgPrimary,
  },
  {
    key: 'vr',
    title: 'Metaverse',
    text: 'Join the discussion and learn then nuances of Virtual Reality',
    image: require('../../assets/images/Virtual_reality.png'),
    backgroundColor: bgPrimary,
  },
  {
    key: 'ai',
    title: 'Artificial Intelligence',
    text: 'What do people say about mankind greatest invention. Join the community to learn more',
    image: require('../../assets/images/Firmware.png'),
    backgroundColor: bgPrimary,
  },
  {
    key: 'photography',
    title: 'Arial Photography',
    text: 'Get the chance to meet other professional and learn the de factor in Arial Photography.',
    image: require('../../assets/images/Camera.png'),
    backgroundColor: bgPrimary,
  },
  {
    key: 'climate',
    title: 'Climate Change',
    text: 'With the recent rise in sea level and expotential temperature rise. What are scientists and folks saying about climate change',
    image: require('../../assets/images/among_nature.png'),
    backgroundColor: bgPrimary,
  },
];

const discussionList = [
  {
    title: 'Metaverse',
    key: 'Meta',
    poster: require('../../assets/images/meta.jpg'),
    tags: [],
  },
  {
    title: 'AI',
    key: 'AI',
    poster: require('../../assets/images/ai.jpg'),
    tags: [],
    status: '',
    isPrivate: false,
    activeMembers: 0,
    totalMembers: 0,
    description: '',
  },
  {
    title: 'BlockChain',
    key: 'blockchain',
    poster: require('../../assets/images/blockchain.jpg'),
    tags: [],
    isPrivate: false,
    activeMembers: 0,
    totalMembers: 0,
    description: '',
  },
  {
    title: 'Aria Photography',
    key: 'Aria Photography',
    poster: require('../../assets/images/aria_photography.jpg'),
    tags: [],
    isPrivate: false,
    activeMembers: 0,
    totalMembers: 0,
    description: '',
  },
  {
    title: 'Climate Change',
    key: 'Climate Change',
    poster: require('../../assets/images/climate.jpg'),
    tags: [],
    isPrivate: false,
    activeMembers: 0,
    totalMembers: 0,
    description: '',
  },
];

const initialState = {
  slides,
  discussionList,
  discussion: {
    title: '',
    key: '',
    poster: null,
    tags: [],
    isPrivate: false,
    activeMembers: 0,
    totalMembers: 0,
    description: '',
  },
  login: {
    loginInfo: {
      email: '',
      password: '',
    },
    isError: false,
    errorMsg: '',
    isSuccess: false,
  },
  registration: {
    registerInfo: {
      firstname: '',
      lastname: '',
      username: '',
      email: '',
      password: '',
    },
    isError: false,
    errorMsg: '',
  },
  error: {isError: false, message: null, type: null},
  success: {isSuccess: false, message: '', type: null},
};

export const AppGlobalReducer = createSlice({
  name: 'appGlobalReducer',
  initialState,
  reducers: {
    createDiscussion: (state, actions) => {
      return state.discussionList.push(actions.payload);
    },

    setError: (state, actions) => {
      state.error = actions.payload;
    },
    setSuccess: (state, actions) => {
      state.success = actions.payload;
    },
    onLogin: (state, actions) => {
      state.login = actions.payload;
    },
    onRegister: (state, actions) => {
      state.registration = actions.payload;
    },
  },
});

export const {createDiscussion, setError, setSuccess, onLogin, onRegister} =
  AppGlobalReducer.actions;
export default AppGlobalReducer.reducer;
