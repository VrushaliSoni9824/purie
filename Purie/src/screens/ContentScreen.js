import React from 'react';
import { Dimensions, StatusBar, StyleSheet, Text, View, TextInput, Image } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as Animatable from 'react-native-animatable';
import { ScrollView } from 'react-native';


export default ContentScreen = ({ navigation, route }) => {

    const {page} = route.params;s

    return (
        <ScrollView>
        <Animatable.View style={styles.container} animation="fadeInUpBig">
            <StatusBar barStyle="dark-content" />
            
            <View style={styles.cart}>



                <View style={styles.cartdetail}>
                    <View style={styles.productimage}>
                        <Image style={styles.pro} source={require('../assets/product.jpeg')} />
                    </View>
                    <View style={styles.producttitle}>
                        <Text style={styles.protitle}>100% Pure Cow Milk</Text>
                        <Text style={styles.prosubtitle}>1 LTR</Text>
                    </View>
                    <View style={styles.cartbutton}>
                        <View style={styles.btn}>
                            <Text style={styles.plus}>+</Text>
                        </View>
                        <View style={styles.qty}>
                            <Text style={styles.quantity}>1</Text>
                        </View>
                        <View style={styles.btn}>
                            <Text style={styles.plus}>-</Text>
                        </View>

                    </View>
                </View>

                <View style={styles.cartdetail}>
                    <View style={styles.productimage}>
                        <Image style={styles.pro} source={require('../assets/product.jpeg')} />
                    </View>
                    <View style={styles.producttitle}>
                        <Text style={styles.protitle}>100% Pure Cow Milk</Text>
                        <Text style={styles.prosubtitle}>1 LTR</Text>
                    </View>
                    <View style={styles.cartbutton}>
                        <View style={styles.btn}>
                            <Text style={styles.plus}>+</Text>
                        </View>
                        <View style={styles.qty}>
                            <Text style={styles.quantity}>1</Text>
                        </View>
                        <View style={styles.btn}>
                            <Text style={styles.plus}>-</Text>
                        </View>

                    </View>
                </View>
                <View style={styles.cartdetail}>
                    <View style={styles.productimage}>
                        <Image style={styles.pro} source={require('../assets/product.jpeg')} />
                    </View>
                    <View style={styles.producttitle}>
                        <Text style={styles.protitle}>100% Pure Cow Milk</Text>
                        <Text style={styles.prosubtitle}>1 LTR</Text>
                    </View>
                    <View style={styles.cartbutton}>
                        <View style={styles.btn}>
                            <Text style={styles.plus}>+</Text>
                        </View>
                        <View style={styles.qty}>
                            <Text style={styles.quantity}>1</Text>
                        </View>
                        <View style={styles.btn}>
                            <Text style={styles.plus}>-</Text>
                        </View>

                    </View>
                </View>
                




            </View>
            <View style={styles.addressbar}>
                <View style={styles.addressSection}>
                    <View style={styles.headTitle}>
                        <Text style={styles.title}>Address</Text>
                    </View>
                </View>
            </View>


        </Animatable.View>
        </ScrollView>
    )
}


const { height } = Dimensions.get("screen");
const height_logo = height * 0.6 * 0.4;
const styles = StyleSheet.create({
    container: {
        flex: 1,
       
    },
    cart: {
        flex: 1,

        alignItems: 'center',

        padding: 10
    },
    cartdetail: {
        width: '100%',
        height: 100,

        backgroundColor: '#000',
        borderRadius: 20,
        flexDirection: 'row',
        marginBottom: 10,


    },
    pro: {
        width: '100%',
        height: 100,
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,
    },
    productimage: {
        width: '30%'
    },
    producttitle: {
        width: '55%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    protitle: {
        color: 'white',
        fontSize: 19,
        fontWeight: '600',
        padding: 1
    },
    prosubtitle: {
        color: 'white',
        fontSize: 17,
        fontWeight: '600',
    },
    cartbutton: {
        width: '15%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    btn: {
        height: 30,
        width: 30,
        backgroundColor: 'white',
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },
    plus: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 25

    },
    qty: {
        height: 20,
        width: 20,

        justifyContent: 'center',
        alignItems: 'center'
    },
    quantity: {
        color: 'white',
        fontWeight: 'bold'
    },


    addressbar:{
        backgroundColor:'#fff',
        margin:10,
        borderRadius:10

    },
    addressSection:{
        
        padding:10
    },
    headTitle:{

    },
    title:{
        fontSize:17,
        fontWeight:'700'
    }




})
