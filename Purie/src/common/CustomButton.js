import React, {Component} from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';
export class CustomButton extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    let {
      onPress,
      title,
      color,
      width,
      marginBottom,
      marginTop,
      disabled,
      alignSelf,
      textStyle,
      marginRight,
      justifyContent,
      radius,
      padding,
    } = this.props;
    return (
      <TouchableOpacity
        disabled={disabled}
        style={{
          backgroundColor: color,
          width: width,
          //height: 40,
          justifyContent: justifyContent || 'center',
          alignItems: 'center',
          alignSelf: alignSelf || 'center',
          borderRadius: radius || 10,
          padding: padding || 10,
          marginBottom: marginBottom,
          marginTop,
          marginRight,
        }}
        onPress={() => {
          onPress();
        }}>
        {this.props.children}
        {title && <Text style={[styles.text, textStyle]}>{title}</Text>}
      </TouchableOpacity>
    );
  }
}
const styles = StyleSheet.create({
  text: {
    fontFamily: 'Poppins-Regular',
    fontSize: 15,
    color: 'white',
  },
});
