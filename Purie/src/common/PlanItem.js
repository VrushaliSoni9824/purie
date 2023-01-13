import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { COLORS } from '../constants/Colors'
import { showOffer, showPrice, showValidity } from '../utils';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { TouchableOpacity } from 'react-native-gesture-handler';

const PlanItem = ({item, select,cost, price, selectPlan, duration, offer, setPlanName}) => {
    console.log('RENDERING',item,cost);

    var color = '#ccc';
    var active = false;

    if(parseInt(item.item.id) == parseInt(select))
    {
         color = '#087E8B';  
         active  = true; 
         selectPlan(item.item.id);
         duration(item.item.plan_validity);
         offer(item.item.plan_offer);
         console.log('CHOOSE',item.item.i);
         setPlanName(item.item.plan_name);
        // choosePlan();
    }

    console.log('OPT',item.item.id);
    console.log('SEL',select);

    const choosePlan = () => {
        selectPlan(item.item.id);
        duration(item.item.plan_validity);
        offer(item.item.plan_offer);
        console.log('CHOOSE',item.item.i);
        setPlanName(item.item.plan_name);
        
    }

    const calculateOffer = (n) => { 
        return n * item.item.plan_offer/ 100;
     }

    return (
        <>
        <View style={[styles.planItems,styles.row]}>
            <View style={styles.col_5}>
            <TouchableOpacity onPress={choosePlan} >
            <Icon name="check-square" color={color} size={14} /> 
            </TouchableOpacity>
            </View>
            <View style={[styles.col,{alignItems:'flex-start'}]}>
            <TouchableOpacity onPress={choosePlan} >
            <Text style={styles.planTitle}>{item.item.plan_name}</Text>
            </TouchableOpacity>
            </View>
           
             <View style={[styles.col,{alignItems: 'center', }]}>
                {item.item.plan_offer != 0 && <Text style={{color: 'black'}} >{showPrice(calculateOffer(cost))} Off/day</Text>}
                    
            </View> 
           

            <View style={[styles.col,{flexDirection: 'row', justifyContent:'flex-end', alignItems: 'center'}]}>
            <Text style={styles.planTitle}>{showPrice(parseInt(cost) * parseInt(item.item.plan_validity) - (calculateOffer(cost) * parseInt(item.item.plan_validity) ))}</Text>
            {
                item.item.plan_offer != 0 && <><Text style={{color:'black',fontSize: 20}}>/</Text><Text style={{color: 'red', fontSize: 9, textDecorationLine: 'line-through', marginLeft: 5}}>{parseInt(cost) * parseInt(item.item.plan_validity)}</Text></>
            }
            </View>
                
        </View>
        {/* {
            (active) ? 
            <View style={styles.planMsg}>
                <Text>{item.item.plan_msg}</Text>
        </View>
            : <></>
        } */}
        

        
        </>
    )
}

export default PlanItem

const styles = StyleSheet.create({
    planMsg: {
        backgroundColor: '#f5f5f5',
        marginBottom: 5,
        paddingVertical: 10,
        paddingHorizontal: 15,
        marginHorizontal: 10,
        borderTopColor: '#e5e5e5',
        borderTopWidth: 1,
       
    },
    col_5:{
        flex: 0.25,
    },
    planItems: {
        backgroundColor: '#fff',
        marginTop: 5,
        paddingVertical: 10,
        paddingHorizontal: 15,
        marginHorizontal: 10,
        
    },
    planTitle: {
        fontWeight: "bold",
        color: COLORS.PRIMARY
    },
    row: {
        flexDirection: 'row'
    },
    col: {
        flex: 1,
        alignItems: 'center'
    },
    col2: {
        flex: 2
    }
})
