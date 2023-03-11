import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import CustomModal from './CustomModal';

const CustomPopUp = props => {
  return (
    <CustomModal
      doNotShowDeleteIcon
      popup
      bgColor={props.bgColor}
      name={props.name}
      type={props.type}
      color={props.color}
      size={props.size}
      headerTextStyle={{
        color: props.headerColor || 'black',
        fontSize: 18,
        marginTop: 20,
      }}
      subHeaderTextStyle={{
        fontFamily: 'Poppins-Regular',
        fontSize: 14,
        marginBottom: 20,
      }}
      {...props}>
      {props.children}
    </CustomModal>
  );
};

export default CustomPopUp;

const styles = StyleSheet.create({});
