import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
  constainer: {
    alignItems: 'center',
  },
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 19,
    marginRight: 11,
    resizeMode: 'contain',
  },
  text: {
    color: '$white',
    fontSize: 14,
    fontWeight: 'bold',
    paddingVertical: 20,
  },
});
