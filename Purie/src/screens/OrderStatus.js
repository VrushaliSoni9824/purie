import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native'
import {connect} from 'react-redux';
import MemberHeader from '../common/MemberHeader';
import { COLORS } from '../constants/Colors';
import { API_LINK } from '../constants/Strings';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { HOMESCREEN } from '../constants/Screens';
import {useDispatch} from 'react-redux';
import { emptyCart } from '../Store/user/actions'; 
import { SafeAreaView } from "react-native-safe-area-context";



const OrderStatus = ({navigation, reduxUser}) => {

    console.log('OS > RD',reduxUser );

    const [isVerified, setIsVerified] = useState(false);
    const [status, setstatus] = useState(false);
    const dispatch = useDispatch();

    const updatePayment = () => {
        fetch(API_LINK+'payment_status',{
            method : 'POST',
            headers : {
                'Accept': 'application/json',
                'Content-type': 'application/json',
                mode: 'cors'
            },
            body: JSON.stringify({
              
                    payment_id: reduxUser.orderId,
                    payment_status : 1,
                    order_id: reduxUser.orderId

                
                 })
             })
            .then((response) => response.json())
            .then((responseData) => {
               
                console.log('payment status data',responseData);
                setIsVerified(true);
                setstatus(true);
                
               // setplans(responseData.subscribe_plan)

              
             })
            .catch(function(error) {
                        console.warn('There has been a problem with your fetch operation: ' + error);
                         // ADD THIS THROW error
                          throw error;
                        
                        });
     }

useEffect(() => {
    if(!isVerified)
    {
        updatePayment();
    }
}, []);

     updatePayment();

     const goToHome = () => {
        dispatch(emptyCart());
         navigation.navigate(HOMESCREEN);
     }

    return (
        <>
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
        {
            (!status) ?
            <View style={{ flex:1, justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator size={100} color={COLORS.PRIMARY} />
             </View>
            :
            <>
                <MemberHeader title="Order Success" />
                
                <View style={[styles.ac, styles.padTop]}>
                        <Icon name="truck-delivery" size={120} color={COLORS.PRIMARY} />
                     <Text style={styles.title}>Order Placed Successfully</Text>
                </View>
                <View style={styles.ac}>
                     <Text>Thank you for placing order with us. Your oder no is {reduxUser.orderId}</Text>
                </View>
                <View>
                     <TouchableOpacity onPress={goToHome}>
                     <Text style={styles.btn}>Go to Home</Text>
                     </TouchableOpacity>
                </View>

                
            </>
            
        }
       </SafeAreaView>
        </>
    )
}

//export default OrderStatus


const styles = StyleSheet.create({
    padTop: {
        marginTop: '15%'
    },
    ac: {
        alignItems: 'center',
        marginTop: '15%'
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: COLORS.PRIMARY
    },
    btn: {
        color: 'white',
        backgroundColor: COLORS.PRIMARY,
        width: '30%',
        alignItems: 'center', 
        paddingVertical: 15,
        textAlign: 'center',
        marginLeft: '35%',
        marginTop: '10%'

    }
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

export default connect(mapStateToProps, mapDispatchToProps)(OrderStatus);