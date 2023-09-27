import AsyncStorage from '@react-native-async-storage/async-storage';
import {configureStore} from '@reduxjs/toolkit';
import {persistStore, persistReducer} from 'redux-persist';
import AuthReducer from './AuthReducer';
import SplashReducer from './SplashReducer';
import ImageUpload from './ImageUpload';
import BasketCounter from './BasketCounter';
import GuestReducer from './GuestReducer';
import PriceReducer from './PriceReducer';
import ColourReducer from './ColourReducer';
import SizeReducer from './SizeReducer';
import StyleReducer from './StyleReducer';
import FilterItemReducer from './FilterItemReducer';
import ContinentReducer from './ContinentReducer';
import GuestBasket from './GuestBasket';
import GloabalDataReducer from './GloabalDataReducer';
import OrderCountReducer from './OrderCountReducer';
import WarningReducer from './WarningReducer';

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

const persistConfig4 = {
  key: 'guestbasket',
  storage: AsyncStorage,
  whitelist: ['products'],
};
const globalPersistConfig = {
  key: 'globaldata',
  storage: AsyncStorage,
  whitelist: ['globalData'],
};
const orderconfig = {
  key: 'ordercount',
  storage:AsyncStorage,
  whitelist:'ordercount'
}
const warningconfig = {
  key: 'warningcheck',
  storage:AsyncStorage,
  whitelist:'warningcheck'
}

export const store = configureStore({
  reducer: {
    userData: persistReducer(persistConfig1, AuthReducer),
    globalData: persistReducer(globalPersistConfig, GloabalDataReducer),
    Splash: SplashReducer,
    ImageUpload: ImageUpload,
    basket: persistReducer(persistConfig2, BasketCounter),
    guestData: persistReducer(persistConfig3, GuestReducer),
    Price:PriceReducer,
    Colour:ColourReducer,
    Size:SizeReducer,
    Style:StyleReducer,
    Item:FilterItemReducer,
    Continent:ContinentReducer,
    GuestBasket:persistReducer(persistConfig4,GuestBasket),
    ordercount: persistReducer(orderconfig, OrderCountReducer),
    warningcheck: persistReducer(warningconfig,WarningReducer)
  },
});
export const persistor = persistStore(store);
