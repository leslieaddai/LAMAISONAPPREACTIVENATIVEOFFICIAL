import React, { useState, useEffect } from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {
  stackRouteList,
  guestScreens,
  brandScreens,
  editorScreens,
} from './routeList';
import { useDispatch, useSelector } from 'react-redux';
import types from '../Redux/types';
import { globalSetting } from '../config/Urls';
import axios from 'react-native-axios';

const Stack = createStackNavigator();

const AppNavigatior = () => {
  const [status, setStatus] = useState('guest');
  const token = useSelector(state => state?.userData?.token);
  const id = useSelector(state => state?.userData?.userData?.role?.[0]?.id);
  const [sucess, setSuccess] = useState(false)
  const dispatch = useDispatch()
  useEffect(() => {
    if (!sucess) getApiData(globalSetting)
  }, [sucess])

  useEffect(() => {
    if (token === '') {
      setStatus('guest');
    } else if (id === 3) {
      setStatus('brand');
    } else if (id === 2) {
      setStatus('editor');
    }
  }, [token, id]);

  const getApiData = (url) => {
    axios
      .get(url)
      .then(function (response) {
        console.log(response.data)
        dispatch({
          type: types.Applaunch,
          payload: response.data,
        });
      })
      .catch(function (error) {
        console.log("response splash error", error.response.data);
      });
  };


  const GuestScreensRoute = () => (
    <Stack.Navigator initialRouteName='guestScreen'>
      {guestScreens.map((item, index) => {
        return (
          <Stack.Screen
            key={index}
            name={item.name}
            component={item.component}
            options={{ headerShown: false }}
          />
        );
      })}
    </Stack.Navigator>
  );

  const BrandScreensRoute = () => (
    <Stack.Navigator initialRouteName='bottomNavigation'>
      {brandScreens.map((item, index) => {
        return (
          <Stack.Screen
            key={index}
            name={item.name}
            component={item.component}
            options={{ headerShown: false }}
          />
        );
      })}
    </Stack.Navigator>
  );

  const EditorScreensRoute = () => (
    <Stack.Navigator initialRouteName='bottomNavigation'>
      {editorScreens.map((item, index) => {
        return (
          <Stack.Screen
            key={index}
            name={item.name}
            component={item.component}
            options={{ headerShown: false }}
          />
        );
      })}
    </Stack.Navigator>
  );

  return (
    <NavigationContainer>
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor="transparent"
      />
      {status === 'brand' ? <BrandScreensRoute /> : status === 'editor' ? <EditorScreensRoute /> : <GuestScreensRoute />}
    </NavigationContainer>
  );
};

export default AppNavigatior;
