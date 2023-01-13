import AsyncStorage from "@react-native-async-storage/async-storage";
import { Dimensions } from "react-native";
import { API_LINK } from "../constants/Strings";
import {useSelector, useDispatch} from 'react-redux';

export function prepLoggedInUserData (user)
{
    console.log('UTIL',user);

    var loginData = {
        name: user.name,
        email: user.email,
        phone: user.phone,
        userId: user.id
    };
    
    return loginData;

}

export function showPrice (amt) {
    return '\u20B9 ' + amt;
}

export function showValidity (n)
{
    return n + ' days';
}

export function showOffer (n)
{
    return n + ' % Off';
}


export function myFloatParser(n)
{
    var temp = parseFloat(n).toFixed(2);
    return temp;
    
}

export const storeAsyncData = async(key,value) => {
    try{
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem(key, jsonValue);
        console.log('Data Stored');
    }
    catch (e)
    {
        console.log('Error Storing Async Data',e);
    }
}

export const getAsyncData = async (key) => {
    try {
        const jsonValue =  await AsyncStorage.getItem(key);
        return jsonValue;
    }
    catch (e) 
    {
        console.log('Error Reading VAlue');
    }
}

// export const clearAsyncStorage = async() => {
//     AsyncStorage.clear();
// }

export const getLogoDimensions = (n) => {
    const {height} = Dimensions.get("screen"); 
    const logoWidth = 1402;
    const logoHeight = 1251;
    const height_logo = height *0.6* parseFloat(n);
    const width_logo = parseInt(logoWidth) / parseInt(logoHeight) * parseInt(height_logo);

    return {
        LogoHeight: height_logo,
        LogoWidth: width_logo
    }
}


export const showDateFromTimeString = (d) => 
{
    //console.log('IP TYPE',typeof d);
    var dt = String(d).split('T');
    return dt[0];
}


export const showAddress = (address) => {
    var add = address.flat + ', ' + address.block + ', ' + address.society + ', ' + address.city + ', ' + address.state + ', ' + address.country + ', ' + address.zip + ', ' + address.landmark;
    return add;
}


export const addToCartStore = (item) => {

 const cart = useSelector(state => state.cart);
 console.log(`RED CART`, cart);


}



export const clearAsyncData = async (key) => {
    try {
      await AsyncStorage.removeItem(key)
    } catch(e) {
      // remove error
    }
  
    console.log('Done.')
  }
  
 /**
  * 
  * @param {String} str 
  * @returns 
  */
  export const showDate = (str) => 
  {
      const temp = JSON.stringify(str).split('T');
      const t = temp[0].split('"');
    return t[1];
     /*
      let temp = str.split('T');
      return temp[0];
      */
  }