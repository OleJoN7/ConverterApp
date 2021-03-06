import React from 'react';
import {
  View,
  ImageBackground,
  Text,
  Keyboard,
  Animated,
  Platform,
  StyleSheet,
} from 'react-native';
import styles from './styles';

const ANIMATION_DURATION = 250;

class Logo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      containerImageWidth: new Animated.Value(styles.$largeContainerSize),
      imageWidth: new Animated.Value(styles.$largeImageSize),
    };
  }
  componentDidMount() {
    const name = Platform.OS === 'ios' ? 'Will' : 'Did';
    this.keyboardShowListener = Keyboard.addListener(
      `keyboard${name}Show`,
      this.keyboardShow,
    );
    this.keyboardHideListener = Keyboard.addListener(
      `keyboard${name}Hide`,
      this.keyboardHide,
    );
  }

  componentWillUnmount() {
    this.keyboardShowListener.remove();
    this.keyboardHideListener.remove();
  }

  keyboardShow = () => {
    console.log('Keyboard did show');
    const {containerImageWidth, imageWidth} = this.state;
    Animated.parallel([
      Animated.timing(containerImageWidth, {
        toValue: styles.$smallContainerSize,
        duration: ANIMATION_DURATION,
      }),
      Animated.timing(imageWidth, {
        toValue: styles.$smallImageSize,
        duration: ANIMATION_DURATION,
      }),
    ]).start();
  };

  keyboardHide = () => {
    console.log('Keyboard did hide');
    const {containerImageWidth, imageWidth} = this.state;

    Animated.parallel([
      Animated.timing(containerImageWidth, {
        toValue: styles.$largeContainerSize,
        duration: ANIMATION_DURATION,
      }),
      Animated.timing(imageWidth, {
        toValue: styles.$largeImageSize,
        duration: ANIMATION_DURATION,
      }),
    ]).start();
  };

  render = () => {
    const {containerImageWidth, imageWidth} = this.state;
    const {tintColor} = this.props;

    const containerImageStyles = [
      styles.containerImage,
      {width: containerImageWidth, height: containerImageWidth},
    ];
    const containerBgStyles = [
      styles.containerBgImage,
      {width: containerImageWidth, height: containerImageWidth},
    ];
    const imageStyles = [
      styles.logo,
      {width: imageWidth},
      tintColor ? {tintColor} : null,
    ];
    return (
      <View style={styles.container}>
        <Animated.View style={containerImageStyles}>
          <Animated.Image
            resizeMode="contain"
            style={containerBgStyles}
            source={require('./images/background.png')}
          />
          <Animated.Image
            style={imageStyles}
            source={require('./images/logo.png')}
          />
        </Animated.View>
        <Text style={styles.text}>Currency Converter</Text>
      </View>
    );
  };
}

export default Logo;
