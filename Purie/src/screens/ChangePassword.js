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
import { getLogoDimensions } from '../utils';
import OTPInputView from '@twotalltotems/react-native-otp-input'
import { FORGOTPASSWORDSCREEN, LOGINSCREEN } from '../constants/Screens';
import AsyncStorage from '@react-native-async-storage/async-storage';

import SuccessError from '../screens/SuccessError';

const ChangePassword = ({ navigation,route, reduxUser, name }) => {
    console.log('==============================', reduxUser)
    console.log(name);
    const [apiStatus, setApiStatus] = useState(false);

    const [showAlert1, setshowAlert1] = useState(false);
    const [isError, setisError] = useState(false);
    const [alertTitle,setalertTitle] = useState("");    
    const [alertSubTitle,setalertSubTitle] = useState("");

    const [isVerified, setisVerified] = useState(false);
    
    const [newpassword, setNewpassword] = useState('');
    const [password, setPassword] = useState('');

    const [oldpasswordError, setOldpasswordError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

    const [otp, setotp] = useState('');
    const [otpError, setotpError] = useState(false);


    async function processLogin  () {

        var valid = true;
        var phone = await AsyncStorage.getItem("phone");
        
        setApiStatus(true);

        if(newpassword.trim() == '')
        {
            setOldpasswordError('Please enter your New password');
            valid = false;
        }
        
        else{
            setOldpasswordError(false);
        }

        if(password.trim() == '')
        {
            setPasswordError('Please enter Confirm password');
            valid = false;
        }
        else{
            setPasswordError(false);
        }

        if(password.trim() != newpassword.trim())
        {
            setPasswordError('Confirm password and new password must be same');
            valid = false;
        }
        else{
            setPasswordError(false);
        }



        if(valid)
        {

            Keyboard.dismiss();
            fetch(API_LINK+'changePasswordForget',{
                method : 'POST',
                headers : {
                    'Accept': 'application/json',
                    'Content-type': 'application/json',
                    mode: 'cors'
                },
                body: JSON.stringify({
                    phone: phone,
                    newpassword: password
                    
                     })
                 })
                .then((response) => response.json())
                .then((responseData) => {
                   
                    console.log('LOGIN RESPONSE:',responseData);
                  
                   
                  if(responseData.status == 'Success')
                  {
                    setNewpassword('');
                    setPassword('');

                    // showMessage({
                    //     message: "Success",
                    //     description: responseData.message,
                    //     type: "success",
                    //   });
                    setalertTitle(responseData.message);
                setalertSubTitle(" ");
                setisError(false);
                setshowAlert1(true);

                   }
                  else
                  {
                    // showMessage({
                    //     message: "Error",
                    //     description: responseData.message,
                    //     type: "default",
                    //     backgroundColor: 'red'
                    //   });
                    //Alert.alert('Error',responseData.message);
                    setalertTitle(responseData.message);
                    setalertSubTitle(" ");
                    setisError(true);
                    setshowAlert1(true);


                  }
                  navigation.navigate(LOGINSCREEN)
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

        // setApiStatus(false);



    }

     async function verifyOtp () {
        var valid = true;
        var phone = await AsyncStorage.getItem("phone");
        console.log("props.route.params.phone:"+route.params.loggedInUser);
        console.log("otp:"+otp);
        console.log("phone"+phone);
        console.log("===================");
        
        if(otp.trim() == '')
        {
            setotpError("Please enter otp");
            valid = false;
        }
        else
        {
            setotpError(false);
        }


        if(valid)
        {

            Keyboard.dismiss();
            fetch(API_LINK+'otpverify',{
                method : 'POST',
                headers : {
                    'Accept': 'application/json',
                    'Content-type': 'application/json',
                    mode: 'cors'
                },
                body: JSON.stringify({
                    phone : phone,
                    otp: otp 
                     })
                 })
                .then((response) => response.json())
                .then((responseData) => {
                    console.log("=================response========================");
                    console.log('Regsiter RESPONSE:',responseData);
                    console.log("===================");
                  if(responseData.status == 'Success')
                  {
                    setotp('');
                    setisVerified(true)

                    // showMessage({
                    //     message: "Success",
                    //     description: "your mobile number is verified!",
                    //     type: "success",
                    //   });
                    setalertTitle(responseData.message);
                    setalertSubTitle(" ");
                    setisError(false);
                    setshowAlert1(true);
                   }
                  else
                  {
                    // showMessage({
                    //     message: "Error",
                    //     description: responseData.message,
                    //     type: "default",
                    //     backgroundColor: 'red'
                    //   });
                    //Alert.alert('Error',responseData.message);

                    setalertTitle(responseData.message);
                    setalertSubTitle(" ");
                    setisError(true);
                    setshowAlert1(true);
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
            
            // api call

            /*
            const loggedinUser = {
                name: 'sudip',
                email: 'sudip@gmail.com',
                mobile: '1231232',
                userId: '1'
            };

            reduxStoreUser(loggedinUser);
            */
        }

    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
        <ScrollView showsVerticalScrollIndicator={false}>
        <SuccessError
          isVisible={showAlert1}
          error={isError}
          title={alertTitle}
          deleteIconPress={() => {
            setshowAlert1(false)
          }}
        //   subTitle={alertSubTitle}
        />
        <View > 
       
            <View style={styles.container}>
            <View style={styles.header}>
                {/* <Image source={require('../assets/change-password.png')} style={styles.profile} resizeMode={"stretch"}/> */}
                <Animatable.Image animation="bounceIn" duration={1550} source={require('../assets/logo.png')} style={styles.logo} resizeMode={"stretch"}/>

                
                

            <Text style={styles.profileName}>{isVerified ? "Change Your Password" : "Verify your mobile number"}</Text>
            </View>
            {!isVerified ? (
                    <OTPInputView
                code={otp} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
                onCodeChanged = {code => {
                    setotp(code);
                    console.log("Code:"+code)
                }}
                    style={{ width: 300, height: 80, alignSelf: 'center' }}
                    pinCount={4}
                    autoFocusOnLoad={false}
                    codeInputFieldStyle={styles.inputFeilds}
                    codeInputHighlightStyle={styles.inputFeildsFocus}
                    onCodeFilled = {(code) => {
                    }}
                />
                ) : (
                    <View style={styles.form}> 
                    <Text style={styles.phone}>New Password</Text>
                    <TextInput placeholder="New Password..." style={styles.input} keyboardType = 'default' value={newpassword} onChangeText={text => setNewpassword(text)} secureTextEntry={true}  />
                    {(oldpasswordError) ? <View><Text style={styles.error}>{oldpasswordError}</Text></View>: <></>}


                    <Text style={styles.phone}>Confirm Password</Text>
                    <TextInput placeholder="Confirm Password" style={styles.input} keyboardType = 'default' value={password} onChangeText={text => setPassword(text)} secureTextEntry={true} />
                    {(passwordError) ? <View><Text style={styles.error}>{passwordError}</Text></View>: <></>}
                    
                </View>
                )}
                
           

                
                    {
                        (!apiStatus)
                        ?
                        <TouchableOpacity onPress={()=>{
                            {isVerified?
                                processLogin()
                            :
                            verifyOtp()
                            }
                            // processLogin();
                            // verifyOtp();
                        }}>
                        <View style={styles.getstart}>
                        
                        <Text style={styles.getstartText}>{isVerified ? "Change Password" : "Verify mobile number"}</Text>
                    
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

const LogoDimension = getLogoDimensions(SMALL_LOGO_RATIO);
const styles = StyleSheet.create({
    logo:{
        width:LogoDimension.LogoWidth,
        height:LogoDimension.LogoHeight,
    },
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