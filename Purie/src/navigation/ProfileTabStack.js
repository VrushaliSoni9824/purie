import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import { ADDRESSSCREEN, BONUSSCREEN, CHANGEPASSWORDSCREEN, EDITPROFILESCREEN, MYSUBSCRIPTIONSCREEN, ORDERHISTORYSCREEN, PROFILESCREEN, SUBSCRIPTIONSSCREEN, WALLETSCREEN, WALLETSCREENPAY } from '../constants/Screens';
import Profile from '../screens/Profile';
import EditProfile from '../screens/EditProfile';
import ChangePassword from '../screens/ChangePassword';
import OrderHistory from '../screens/OrderHistory';
import Subscriptions from '../screens/Subscriptions';
import Bonus from '../screens/Bonus';
import Wallet from '../screens/Wallet';
import Address from '../screens/Address';
import WalletPayment from '../screens/WalletPayment';
import MySubscriptions from '../screens/MySubscriptions';


const ProfileTabStack = ({navigation}) => {

    const ProfileStack = createStackNavigator();

    return (
        <ProfileStack.Navigator
            headerShown={false}
        >
            <ProfileStack.Screen name={PROFILESCREEN} component={Profile}  options={{headerShown: false  }} />
            <ProfileStack.Screen name={EDITPROFILESCREEN} component={EditProfile}  options={{headerShown: false  }} />
            <ProfileStack.Screen name={CHANGEPASSWORDSCREEN} component={ChangePassword}  options={{headerShown: false  }} />
            <ProfileStack.Screen name={ORDERHISTORYSCREEN} component={OrderHistory}  options={{headerShown: false  }} />
            <ProfileStack.Screen name={SUBSCRIPTIONSSCREEN} component={Subscriptions}  options={{headerShown: false  }} />
            <ProfileStack.Screen name={MYSUBSCRIPTIONSCREEN} component={MySubscriptions}  options={{headerShown: false  }} />
            <ProfileStack.Screen name={BONUSSCREEN} component={Bonus}  options={{headerShown: false  }} />  
            <ProfileStack.Screen name={WALLETSCREEN} component={Wallet}  options={{headerShown: false  }}  />
            <ProfileStack.Screen name={ADDRESSSCREEN} component={Address}  options={{headerShown: false  }}  />
            <ProfileStack.Screen name={WALLETSCREENPAY} component={WalletPayment}  options={{headerShown: false  }}  />

          
        </ProfileStack.Navigator>
    )
}

export default ProfileTabStack;

const styles = StyleSheet.create({})
