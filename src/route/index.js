import React, {useState, useEffect} from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {
  stackRouteList,
  guestScreens,
  brandScreens,
  editorScreens,
} from './routeList';

import {useDispatch, useSelector} from 'react-redux';

const Stack = createStackNavigator();

//const [userState,setUserState] = useState();

const AppNavigatior = () => {
  const [status, setStatus] = useState();
  const userState = useSelector(state => state.userData);
  //console.log(userState);

  useEffect(() => {
    if (userState.token !== '') {
      setStatus('loggedIn');
      console.log(userState);
    } else {
      setStatus('loggedOut');
      console.log(userState);
    }
  }, [userState]);

  const GuestScreensRoute = () => (
    <Stack.Navigator>
      {guestScreens.map((item, index) => {
        return (
          <Stack.Screen
            key={index}
            name={item.name}
            component={item.component}
            options={{headerShown: false}}
          />
        );
      })}
    </Stack.Navigator>
  );

  const BrandScreensRoute = () => (
    <Stack.Navigator>
      {brandScreens.map((item, index) => {
        return (
          <Stack.Screen
            key={index}
            name={item.name}
            component={item.component}
            options={{headerShown: false}}
          />
        );
      })}
    </Stack.Navigator>
  );

  const EditorScreensRoute = () => (
    <Stack.Navigator>
      {editorScreens.map((item, index) => {
        return (
          <Stack.Screen
            key={index}
            name={item.name}
            component={item.component}
            options={{headerShown: false}}
          />
        );
      })}
    </Stack.Navigator>
  );

  return (
    //   <NavigationContainer>
    //   <StatusBar
    //     barStyle="dark-content"
    //     translucent
    //     backgroundColor="transparent"
    //   />
    //   <Stack.Navigator initialRouteName={'guestScreen'}>
    //     {stackRouteList.map((item, index) => {
    //       return (
    //         <Stack.Screen
    //           key={index}
    //           name={item.name}
    //           component={item.component}
    //           options={{headerShown: false}}
    //         />
    //       );
    //     })}
    //   </Stack.Navigator>
    // </NavigationContainer>
    <NavigationContainer>
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor="transparent"
      />
      {status === 'loggedIn' ? <BrandScreensRoute /> : <GuestScreensRoute />}
    </NavigationContainer>
  );
};

export default AppNavigatior;
