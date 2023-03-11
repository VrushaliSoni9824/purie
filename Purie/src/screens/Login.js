import React, {useState,useEffect} from 'react';
import { Dimensions, StatusBar, StyleSheet, Text, View, TextInput, ScrollView, KeyboardAvoidingView, ActivityIndicator, Keyboard, Touchable } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as Animatable  from 'react-native-animatable';
import { connect } from 'react-redux';
import { storeUser } from '../Store/user/actions';
import { COLORS } from '../constants/Colors';
import { FORGOTPASSWORDSCREEN, REGISTERSCREEN } from '../constants/Screens';
import { API_LINK, ASYNC_LOGIN_KEY, SMALL_LOGO_RATIO } from '../constants/Strings';
import { showMessage } from 'react-native-flash-message';
import { prepLoggedInUserData, storeAsyncData } from '../utils';
import { getLogoDimensions } from '../utils';
import messaging from "@react-native-firebase/messaging";
import SuccessError from '../screens/SuccessError';


const Login = ({navigation, reduxUser, reduxStoreUser}) => {

    console.log('RU',reduxUser);

    const [apiStatus, setApiStatus] = useState(false);
    
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [token, settoken] = useState('');

    const [phoneError, setPhoneError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);


    const [showAlert1, setshowAlert1] = useState(false);
    const [isError, setisError] = useState(false);
    const [alertTitle,setalertTitle] = useState("");
    const [alertSubTitle,setalertSubTitle] = useState("");

    const getFCMToken = async () => {
        try {
          const token1 = await messaging().getToken();
          console.log("*****************************");
          console.log("FCM token: "+token1);
          console.log("*****************************");
          settoken(token1)
        } catch (e) {
          console.log(error);
        }
      };

      useEffect(()=>{
        getFCMToken();
    
    },[]);
    const processLogin = () => {

        console.log("Hello")
        
        var valid = true;
        
        

        if(phone.trim() == '')
        {
            setPhoneError('Please enter phone number');
            valid = false;
        }
        // else if(phone.trim().length != 10)
        // {
        //     setPhoneError('Phone ltesength should be 10 characters');
        //     valid = false;
        // }
        else{
            setPhoneError(false);
        }

        if(password.trim() == '')
        {
            setPasswordError('Please enter password');
            valid = false;
        }
        else{
            setPasswordError(false);
        }

       // valid = false;

        if(valid)
        {
            setApiStatus(true);
            Keyboard.dismiss();
            console.log(API_LINK+'login');
            fetch(API_LINK+'login',{
                method : 'POST',
                headers : {
                    'Accept': 'application/json',
                    'Content-type': 'application/json',
                    mode: 'cors'
                },
                body: JSON.stringify({
                    phone : phone,
                    password: password,
                   token: token
                    
                     })
                 })
                .then((response) => response.json())
                .then((responseData) => {
                   
                    console.log('LOGIN RESPONSE:',responseData);
                  
                   
                  if(responseData.status == 'Success')
                  {
                    setPhone('');
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
                      

                      const loggedInUser = prepLoggedInUserData(responseData.user);
                      reduxStoreUser(loggedInUser);
                      storeAsyncData(ASYNC_LOGIN_KEY,loggedInUser);
                    /*  
                      const loggedInUser = ({
                       
                          name: responseData.user.fld_name,
                          userId: responseData.user.fld_id,
                          mobile: responseData.user.fld_number,
                          email: responseData.user.fld_email,
                          userType: responseData.user.fld_user_type,
                          address: responseData.user.fld_address,
                          restaurantName: responseData.user.fld_restaurant_name,
                          restaurantAddress : responseData.user.fld_restaurant_address
                          
                          
                          
                      });
                      //storeUser(loggedInUser);
                    //  console.log('Logged IN USER :::::::::::::::'+JSON.stringify(loggedInUser));
                      storeUser(loggedInUser);
                      */
                    
                   }
                  else
                  {
                    // showMessage({
                    //     message: "Error",
                    //     description: responseData.message,
                    //     type: "default",
                    //     backgroundColor: 'red'
                    //   });
                    setalertTitle(responseData.message);
                    setalertSubTitle(" ");
                    setisError(true);
                    setshowAlert1(true);
                     
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

        // 



    }
    

    const goToRegister = () => {
        navigation.navigate(REGISTERSCREEN);

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
                <Text style={styles.title}>Login To Purie.</Text>
                <Text style={styles.subtitle}>Get start to access the products.</Text>

                <View style={styles.form}> 
                    <Text style={styles.phone}>Phone Number</Text>
                    <TextInput placeholder="Your Phone Number..." style={styles.input} keyboardType = 'numeric' value={phone} onChangeText={text => setPhone(text)}  />
                    {(phoneError) ? <View><Text style={styles.error}>{phoneError}</Text></View>: <></>}
                    <Text style={styles.phone}>Password</Text>
                    <TextInput placeholder="Your Password" style={styles.input} keyboardType = 'default' value={password} onChangeText={text => setPassword(text)} secureTextEntry={true} />
                    {(passwordError) ? <View><Text style={styles.error}>{passwordError}</Text></View>: <></>}
                </View>
                


                <View >
                    {
                        (!apiStatus)
                        ?
                        <TouchableOpacity style={styles.getstart} onPress={processLogin}>
                        <Text style={styles.getstartText}>Login</Text>
                        </TouchableOpacity>
                        :
                        <TouchableOpacity style={styles.getstart}>
                        <ActivityIndicator size={20} color={COLORS.INDICATORCOLOR} style={styles.indicatorStyle}  />
                        </TouchableOpacity>
                    }
                    
                </View>


                    <View style={[styles.row, styles.sectionHeight]}>
                        <View style={[styles.col, styles.ac]}>
                                
                                <TouchableOpacity onPress={goToRegister}>
                                    <Text style={styles.link}>Register Now</Text>
                                </TouchableOpacity>
                        </View> 

                        <View style={[styles.col, styles.ac]}>
                            <TouchableOpacity onPress={goToForgotPassword}>
                                    <Text style={styles.link}>Forgot Password?</Text>
                                </TouchableOpacity>
                        </View>
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
        backgroundColor: '#fff',
        
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

export default connect(mapStateToProps,mapDispatchToProps)(Login);
