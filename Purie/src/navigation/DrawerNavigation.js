import React from "react";
import { createDrawerNavigator } from '@react-navigation/drawer';
import {Splash, Login, Signup,SignupOTPVerify, Cart, Product, Home, Category} from '../screens';
import { StyleSheet, Text, View, Image, ScrollView, Title, Caption, Linking } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
    DrawerContentScrollView,
    DrawerItem,
    DrawerItemList,
    Drawer

  } from '@react-navigation/drawer';
  import { useDispatch } from "react-redux";
 
import Bottom from './Bottom';
import { connect } from "react-redux";
import { logout } from "../Store/user/actions";
import Logout from "../screens/Logout";
import { LOGOUTSCREEN, PRIVACYPOLICY, REFUNDPOLICY, Report, SHIPPINGPOLICY, TERMCNDITION, ORDERHISTORYSCREEN, MYSUBSCRIPTIONSCREEN, PROFILESCREEN, HOMETABSTACK, HOMESCREEN, Report1 } from "../constants/Screens";
import COLORS from "../constants/Colors";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { clearAsyncStorage, clearAsyncData } from "../utils";
import { ASYNC_LOGIN_KEY } from "../constants/Strings";
import { SafeAreaView } from "react-native-safe-area-context";
const CustomDrawerContent = (props) => {
  const dispatch = useDispatch();
   
  const actionLogout = async() => {
    //reduxLogout();
    dispatch(logout());
    await clearAsyncData(ASYNC_LOGIN_KEY);
   // await rdLogout();
      }    
 

  console.log('DW',props);


 const connectToSupport = () => {
   Linking.openURL('whatsapp://send?text=Hello Purie&phone=919891246728')
 }
 
   return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
     <View>

<View style={{ paddingHorizontal: 20, paddingTop: 30 }}>
             <View style={styles.row}>
               <View style={{width: '30%'}}>
                  <Image style={styles.displayImage} source={require('../assets/no-image.png')} />
               </View>
               <View styles={{ width: '70%', marginLeft: 20,  }}>
                   <Text style={{ fontWeight: 'bold', color: '#087E8B', fontSize: 15 ,marginTop: 20}}>Hi {props.reduxUser.customer.name}</Text>
                 </View>
             </View>
            
           </View>
       <View style={{ borderTopWidth: 1, borderColor: '#e5e5e5', marginTop: 20, paddingTop: 20 }}></View>
           
        
     
     <DrawerItem label="Dashboard" onPress={() => props.navigation.navigate('HomeDrawer', {screen: HOMESCREEN})} 
     icon = {({color, size}) => (
       <Icon name="home" color={color} size={size} />
     )}/> 
      <DrawerItem label="My Account" onPress={() => props.navigation.navigate('PROFILE', {screen: PROFILESCREEN})} 
     icon = {({color, size}) => (
       <Icon name="account" color={color} size={size} />
     )}/> 
      {/* <DrawerItem label="My Orders" onPress={() => props.navigation.navigate('PROFILE', {screen: ORDERHISTORYSCREEN})} 
     icon = {({color, size}) => (
       <Icon name="playlist-check" color={color} size={size} />
     )}/>  */}
     <DrawerItem label="My Subscriptions" onPress={() => props.navigation.navigate('PROFILE', {screen: MYSUBSCRIPTIONSCREEN})} 
     icon = {({color, size}) => (
       <Icon name="calendar" color={color} size={size} />
     )}/> 
     <DrawerItem label="Terms and Conditons" onPress={(TermCondition) => props.navigation.navigate(TERMCNDITION)}
     icon = {({color, size}) => (
       <Icon name="note" color={color} size={size} />
     )} />
     <DrawerItem label="Refund Policy" onPress={(RefundPolicy) => props.navigation.navigate(REFUNDPOLICY)} 
     icon = {({color, size}) => (
       <Icon name="cash-refund" color={color} size={size} />
     )}/>
     <DrawerItem label="Privacy Policy" onPress={(PrivacyPolicy) => props.navigation.navigate(PRIVACYPOLICY)}
     icon = {({color, size}) => (
       <Icon name="shield-account" color={color} size={size} />
     )} />
     <DrawerItem label="Shipping Policy" onPress={(ShippingPolicy) => props.navigation.navigate(SHIPPINGPOLICY)} 
     icon = {({color, size}) => (
       <Icon name="truck" color={color} size={size} />
     )} />
     <DrawerItem label="Report" onPress={(Report) => props.navigation.navigate(Report1)} 
     icon = {({color, size}) => (
       <Icon name="calendar" color={color} size={size} />
     )} />

    {/* <DrawerItem label="Wallet" onPress={(Wallet) => props.navigation.navigate(WALLETSCREEN)} 
     icon = {({color, size}) => (
       <Icon name="truck" color={color} size={size} />
     )} /> */}

     <DrawerItem label="Support" onPress={connectToSupport} 
     icon = {({color, size}) => (
       <Icon name="whatsapp" color={color} size={size} />
     )} />


    <View style={{ borderTopWidth: 1, borderColor: '#e5e5e5', marginTop: 20, paddingTop: 20 }}></View>
     <DrawerItem label="Logout" onPress={actionLogout}
     icon = {({color, size}) => (
       <Icon name="exit-to-app" color={color} size={size} />
     )}  />
     

           
         </View>
         </SafeAreaView>
   );
 }


const DrawerNavigation = ({reduxUser, reduxLogout}) => {


 

  const Drawer = createDrawerNavigator();

  console.log('RDW',reduxUser);

    return(
      <Drawer.Navigator
      headerShown={false}
      drawerContent={(props) => <CustomDrawerContent {...props} reduxUser={reduxUser} />}
    >
           
             <Drawer.Screen name="HomeDrawer" component={Bottom}
              options={{
                headerShown: false
              }}
            /> 

<Drawer.Screen name={LOGOUTSCREEN} component={Logout}
              options={{
                headerShown: false
              }}
            /> 

              

            
            {/* <Drawer.Screen name="Product" component={Product}/>
            <Drawer.Screen name="Category" component={Category}/> */}
        </Drawer.Navigator>
    );
}

const mapStateToProps = state => {
  return {
      reduxUser : state.user
  };
}

const mapDispatchToProps = dispatch => {
  return {
    reduxLogout : () => dispatch(logout())
  };
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row'
  },
  displayImage: {
    width: 60,
    height: 60,
    borderRadius:50
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: '#f4f4f4',
    borderTopWidth: 1
},
});

export default connect(mapStateToProps)(DrawerNavigation);

