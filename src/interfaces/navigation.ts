import {Post} from './post';

export type ParamsList = {
  LOGIN_SCREEN: {};
  REGISTER_SCREEN: {};
  SPLASH_SCREEN: {};
  '@POST_SCREEN': {item: Post};
  '@TABS/NOTIFICATIONS': {};
  '@TABS': {};
  VERIFY_CODE: {
    name: string;
    email: string;
    phone: string;
    password: string;
    password_confirmation: string;
  };
  MY_POSTS: {};
};
