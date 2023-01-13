import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import { CARTSCREEN, CHECKOUTSCREEN, ORDERSTATUSSCREEN, ORDRSTATUSSCREEN, PAYMENTSCREEN, PLACEORDERSCREEN, SHIPPINGSCREEN, WALLETSCREENPAY } from '../constants/Screens';
import { Cart, Category, Home, Product } from '../screens';
import Checkout from '../screens/Checkout';
import Shipping from '../screens/Shipping';
import Payment from '../screens/Payment';
import OrderStatus from '../screens/OrderStatus';
import PlaceOrder from '../screens/PlaceOrder';
import WalletPayment from '../screens/WalletPayment';

const CartTabStack = ({navigation}) => {

    const CartStack = createStackNavigator();

    return (
        <CartStack.Navigator
            headerShown={false}
        >
          <CartStack.Screen name={CARTSCREEN} component={Cart}  options={{headerShown: false  }} />
          <CartStack.Screen name={CHECKOUTSCREEN} component={Checkout}  options={{headerShown: false  }}  />
          <CartStack.Screen name={PLACEORDERSCREEN} component={PlaceOrder}  options={{headerShown: false  }}  />
          <CartStack.Screen name={WALLETSCREENPAY} component={WalletPayment}  options={{headerShown: false  }}  />
            {/* <CartStack.Screen name={SHIPPINGSCREEN} component={Shipping}  options={{headerShown: false  }}  />
            <CartStack.Screen name={PAYMENTSCREEN} component={Payment}  options={{headerShown: false  }}  />
            <CartStack.Screen name={ORDRSTATUSSCREEN} component={OrderStatus}  options={{headerShown: false  }}  />   */}
            
        </CartStack.Navigator>
    )
}

export default CartTabStack

const styles = StyleSheet.create({})
