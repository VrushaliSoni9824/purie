import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home, Cart } from '../screens';
import Icon from 'react-native-vector-icons/Ionicons';
import HomeTabStack from './HomeTabStack';
import ProfileTabStack from './ProfileTabStack';
import CartTabStack from './CartTabStack';
import { CARTTABSTACK, HOMESCREEN, HOMETABSTACK, MYSUBSCRIPTIONSCREEN, PROFILETABSTACK, REFERSCREEN } from '../constants/Screens';
import Refer from '../screens/Refer';
import { COLORS } from '../constants/Colors';
import {useSelector} from 'react-redux'
import Manage from './Manage';
import MySubscriptions from '../screens/MySubscriptions';

const Tab = createBottomTabNavigator();

export default Bottom = () => {

  const reduxUser = useSelector(state => state.user);
  const reduxCart = useSelector(state => state.cart);

  console.log(`RU`, reduxUser);
  
  var cartCount = reduxCart.cartCount;

    return (
        <Tab.Navigator 
        headerShown={false}
          screenOptions={{
            tabBarStyle: {
              paddingTop: 10,
              paddingBottom: 5,
              height: 60,
              overflow: 'hidden'
            }
          }}
        >
        <Tab.Screen name={HOMESCREEN} component={HomeTabStack} 
            options={{
              headerShown: false,
              tabBarLabel:'',
              tabBarIcon: ({focused}) => {
                return (
                (!focused) 
                ?
                <>
                <Icon name="home-outline" color="#087E8B" size={23} />
                <Text style={{fontSize: 12, color: '#087E8B',}}>Home</Text>
                </>
                :
                <>
                <Icon name="home" color="#087E8B" size={23} />
                <Text style={{fontWeight: 'bold', color: '#087E8B', fontSize: 12}}>Home</Text>
                </>
                );
              }
            }}
        />
        
        <Tab.Screen name="CARTTABSTACK" component={CartTabStack} options={{
              headerShown: false,
              tabBarLabel:'',
              tabBarIcon: ({focused}) => {
                return (
                (!focused) 
                ?
                <>
                <Icon name="cart-outline" color="#087E8B" size={23} />
                <View style={{'flexDirection': 'row'}}>
                <Text style={{fontSize: 12, color: '#087E8B'}}>Cart </Text>
                {(cartCount > 0) && 
                  <View style={{backgroundColor: '#087E', width: 18, height: 18, borderRadius: 15, alignItems: 'center', justifyContent: 'center'}}>
                  <Text style={{fontSize: 12,  color: 'white'   }}>{cartCount}</Text>
                  </View>
                }
                </View>
                </>
                :
                <>
                <Icon name="cart" color="#087E8B" size={23} />
                <View style={{'flexDirection': 'row'}}>
                <Text style={{fontSize: 12, color: '#087E8B', fontWeight: 'bold'}}>Cart </Text>
                {(cartCount > 0) && 
                  <View style={{backgroundColor: '#087E', width: 18, height: 18, borderRadius: 15, alignItems: 'center', justifyContent: 'center'}}>
                  <Text style={{fontSize: 12,  color: 'white'   }}>{cartCount}</Text>
                  </View>
                }
                </View>
                </>
                );
              }
            }}/>

            
        
        <Tab.Screen  name={MYSUBSCRIPTIONSCREEN} component={MySubscriptions} options={{
              headerShown: false,
              tabBarLabel:'',
              tabBarIcon: ({focused}) => {
                return (
                (!focused) 
                ?
                <>
                <Icon name="calendar-outline" color="#087E8B" size={23} />
                <Text style={{fontSize: 12, color: '#087E8B',}}>Manage</Text>
                </>
                :
                <>
                <Icon name="calendar" color="#087E8B" size={23} />
                <Text style={{fontWeight: 'bold', color: '#087E8B', fontSize: 12}}>Manage</Text>
                </>
                );
              }
            }}
             />
{/* 
            <Tab.Screen name="Refer" component={Refer} options={{
              headerShown: false,
              tabBarLabel:'',
              tabBarIcon: ({focused}) => {
                return (
                (!focused) 
                ?
                <>
                <Icon name="layers-outline" color="#087E8B" size={23} />
                <Text style={{fontSize: 12, color: '#087E8B',}}>Refer</Text>
                </>
                :
                <>
                <Icon name="layers" color="#087E8B" size={23} />
                <Text style={{fontWeight: 'bold', color: '#087E8B', fontSize: 12}}>Refer</Text>
                </>
                );
              }
            }}
             /> */}
        
        <Tab.Screen name="PROFILE" component={ProfileTabStack} options={{
              headerShown: false,
              tabBarLabel:'',
              tabBarIcon: ({focused}) => {
                return (
                (!focused) 
                ?
                <>
                <Icon name="person-outline" color="#087E8B" size={23} />
                <Text style={{fontSize: 12, color: '#087E8B',}}>Profile</Text>
                </>
                :
                <>
                <Icon name="person" color="#087E8B" size={23} />
                <Text style={{fontWeight: 'bold', color: '#087E8B', fontSize: 12}}>Profile</Text>
                </>
                );
              }
            }} />


        </Tab.Navigator>
    )
}



const styles = StyleSheet.create({})
