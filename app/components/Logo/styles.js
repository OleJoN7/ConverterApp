import EStyleSheet from 'react-native-extended-stylesheet';
import {Dimensions} from 'react-native';

const imageWidth = Dimensions.get('window').width / 2;

export default EStyleSheet.create({
  $largeContainerSize: imageWidth,
  $largeImageSize: imageWidth / 2,
  $smallContainerSize: imageWidth / 2,
  $smallImageSize: imageWidth / 4,
  container: {
    alignItems: 'center',
  },
  containerImage: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '$largeContainerSize',
    height: '$largeContainerSize',
  },
  containerBgImage: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    width: '$largeContainerSize',
    height: '$largeContainerSize',
  },
  logo: {
    width: '$largeImageSize',
    resizeMode: 'contain',
  },
  text: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 28,
    letterSpacing: -0.5,
    marginTop: 10,
    color: '$white',
  },
});
