import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import MemberHeader from '../common/MemberHeader'
import { SafeAreaView } from "react-native-safe-area-context";
const Refer = () => {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white'}}>
        <View style={{backgroundColor: 'white'}}> 
        <MemberHeader title="Refer & Earn"/>
            <Image source={require('../assets/coming-soon.jpeg')} style={{width:'100%', height: '100%'}} resizeMode="contain" />
        </View>
        </SafeAreaView>
    )
} 

export default Refer

const styles = StyleSheet.create({})
