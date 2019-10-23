import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, TouchableHighlight, TextInput} from 'react-native';
import color from 'color';

import styles from './styles';

const InputWithButton = props => {
  const {onPress, buttonText, editable = true, textColor} = props;
  const buttonTextStyles = [styles.buttonText];
  if (props.textColor) {
    buttonTextStyles.push({color: textColor});
  }
  const underlay = color(styles.$buttonBackgroundButtonBase).darken(
    styles.$buttonBackgroundButtonModifier,
  );

  const containerStyle = [styles.container];
  if (editable === false) {
    containerStyle.push(styles.containerDisabled);
  }
  return (
    <View style={containerStyle}>
      <TouchableHighlight
        underlayColor={underlay}
        style={styles.buttonContainer}
        onPress={onPress}>
        <Text style={buttonTextStyles}>{buttonText}</Text>
      </TouchableHighlight>
      <View style={styles.border} />
      <TextInput style={styles.input} {...props} />
    </View>
  );
};
InputWithButton.propTypes = {
  onPress: PropTypes.func,
  buttonText: PropTypes.string,
  editable: PropTypes.bool,
  textColor: PropTypes.string,
};
export default InputWithButton;
