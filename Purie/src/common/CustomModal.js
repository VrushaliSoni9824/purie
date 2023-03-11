import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {Icon} from 'react-native-elements';
import Modal from 'react-native-modal';

const CustomModal = props => {
  return (
    <Modal
      style={props.style}
      onBackButtonPress={props.deleteIconPress}
      backdropOpacity={props.opacity}
      isVisible={props.isVisible}>
      <View style={styles.modalContainer}>
        {props.popup && (
          <View
            style={{
              position: 'absolute',
              top: -50,
              left: '43%',
              width: 80,
              height: 80,
              borderRadius: 40,
              alignItems: 'center',
              justifyContent: 'center',

              backgroundColor: props.bgColor,
            }}>
            <Icon style={props.iconStyle} {...props} />
          </View>
        )}
        <View
          style={{
            position: 'absolute',
            right: 0,
            top: -10,
            backgroundColor: 'red',
            borderRadius: 20,
          }}>
          {!props.doNotShowDeleteIcon && (
            <Icon
              name="times-circle"
              type="font-awesome-5"
              color="#fff"
              onPress={props.deleteIconPress}
            />
          )}
        </View>
        <ScrollView>
          {props.title && (
            <View style={[styles.center,{marginBottom:15}]}>
              <Text style={[styles.modalHeader, props.headerTextStyle]}>
                {props.title}
              </Text>
            </View>
          )}
          {props.subTitle && (
            <View style={styles.center}>
              <Text style={[styles.modalHeader, props.subHeaderTextStyle]}>
                {props.subTitle}
              </Text>
            </View>
          )}
          {props.children}
        </ScrollView>
      </View>
    </Modal>
  );
};

export default CustomModal;

const styles = StyleSheet.create({
  center: {
    justifyContent: 'center',
    alignItems: 'center',
    // marginVertical: 20,
  },
  headingContainer: {
    marginTop: 8,
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: '5%',
  },
  modalHeader: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 13,
    color:'black'
  },
});
