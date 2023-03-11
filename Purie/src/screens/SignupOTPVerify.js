import React, {useState} from 'react';
import { Dimensions, StatusBar, StyleSheet, Text, View, TextInput, ScrollView, KeyboardAvoidingView, ActivityIndicator, Keyboard } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as Animatable  from 'react-native-animatable';
import { connect } from 'react-redux';
import { COLORS } from '../constants/Colors';
import { FORGOTPASSWORDSCREEN, LOGINSCREEN } from '../constants/Screens';
import { API_LINK, ASYNC_LOGIN_KEY, SMALL_LOGO_RATIO } from '../constants/Strings';
import { showMessage } from 'react-native-flash-message';
import { prepLoggedInUserData, storeAsyncData } from '../utils';
import { storeUser } from '../Store/user/actions';
import { getLogoDimensions } from '../utils';
import OTPInputView from '@twotalltotems/react-native-otp-input'

import SuccessError from '../screens/SuccessError';

const SignupOTPVerify = ({navigation,route,  reduxUser, reduxStoreUser}) => {

        
    const [showAlert1, setshowAlert1] = useState(false);
    const [isError, setisError] = useState(false);
    const [alertTitle,setalertTitle] = useState("");    
    const [alertSubTitle,setalertSubTitle] = useState("");

    const [apiStatus, setApiStatus] = useState(false);
    
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');

    const [name, setName] = useState('');
    const [nameError, setNameError] = useState(false);

    const [email, setEmail] = useState(''); 
    const [emailError, setemailError] = useState(false);   

    const [phoneError, setPhoneError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

    const [otp, setotp] = useState('');
    const [otpError, setotpError] = useState(false);


    const processSignup = () => {

        var valid = true;
        // setApiStatus(true);

        const loggedInUser = route.params.loggedInUser;
        console.log("ScreeenDetails:"+route.params.catName);
        console.log("===================");
        console.log(JSON.stringify(route.params.loggedInUser));
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
                    phone : loggedInUser.phone,
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
                    setPhone('');
                    setPassword('');
                    setName('');
                    setEmail('');

                    // showMessage({
                    //     message: "Success",
                    //     description: responseData.message,
                    //     type: "success",
                    //   });
                    setalertTitle(responseData.message);
                    setalertSubTitle(" ");
                    setisError(false);
                    setshowAlert1(true);
                     
                    //   const loggedInUser = prepLoggedInUserData(responseData.user);

                    
                      reduxStoreUser(loggedInUser);
                      storeAsyncData(ASYNC_LOGIN_KEY,loggedInUser);
                    
                    
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

        // setApiStatus(false);



    }

    const goToLogin = () => {
        navigation.navigate(LOGINSCREEN);

    }

    const goToForgotPassword = () => {
        navigation.navigate(FORGOTPASSWORDSCREEN);
    }




    return (
        <>
        <ScrollView style={{minHeight: '100%', backgroundColor: 'white'}} >
        <SuccessError
          isVisible={showAlert1}
          error={isError}
          title={alertTitle}
          deleteIconPress={() => {
            setshowAlert1(false)
          }}
        //   subTitle={alertSubTitle}
        />
         <View style={styles.page}>
            
                <KeyboardAvoidingView>

             
        <View style={[styles.container, styles.headerSpace]}>
            <StatusBar barStyle="dark-content"/>
            <View style={styles.header}>
                <Animatable.Image animation="bounceIn" duration={1550} source={require('../assets/logo.png')} style={styles.logo} resizeMode={"stretch"}/>
            </View>

            <Animatable.View style={styles.footer} animation="fadeInUpBig" > 
                <Text style={styles.title}>Mobile number varification.</Text>
                <Text style={styles.subtitle}>Varify your mobile number at Purie.</Text>

                <View style={styles.form}> 
                    
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
                    
                </View>
                


                <View style={styles.getstart}>
                    {
                        (!apiStatus)
                        ?
                        <TouchableOpacity onPress={processSignup}>
                        <Text style={styles.getstartText}>Verify otp</Text>
                    </TouchableOpacity>
                        :

                        <TouchableOpacity >
                            <ActivityIndicator size={20} color={COLORS.INDICATORCOLOR} style={styles.indicatorStyle}  />
                        </TouchableOpacity>
                    }
                    
                </View>


                    <View style={[styles.row, styles.sectionHeight]}>
                        {/* <View style={[styles.col, styles.ac]}>
                                
                                <TouchableOpacity onPress={goToLogin}>
                                    <Text style={styles.link}>Login</Text>
                                </TouchableOpacity>
                        </View> 

                        <View style={[styles.col, styles.ac]}>
                            <TouchableOpacity onPress={goToForgotPassword}>
                                    <Text style={styles.link}>Forgot Password?</Text>
                                </TouchableOpacity>
                        </View> */}
                    </View>

                
            </Animatable.View>

        </View>
        </KeyboardAvoidingView>
            </View>
            </ScrollView>
            </>
    )
}



const LogoDimension = getLogoDimensions(SMALL_LOGO_RATIO);



const styles = StyleSheet.create({
    indicatorStyle: {
       
        paddingVertical:13,
           }
    ,
    link: {
        fontWeight: 'bold',
        color:'#2f746f',
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
        flex:2,
        backgroundColor:'#fff',
    },
    header:{
        flex:3,
        justifyContent:'center',
        alignItems:'center'
    },
    footer:{
        flex:5,
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
        color:'#2f746f',
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
        width: "100%", 
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
        padding:16,
        fontSize:18,
        fontWeight:'600',
    },
    borderStyleBase: {
        width: 30,
        height: 45
      },
    
      borderStyleHighLighted: {
        borderColor: "#03DAC6",
      },
    
      underlineStyleBase: {
        width: 30,
        height: 45,
        borderWidth: 0,
        borderBottomWidth: 1,
      },
    
      underlineStyleHighLighted: {
        borderColor: "#03DAC6",
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

export default connect(mapStateToProps,mapDispatchToProps)(SignupOTPVerify);
