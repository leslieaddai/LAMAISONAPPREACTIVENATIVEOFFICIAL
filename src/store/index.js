import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistStore, persistCombineReducers } from 'redux-persist';
// import { authReducer, workoutReducer, timeslotReducer, trainerReducer, cartReducer, catgAndPrdtReducer, favouriteReducer, homeReducer, orderReducer, packageReducer, userReducer, mediaReducer } from './reducer'
import { authReducer } from './reducer/authReducer'

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['auth']
  };
  
  // const rootReducer = {
  //     auth:  authReducer,
  //     cart:   cartReducer,
  //     catgAngPrdt: catgAndPrdtReducer,
  //     favourite: favouriteReducer,
  //     home: homeReducer,
  //     order: orderReducer,
  //     toast: toastReducer,
  //     user: userReducer,
  //     timeslot:timeslotReducer,
  //     media:mediaReducer,
  //     trainer:trainerReducer,
  //     workout:workoutReducer,
  //     package:packageReducer
  // }   
  const rootReducer = {
    auth:  authReducer,
}   
  const persistCombinedReducers = persistCombineReducers(persistConfig, rootReducer);

export const store = createStore(persistCombinedReducers, applyMiddleware(thunk));
export const persistor = persistStore(store)