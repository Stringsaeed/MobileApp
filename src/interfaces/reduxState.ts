import {Theme} from '@interfaces/theme';
import {Post} from './post';

export interface UserStore {
  id: string;
  name: string;
  email: string;
  phone: string;
  token: string;
}
export interface HomeStore {
  isLoading: boolean;
  isUpdating: boolean;
  isRefreshing: boolean;
  data: Post[];
}

export interface PostTypeInterface {
  id?: string;
  name?: 'General' | 'Teaching' | 'Food' | string;
}
export interface PostUtilsStore {
  types: PostTypeInterface[];
}
export interface ThemeManager {
  theme: Theme;
  dark: boolean;
}
export interface InitialApp {
  isLoading: boolean;
}
interface NotificationsStore {}

export interface ReduxState {
  notifications: NotificationsStore;
  user: UserStore;
  themeManager: ThemeManager;
  postUtils: PostUtilsStore;
  initialApp: InitialApp;
  home: HomeStore;
}
