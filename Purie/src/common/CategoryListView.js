import { NavigationContainer } from '@react-navigation/native';
import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image, ImageStore } from 'react-native'
import { CATEGORYSCREEN } from '../constants/Screens';
import { CAT_MEDIA_LINK, MEDIA_LINK } from '../constants/Strings';
import { useNavigation } from '@react-navigation/core';
import { API_LINK } from '../constants/Strings';

const CategoryListView = (item) => {

    console.log('Cat ', item);

    const navigation = useNavigation();

    const imagesource = CAT_MEDIA_LINK + item.item.item.image;
    console.log('CAT IMG',imagesource);

    const goToProductList = () => {
        navigation.navigate(CATEGORYSCREEN, {catName: item.item.item.category})
    }

    return (
        <View style={styles.category}>
        <TouchableOpacity onPress={goToProductList}>
            <View>
            <Image style={styles.catImg} source={{uri: imagesource}} />
            </View>
            </TouchableOpacity>
            <Text style={styles.catName}>{item.item.item.category}</Text>
        </View>
    )
}

export default CategoryListView;

const styles = StyleSheet.create({
    category: {
        flex:1,
        marginTop: 10,
        paddingVertical: 6,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 5,
        width: '100%',
        marginHorizontal: 2,
        marginBottom: 0
    

    },
    catImg: {
        width: 65,
        height: 65,
        borderRadius: 50,
        borderColor: "gray",
        borderWidth: 0.5

    },
    catName: {
        marginTop: 5,
        color: 'black',
        fontWeight: '300'
    },
    
})
