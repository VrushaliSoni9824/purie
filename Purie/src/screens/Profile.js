import React from 'react'
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import MemberHeader from '../common/MemberHeader'
import * as Animatable  from 'react-native-animatable'
import Icon from 'react-native-vector-icons/Ionicons';
import { ADDRESSSCREEN, CHANGEPASSWORDSCREEN, EDITPROFILESCREEN, LOGOUTSCREEN, MYSUBSCRIPTIONSCREEN, ORDERHISTORYSCREEN, WALLETSCREEN } from '../constants/Screens'
import { useSelector, useDispatch } from 'react-redux'
import { SafeAreaView } from "react-native-safe-area-context";
import { logout } from "../Store/user/actions";
import { clearAsyncStorage, clearAsyncData } from "../utils";
import { ASYNC_LOGIN_KEY } from '../constants/Strings'

const Profile = ({navigation}) => {
    const dispatch = useDispatch();
    const reduxuser = useSelector(state => state.user);

    const goToEditProfile = () => {

        navigation.navigate(EDITPROFILESCREEN);

    }


    const goToOrders = () => {
        navigation.navigate(MYSUBSCRIPTIONSCREEN);
    }
    
const goToAddress = () => {
    //navigation.navigate()
    navigation.navigate(ADDRESSSCREEN);
}


const goToSubscription = (params) => {
  //  navigation.navigate(SUS)
  navigation.navigate(WALLETSCREEN);
}

const goToChangePassword = () => {
    navigation.navigate(CHANGEPASSWORDSCREEN);
}

const actionLogout = async() => {
    //reduxLogout();    
    
    await clearAsyncData(ASYNC_LOGIN_KEY);
    dispatch(logout());
   
   // await rdLogout();
      }  



    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
        <ScrollView>
        <View> 
        <MemberHeader title="Profile"/>
            <View>
            <View style={styles.header}>
                <Image source={require('../assets/logo.png')} style={styles.profile} resizeMode={"stretch"}/>
                <Text style={styles.profileName}>Hello, {reduxuser.customer.name}</Text>

                <View style={styles.editProfile}>
                    <TouchableOpacity onPress={goToEditProfile}>
                        <Text style={styles.editProfile}><Icon name="create-outline" color="#fff" size={23} /> Edit Profile</Text>
                    </TouchableOpacity>
                    </View>

            </View>

            <View style={styles.profileList}>
                <View style={styles.List}>
                    <View style={styles.listView}>
                    <TouchableOpacity onPress={goToOrders}>
                    <Text style={styles.ListName}><Icon name="create-outline" color="#000" size={23} /> My Subscriptions</Text>
                    </TouchableOpacity>
                    </View>
                    <View style={styles.listView}>
                        <TouchableOpacity onPress={goToAddress}>
                    <Text style={styles.ListName}><Icon name="clipboard-outline" color="#000" size={23} /> My Address</Text>
                    </TouchableOpacity>
                    </View>
                    <View style={styles.listView}>
                        <TouchableOpacity onPress={goToSubscription}>
                    <Text style={styles.ListName}><Icon name="infinite-outline" color="#000" size={23} /> My Wallet</Text>
                    </TouchableOpacity>
                    </View>
                    <View style={styles.listView}>
                        <TouchableOpacity onPress={goToChangePassword}>
                    <Text style={styles.ListName}><Icon name="key-outline" color="#000" size={23} /> Change Password</Text>
                    </TouchableOpacity>
                    </View>
                    <View style={styles.listView}>
                        <TouchableOpacity onPress={actionLogout}>
                    <Text style={styles.ListName}><Icon name="log-out-outline" color="#000" size={23} /> Logout</Text>
                    </TouchableOpacity>
                    </View>
                </View>
                
                
                
                

            </View>
            </View>
                    

                
        </View>
        </ScrollView>
        </SafeAreaView>
    )
}

export default Profile

const styles = StyleSheet.create({
    ListName:{
        paddingLeft:10,
        paddingVertical:15,
        
        fontSize:15,
        // fontWeight:'bold',
        color: '#2f746f',
    },
    List:{
        backgroundColor:'#D5E6E5',
        
    },
    listView:{
        borderColor: '#2f746f', 
        borderBottomWidth:0.5,
    },
    profileList:{
        paddingTop:50,
    },
    editProfile:{
        backgroundColor:'#2f746f',
        color:'#fff',
        // padding:5,
        paddingVertical:2,
        paddingHorizontal:3,
        borderRadius:5
    },
    profileName:{
        paddingVertical:10,
        fontSize:17,
        color:'#2f746f',
        fontWeight:'bold'
    },
    profile:{
        width:100,
        height:100,
    },
    header:{
        paddingTop:40,
        justifyContent:'center',
        alignItems:'center'
    },
    
})
