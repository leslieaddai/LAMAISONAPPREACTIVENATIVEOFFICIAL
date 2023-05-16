import AsyncStorage from '@react-native-async-storage/async-storage';
import {configureStore} from '@reduxjs/toolkit';
import {persistStore, persistReducer} from 'redux-persist';
import AuthReducer from './AuthReducer';
import SplashReducer from './SplashReducer';
import ImageUpload from './ImageUpload';
import BasketCounter from './BasketCounter';

const persistConfig1 = {
  key: 'auth',
  storage: AsyncStorage,
  whitelist: ['userData', 'token'],
};

const persistConfig2 = {
  key: 'basket',
  storage: AsyncStorage,
  whitelist: ['count'],
};

export const store = configureStore({
  reducer: {
    userData: persistReducer(persistConfig1, AuthReducer),
    Splash: SplashReducer,
    ImageUpload: ImageUpload,
    basket: persistReducer(persistConfig2, BasketCounter),
  },
});
export const persistor = persistStore(store);
