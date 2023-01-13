import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { logout } from '../Store/user/actions';
import { useDispatch } from 'react-redux';
import { connect} from 'react-redux';
import {clearAsyncStorage} from '../utils';
import { LOGINSCREEN } from '../constants/Screens';

const Logout = ({navigation, reduxUser, reduxLogout}) => {

   // const dispatch = useDispatch();
    clearAsyncStorage();
    
    const logoutAction  = () => {
        
      //  dispatch(logout());
      const user = {
          'user' : 'dummy'
      };
      reduxLogout(user);
    }

    logoutAction();
    //reduxLogout();
   // navigation.navigate(LOGINSCREEN);
    
    

    return (
        <View>
            <Text>I m out lgout screen</Text>
        </View>
    )
}

//export default Logout;

const mapStateToProps = state => {
    return {
        reduxUser : state.user
    };
}

const mapDispatchToProps = dispatch => {
    return {
        reduxLogout : (user) => dispatch(logout(user))
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(Logout);



const styles = StyleSheet.create({})
