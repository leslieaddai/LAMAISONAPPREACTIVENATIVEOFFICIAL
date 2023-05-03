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
  const [status, setStatus] = useState('guest');
  const userState = useSelector(state => state.userData);
  //console.log(userState);

  useEffect(() => {
    if (userState.token === '') {
      setStatus('guest');
      console.log(userState);
    } else if (userState.userData.role[0].id===3) {
      setStatus('brand');
      console.log(userState.userData.role[0].title);
    } else if (userState.userData.role[0].id===2) {
      setStatus('editor');
      console.log(userState.userData.role[0].title);
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
      {/* {status === 'loggedIn' ? <BrandScreensRoute /> : <GuestScreensRoute />} */}
      {status === 'brand' ? <BrandScreensRoute/> : status === 'editor' ? <EditorScreensRoute/> : <GuestScreensRoute/>}
    </NavigationContainer>
  );
};

export default AppNavigatior;
