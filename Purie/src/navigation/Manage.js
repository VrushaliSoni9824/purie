import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import { ORDERHISTORYSCREEN} from '../constants/Screens';
import { Cart, Category, Home, Product } from '../screens';
import Checkout from '../screens/Checkout';
import Shipping from '../screens/Shipping';
import Payment from '../screens/Payment';
import OrderStatus from '../screens/OrderStatus';
import PlaceOrder from '../screens/PlaceOrder';
import WalletPayment from '../screens/WalletPayment';
import OrderHistory from '../screens/OrderHistory';

const Manage = ({navigation}) => {

    const ManageStack = createStackNavigator();

    return (
        <ManageStack.Navigator
            headerShown={false}
        >
          <ManageStack.Screen name={ORDERHISTORYSCREEN} component={OrderHistory}  options={{headerShown: false  }} />
          {/* <ManageStack.Screen name={CHECKOUTSCREEN} component={Checkout}  options={{headerShown: false  }}  />
          <ManageStack.Screen name={PLACEORDERSCREEN} component={PlaceOrder}  options={{headerShown: false  }}  />
          <ManageStack.Screen name={WALLETSCREENPAY} component={WalletPayment}  options={{headerShown: false  }}  /> */}
            {/* <CartStack.Screen name={SHIPPINGSCREEN} component={Shipping}  options={{headerShown: false  }}  />
            <CartStack.Screen name={PAYMENTSCREEN} component={Payment}  options={{headerShown: false  }}  />
            <CartStack.Screen name={ORDRSTATUSSCREEN} component={OrderStatus}  options={{headerShown: false  }}  />   */}
            
        </ManageStack.Navigator>
    )
}

export default Manage

const styles = StyleSheet.create({})
