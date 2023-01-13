import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { DrawerNavigation, Navigation } from './src/navigation';
import { Drawer } from './src/navigation';
import { connect } from 'react-redux';
import FlashMessage from 'react-native-flash-message';
import { storeUser } from './src/Store/user/actions';
import { API_LINK } from './src/constants/Strings';
import { showMessage } from 'react-native-flash-message';


const App = ({reduxUser}) =>{
   return(
     <NavigationContainer>
       {
         (!reduxUser.isLoggedIn)
         ?
           <Navigation/>  
         :
          <DrawerNavigation />
       }
        
      <FlashMessage />
     </NavigationContainer>
     
   )
 }


const mapStateToProps = state => {
  return {
    reduxUser : state.user
  };
}

export default connect(mapStateToProps)(App);