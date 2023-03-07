import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import { CATEGORYSCREEN, DASHBAORD, HOMESCREEN, ORDERSTATUSSCREEN, PRIVACYPOLICY, PRODUCTSCREEN, REFUNDPOLICY, Report1, REVIEWORDERSCREEN, SHIPPINGPOLICY, SUBSCRIPTIONSSCREEN, TERMCNDITION, WALLETSCREEN } from '../constants/Screens';
import { Category, Home, Product } from '../screens';
import Subscribe from '../screens/Subscribe';
import ReviewOrder from '../screens/ReviewOrder';
import OrderStatus from '../screens/OrderStatus';
import TermCondition from '../screens/TermCondition';
import PrivacyPolicy from '../screens/PrivacyPolicy';
import RefundPolicy from '../screens/RefundPolicy';
import ShippingPolicy from '../screens/ShippingPolicy';
import Report from '../screens/Report';
import Wallet from '../screens/Wallet';
import ChangePassword from '../screens/ChangePassword'

const HomeTabStack = ({navigation}) => {

    const HomeStack = createStackNavigator();

    return (
        <HomeStack.Navigator
            headerShown={false}
        >
            <HomeStack.Screen name={HOMESCREEN} component={Home}  options={{headerShown: false  }} />
            <HomeStack.Screen name={CATEGORYSCREEN} component={Category}  options={{headerShown: false  }}  />
            <HomeStack.Screen name={PRODUCTSCREEN} component={Product}  options={{headerShown: false  }}  />
            <HomeStack.Screen name={SUBSCRIPTIONSSCREEN} component={Subscribe}  options={{headerShown: false  }}  />
            <HomeStack.Screen name={REVIEWORDERSCREEN} component={ReviewOrder}  options={{headerShown: false  }}  />
            <HomeStack.Screen name={ORDERSTATUSSCREEN} component={OrderStatus}  options={{headerShown: false  }}  />
            <HomeStack.Screen name={TERMCNDITION} component={TermCondition}  options={{headerShown: false  }}  />
            <HomeStack.Screen name={PRIVACYPOLICY} component={PrivacyPolicy}  options={{headerShown: false  }}  />
            <HomeStack.Screen name={REFUNDPOLICY} component={RefundPolicy}  options={{headerShown: false  }}  />
            <HomeStack.Screen name={SHIPPINGPOLICY} component={ShippingPolicy}  options={{headerShown: false  }}  />
            <HomeStack.Screen name={Report1} component={Report}  options={{headerShown: false  }}  />
            
           
        </HomeStack.Navigator>
    )
}

export default HomeTabStack

const styles = StyleSheet.create({})
