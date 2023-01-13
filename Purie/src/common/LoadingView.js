import React, {useState, useEffect} from "react";
import { StyleSheet, Text, View, Image, ScrollView, FlatList, ActivityIndicator, Modal, Pressable } from 'react-native'

 const LoadingView = ({navigation}) => { 
   
        return (
            <View style={styles.container}>
                <ActivityIndicator size="small" color="#FFD700"/>
            </View>
        );
    
}
const styles = StyleSheet.create({
    container: {
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        opacity: 0.7,
        backgroundColor: "black",
        justifyContent: "center",
        alignItems: "center",
    }
});

export default LoadingView;