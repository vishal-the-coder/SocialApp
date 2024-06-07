import messaging from '@react-native-firebase/messaging';

// screens name
export const LOGIN_SCREEN = 'Login';
export const SIGNUP_SCREEN = 'SignUp';
export const HOME_SCREEN = 'Home';
export const PROFILE_SCREEN = 'Profile';
export const CHAT_SCREEN = 'Chat';
export const SEARCH_SCREEN = 'Search';
export const ADD_SCREEN = 'Add';
export const UPDATE_PROFILE_SCREEN = 'UpdateProfile';
export const TAB_SCREEN = 'TabScreen';
export const SPLASH_SCREEN = 'SplashScreen';
export const IMAGE_VIEW_SCREEN = 'ImageView';
export const USER_IMAGE_VIEW_SCREEN = 'UserImageView';
export const COMMENTS_SCREEN = 'Comments';
export const USERS_LIST_SCREEN = 'UsersList';
export const OTHER_USER_PROFILE = 'OtherUserProfile';

// images
export const IMAGE = {
  LOGO: require('../Assets/Logo.png'),
  AVATAR: require('../Assets/blank_avtar.webp'),
};

// firebase collection name

export const USERS = 'users';
export const POSTS = 'posts';
export const TOKENS = 'tokens';
export const AVATAR = 'avatar';

// screen show name
export const FOLLOWING = 'Following';
export const FOLLOWERS = 'Followers';

// getFcmToken
export const getFcmToken = async () => {
  return await messaging().getToken();
};
