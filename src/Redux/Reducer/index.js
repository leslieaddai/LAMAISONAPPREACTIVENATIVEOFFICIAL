import AsyncStorage from '@react-native-async-storage/async-storage';
import {configureStore} from '@reduxjs/toolkit';
import {persistStore, persistReducer} from 'redux-persist';
import AuthReducer from './AuthReducer';
import SplashReducer from './SplashReducer';
import ImageUpload from './ImageUpload';
import BasketCounter from './BasketCounter';
import GuestReducer from './GuestReducer';

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

const persistConfig3 = {
  key: 'guest',
  storage: AsyncStorage,
  whitelist: ['id','device_id','ip_address'],
};

export const store = configureStore({
  reducer: {
    userData: persistReducer(persistConfig1, AuthReducer),
    Splash: SplashReducer,
    ImageUpload: ImageUpload,
    basket: persistReducer(persistConfig2, BasketCounter),
    guestData: persistReducer(persistConfig3, GuestReducer),
  },
});
export const persistor = persistStore(store);
