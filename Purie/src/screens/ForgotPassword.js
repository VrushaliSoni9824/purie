import React, {useState} from 'react';
import { Dimensions, StatusBar, StyleSheet, Text, View, TextInput, ScrollView, KeyboardAvoidingView, ActivityIndicator, Keyboard, Modal, TouchableOpacity } from 'react-native'

import * as Animatable  from 'react-native-animatable';
import { connect } from 'react-redux';
import { storeUser } from '../Store/user/actions';
import { COLORS } from '../constants/Colors';
import { FORGOTPASSWORDSCREEN, LOGINSCREEN, REGISTERSCREEN, RESETPASSWORD } from '../constants/Screens';
import { API_LINK, ASYNC_LOGIN_KEY, SMALL_LOGO_RATIO } from '../constants/Strings';
import { showMessage } from 'react-native-flash-message';
import { prepLoggedInUserData, storeAsyncData } from '../utils';
import { getLogoDimensions } from '../utils';


const ForgotPassword = ({navigation, reduxUser, reduxStoreUser}) => {

    console.log('RU',reduxUser);

    const [apiStatus, setApiStatus] = useState(false);
    
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');

    const [phoneError, setPhoneError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

    const [showModal, setShowModal] = useState(false);
    const [modalText, setModalText] = useState('OTP send on your email id. Please check your mailbox.');
    const [otp, setOtp] = useState('');
    const [otpError, setOtpError] = useState(false);


    const processLogin = () => {

        var valid = true;
        
        setApiStatus(true);

        if(phone.trim() == '')
        {
            setPhoneError('Please enter valid email id');
            valid = false;
        }
        // else if(phone.trim().length != 10)
        // {
        //     setPhoneError('Phone length should be 10 characters');
        //     valid = false;
        // }
        else{
            setPhoneError(false);
        }

        

        if(valid)
        {

            Keyboard.dismiss();
            console.log(API_LINK+'forget')
            fetch(API_LINK+'forget',{
                method : 'POST',
                headers : {
                    'Accept': 'application/json',
                    'Content-type': 'application/json',
                    mode: 'cors'
                },
                body: JSON.stringify({
                    user : phone,
                     })
                 })
                .then((response) => response.json())
                .then((responseData) => {
                   
                    console.log("*************************");
                    console.log('FORGOT PASSWORD RESPONSE:',responseData);
                  
                   
                  if(responseData.status == 'Success')
                  {
                    //setPhone('');
                    

                   /* showMessage({
                        message: "Success",
                        description: responseData.message,
                        type: "success",
                      });
                      */
                      setModalText(responseData.message)
                      setShowModal(true);

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
                    console.log("*************************");
                            console.warn('There has been a problem with your fetch operation: ' + error);
                             // ADD THIS THROW error
                             setApiStatus(false);
                              throw error;
                            
                            })
                    ;
            
          
        }

        setApiStatus(false);



    }

    const goToLogin = () => {
        navigation.navigate(LOGINSCREEN);

    }

    const goToForgotPassword = () => {
        navigation.navigate(FORGOTPASSWORDSCREEN);
    }

    const processOtpVerify = () => {
        console.log('otp verification started');
        Keyboard.dismiss();

        const formBody = {
            email: phone,
            otp: otp
             
        };

        console.log('FormBody',formBody);

            fetch(API_LINK+'otpverify',{
                method : 'POST',
                headers : {
                    'Accept': 'application/json',
                    'Content-type': 'application/json',
                    mode: 'cors'
                },
                body: JSON.stringify(formBody)
                 })
                .then((response) => response.json())
                .then((responseData) => {
                   
                    console.log('OTP VERIFY RESPONSE:',responseData);
                  
                   
                  if(responseData.status == 'Success')
                  {
                   
                   showMessage({
                        message: "Success",
                        description: responseData.message,
                        type: "success",
                      });
                    
                      navigation.navigate(RESETPASSWORD,{email:phone});
                    
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
            
          
                    // setApiStatus(false);
        }


    

    return (
        <>
        <View style={styles.page}>
        <ScrollView >
            <KeyboardAvoidingView>
        <View style={[styles.container, styles.headerSpace]}>
            <StatusBar barStyle="dark-content"/>
            <View style={styles.header}>
                <Animatable.Image animation="bounceIn" duration={1550} source={require('../assets/logo.png')} style={styles.logo} resizeMode={"stretch"}/>
            </View>

            <Animatable.View style={styles.footer} animation="fadeInUpBig" > 
                <Text style={styles.title}>Forgot Password</Text>
                <Text style={styles.subtitle}>Recover your password</Text>

                <View style={styles.form}> 
                    
                    <TextInput placeholder="Enter Your Email ID..." style={styles.input} keyboardType = "email-address" value={phone} onChangeText={text => setPhone(text)}  />
                    {(phoneError) ? <View><Text style={styles.error}>{phoneError}</Text></View>: <></>}
                    
                </View>
                


                <View style={styles.getstart}>
                    {
                        (!apiStatus)
                        ?
                        <TouchableOpacity onPress={processLogin}>
                        <Text style={styles.getstartText}>Forgot Password</Text>
                    </TouchableOpacity>
                        :                        
                        <ActivityIndicator size={20} color={COLORS.INDICATORCOLOR} style={styles.indicatorStyle}  />
                    }
                    
                </View>


                    <View style={[styles.row, styles.sectionHeight]}>
                        {
                        /* <View style={[styles.col, styles.ac]}>
                                
                                <TouchableOpacity onPress={goToRegister}>
                                    <Text style={styles.link}>Register Now</Text>
                                </TouchableOpacity>
                        </View>  */
                        }

                        <View style={[styles.col, styles.ac]}>
                            <TouchableOpacity onPress={goToLogin}>
                                <Text style={styles.link}>Go to Login</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                
            </Animatable.View>

        </View>
        </KeyboardAvoidingView>
        </ScrollView>
        </View>

        <Modal visible={showModal} style={styles.modal} animationType="slide" transparent={true}>
                     <View style={styles.modalBody}>

                        <Text style={styles.title}>OTP Verification</Text>
                        <Text style={styles.bodyText}>{modalText}</Text>

                        <View style={{width: '100%', paddingHorizontal: 30, paddingVertical: 50}}> 
                        
                        <TextInput placeholder="OTP" style={styles.input} keyboardType = "numeric" value={otp} onChangeText={text => setOtp(text)}  />
                        {(phoneError) ? <View><Text style={styles.error}>{otpError}</Text></View>: <></>}

                           
                        <TouchableOpacity onPress={processOtpVerify}>
                        <View style={styles.getstart}> 
                            <Text style={styles.getstartText}>Verify</Text>
                        </View>
                        </TouchableOpacity>
                        

                        </View>
                     </View>
        </Modal>

           
        </>
    )
}
 

const LogoDimension = getLogoDimensions(SMALL_LOGO_RATIO);

const styles = StyleSheet.create({
    bodyText: {
        marginTop: 20
    },
    heading: {

    },
    modalBody: {
        backgroundColor: '#f5f5f5',
        flex: 1,
        height: '66%',
        position:'absolute',
        bottom: 0,
        width: '100%',
        alignItems: 'center',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingTop: 30
    },
    modal: {
        height: '100%',
       
        backgroundColor: '#000000aa'
       
    },
    link: {
        fontWeight: 'bold',
        color:'#2f746f'
     },
    sectionHeight: {
        marginTop: '10%'
    },
    ac:{
        alignItems: 'center'
    },
    ar: {
        alignItems: 'flex-end'
    },
    col: {
        flex: 1
    },
    row: {
        flexDirection: 'row'
    },
    error: {
        color: '#f00',
        top: -20,
        marginLeft: 15
    },
    page: {
        flex:1,
        backgroundColor: '#fff'
    },
    headerSpace:{
    
        paddingTop: 60
    },
    container:{
        flex:1,
        backgroundColor:'#fff',
        height: '100%'
    },
    header:{
        flex:4,
        justifyContent:'center',
        alignItems:'center'
    },
    footer:{
        flex:4.5,
        backgroundColor:'#fff',
        borderTopLeftRadius:50,
        borderTopRightRadius:50,
        paddingVertical:30,
        paddingHorizontal:50,
    },
    logo:{
        width:LogoDimension.LogoWidth,
        height:LogoDimension.LogoHeight,
    },
    title:{
        color:'#2f746f',
        fontSize:30,
        fontWeight:'bold',
        textAlign:'center',
        
    },
    subtitle:{
        paddingVertical:10,
        textAlign:'center',
        fontSize:17,
        color:'#2f746f'
    },
    form:{
        paddingVertical:20,
    },
    phone:{
        
        fontWeight:'600',
        color:'#2f746f',

    },
    input:{
        height: 50, 
        width: '100%', 
        borderColor: '#2f746f', 
        borderWidth: .5,  
        marginBottom: 20,
        paddingLeft:10,
        borderRadius:20,
        color:'#2f746f',
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
    indicatorStyle: {
       
        paddingVertical:13,
           }
    
})

const mapStateToProps = state => {
    return {
        reduxUser : state.user
    };
}

const mapDispatchToProps = dispatch => {
    return {
        reduxStoreUser : loggedinUser => dispatch(storeUser(loggedinUser))
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(ForgotPassword);
