import AsyncStorage from '@react-native-async-storage/async-storage';
import {configureStore} from '@reduxjs/toolkit';
import {persistStore, persistReducer} from 'redux-persist';
import AuthReducer from './AuthReducer';
import SplashReducer from './SplashReducer';

const persistConfig1 = {
  key: 'auth',
  storage: AsyncStorage,
  whitelist: ['userData', 'token'],
};

export const store = configureStore({
  reducer: {
    userData: persistReducer(persistConfig1, AuthReducer),
    Splash: SplashReducer,
  },
});
export const persistor = persistStore(store);
