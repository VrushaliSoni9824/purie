import React from "react";
import { createStackNavigator } from '@react-navigation/stack';
import {Splash, Login, Signup,SignupOTPVerify, ForgotPassword, Home, Cart, } from '../screens';
import DrawerNavigation from './DrawerNavigation'
import { PureNativeButton } from "react-native-gesture-handler/lib/typescript/components/GestureButtons";
import ResetPassword from '../screens/ResetPassword'
import ChangePassword from '../screens/ChangePassword'

const Stack = createStackNavigator();

export default navigation = () => {
    return(
    <Stack.Navigator
      headerShown={false}
    >
        
        <Stack.Screen name="Splash" component={Splash} options={{
                   
                    headerShown: false
                  }}/>
        <Stack.Screen name="Login" component={Login} options={{
                    headerShown: false
                  }}/>
        <Stack.Screen name="Signup" component={Signup} options={{
                    headerShown: false
                  }}/>
        <Stack.Screen name="SignupOTPVerify" component={SignupOTPVerify} options={{
                    headerShown: false
                  }}/>
          <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{
                    headerShown: false
                  }}/>
                   <Stack.Screen name="ChangePassword" component={ChangePassword} options={{
                    headerShown: false
                  }}/>
          <Stack.Screen name="ResetPassword" component={ResetPassword} options={{
            headerShown: false
          }} />
        <Stack.Screen name="MemberNav" component={DrawerNavigation}
                options={{
                    title: 'Purie',
                    headerShown: false
                  }}
        />
      
    </Stack.Navigator>
    )
}