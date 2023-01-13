import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, ActivityIndicator, Keyboard, KeyboardAvoidingView } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import MemberHeader from '../common/MemberHeader'
import * as Animatable  from 'react-native-animatable'
import Icon from 'react-native-vector-icons/Ionicons';
import { showMessage } from 'react-native-flash-message';
import { COLORS } from '../constants/Colors';
import { connect } from "react-redux";
import { API_LINK, ASYNC_LOGIN_KEY, SMALL_LOGO_RATIO } from '../constants/Strings';
import { SafeAreaView } from "react-native-safe-area-context";

const ChangePassword = ({ reduxUser }) => {
    // console.log('Mou', reduxUser)

    const [apiStatus, setApiStatus] = useState(false);
    
    const [oldpassword, setOldpassword] = useState('');
    const [password, setPassword] = useState('');

    const [oldpasswordError, setOldpasswordError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);


    const processLogin = () => {

        var valid = true;
        
        setApiStatus(true);

        if(oldpassword.trim() == '')
        {
            setOldpasswordError('Please enter your old password');
            valid = false;
        }
        
        else{
            setOldpasswordError(false);
        }

        if(password.trim() == '')
        {
            setPasswordError('Please enter new password');
            valid = false;
        }
        else{
            setPasswordError(false);
        }

        if(valid)
        {

            Keyboard.dismiss();
            fetch(API_LINK+'changepassword',{
                method : 'POST',
                headers : {
                    'Accept': 'application/json',
                    'Content-type': 'application/json',
                    mode: 'cors'
                },
                body: JSON.stringify({
                    phone: reduxUser.customer.phone,
                    oldpassword : oldpassword,
                    newpassword: password
                    
                     })
                 })
                .then((response) => response.json())
                .then((responseData) => {
                   
                    console.log('LOGIN RESPONSE:',responseData);
                  
                   
                  if(responseData.status == 'Success')
                  {
                    setOldpassword('');
                    setPassword('');

                    showMessage({
                        message: "Success",
                        description: responseData.message,
                        type: "success",
                      });

                      
                    
                   }
                  else
                  {
                    showMessage({
                        message: "Error",
                        description: responseData.message,
                        type: "default",
                        backgroundColor: 'red'
                      });
                    //Alert.alert('Error',responseData.message);
                  }

                  setApiStatus(false);
                 })
                .catch(function(error) {
                            console.warn('There has been a problem with your fetch operation: ' + error);
                             // ADD THIS THROW error
                             setApiStatus(false);
                              throw error;
                            
                            })
                    ;
           
        }

        setApiStatus(false);



    }


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
        <ScrollView showsVerticalScrollIndicator={false}>
        <View > 
        <MemberHeader title="Change Password"/>
            <View style={styles.container}>
            <View style={styles.header}>
                {/* <Image source={require('../assets/change-password.png')} style={styles.profile} resizeMode={"stretch"}/> */}
                <Text style={styles.profileName}>Change Your Password</Text>
            </View>
            <View style={styles.form}> 
                    <Text style={styles.phone}>Old Password</Text>
                    <TextInput placeholder="Old Password..." style={styles.input} keyboardType = 'default' value={oldpassword} onChangeText={text => setOldpassword(text)} secureTextEntry={true}  />
                    {(oldpasswordError) ? <View><Text style={styles.error}>{oldpasswordError}</Text></View>: <></>}


                    <Text style={styles.phone}>New Password</Text>
                    <TextInput placeholder="Your Password" style={styles.input} keyboardType = 'default' value={password} onChangeText={text => setPassword(text)} secureTextEntry={true} />
                    {(passwordError) ? <View><Text style={styles.error}>{passwordError}</Text></View>: <></>}
                    
                </View>

                
                    {
                        (!apiStatus)
                        ?
                        <TouchableOpacity onPress={processLogin}>
                        <View style={styles.getstart}>
                        
                        <Text style={styles.getstartText}>Change Password</Text>
                    
                    </View>
                    </TouchableOpacity>
                        :
                        <View style={styles.getstart}>
                        <ActivityIndicator size={20} color={COLORS.INDICATORCOLOR} style={styles.indicatorStyle}  />
                        </View>
                    }
                    
                

            
            </View>
                    

                
        </View>
        </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    error:{
        color:'red',
        paddingBottom:10,
    },

    getstart:{
        alignItems:'center',
        backgroundColor:'#2f746f',
        marginLeft:40,
        marginRight:40,
        borderRadius:50,
        
    },
    getstartText:{
        color:'white',
        paddingVertical:13,
        fontSize:16,
        fontWeight:'600',
    },
    container:{
        padding:20,
    },
    
    profileName:{
        paddingVertical:10,
        fontSize:25,
        color:'#2f746f',
        fontWeight:'600'
    },
    profile:{
        width:200,
        height:200,
    },
    header:{
        paddingTop:40,
        justifyContent:'center',
        alignItems:'center'
    },

    form:{
        paddingVertical:20,
    },
    phone:{
        paddingTop:10,
        fontWeight:'600',
        color:'#2f746f',

    },
    input:{
        height: 50, 
        width: "100%", 
        borderColor: '#2f746f', 
        borderWidth: .5,  
        marginTop: 5,
        paddingLeft:10,
        borderRadius:20,
        color:'#2f746f',
    },
    indicatorStyle: {
       
        paddingVertical:13,
           }
    ,
    
})


const mapStateToProps = (state) => {
    return {
        reduxUser : state.user
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        reduxSaveTxn : txnId => dispatch(saveTxn(txnId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);