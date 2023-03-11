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
import { LOGINSCREEN } from '../constants/Screens';

import SuccessError from '../screens/SuccessError';

const ResetPassword = ({ navigation, route }) => {
    // console.log('Mou', reduxUser)

    
    const [showAlert1, setshowAlert1] = useState(false);
    const [isError, setisError] = useState(false);
    const [alertTitle,setalertTitle] = useState("");    
    const [alertSubTitle,setalertSubTitle] = useState("");

    const {email} = route.params;

    const [apiStatus, setApiStatus] = useState(false);
    
    
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
  
    const [passwordError, setPasswordError] = useState(false);
    const [confirmPasswordError, setConfirmPasswordError] = useState(false);


    const processLogin = () => {

        var valid = true;        
        setApiStatus(true);


        if(password.trim() == '')
        {
            setPasswordError('Please enter new password');
            valid = false;
        }
        else{
            setPasswordError(false);
        }

        if(confirmPassword.trim() == '')
        {
            valid = false;
            setConfirmPasswordError('Please re-enter password');
        }
        else if(confirmPassword.trim() != password.trim()){
            valid = false;
            setConfirmPasswordError('Both passwords don\'t match');
        }
        else
        {
            setConfirmPasswordError(false);
        }

        if(valid)
        {

            Keyboard.dismiss();
            fetch(API_LINK+'resetpassword',{
                method : 'POST',
                headers : {
                    'Accept': 'application/json',
                    'Content-type': 'application/json',
                    mode: 'cors'
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                    
                     })
                 })
                .then((response) => response.json())
                .then((responseData) => {
                   
                    console.log('LOGIN RESPONSE:',responseData);
                  
                   
                  if(responseData.status == 'Success')
                  {
                    setPassword('');
                    setConfirmPassword('');

                    // showMessage({
                    //     message: "Success",
                    //     description: responseData.message,
                    //     type: "success",
                    //   });
                    setalertTitle(responseData.message);
                setalertSubTitle(" ");
                setisError(false);
                setshowAlert1(true);

                    navigation.navigate(LOGINSCREEN);  
                    
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
           
        }

        // setApiStatus(false);



    }


    return (
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
                <Text style={styles.profileName}>Create New Password</Text>
            </View>
            <View style={styles.form}> 
            <Text style={styles.phone}>Reset For</Text>
                    <TextInput placeholder="Old Password..." style={styles.input} keyboardType = 'default' value={email} onChangeText={text => setOldpassword(text)} editable={false}  />
                    
                    <Text style={styles.phone}>New Password</Text>
                    <TextInput placeholder="New Password" style={styles.input} keyboardType = 'default' value={password} onChangeText={text => setPassword(text)} secureTextEntry={true}  />
                    {(passwordError) ? <View><Text style={styles.error}>{passwordError}</Text></View>: <></>}


                    <Text style={styles.phone}>Confirm Password</Text>
                    <TextInput placeholder="Confirm Password" style={styles.input} keyboardType = 'default' value={confirmPassword} onChangeText={text => setConfirmPassword(text)} secureTextEntry={true} />
                    {(confirmPasswordError) ? <View><Text style={styles.error}>{confirmPasswordError}</Text></View>: <></>}
                    
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

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword);