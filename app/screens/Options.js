import React from 'react';
import PropTypes from 'prop-types';
import {ScrollView, StatusBar, Platform, Linking} from 'react-native';
import {ListItem, Separator} from '../components/List';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {connectAlert} from '../components/Alert';

const ICON_PREFIX = Platform.OS === 'ios' ? 'ios' : 'md';
const ICON_COLOR = '#868686';
const ICON_SIZE = 23;

const Options = props => {
  const handleThemesPress = () => {
    props.navigation.navigate('Themes');
  };
  const handleSitePress = () => {
    Linking.openURL('http://fixer.io').catch(() =>
      props.alertWithType('error', 'Sorry', 'Fixer.io cannot be open!'),
    );
  };
  return (
    <ScrollView>
      <StatusBar translucent={false} barStyle="default" />
      <ListItem
        customIcon={
          <Ionicons
            name={`${ICON_PREFIX}-arrow-forward`}
            color={ICON_COLOR}
            size={ICON_SIZE}
          />
        }
        text="Themes"
        onPress={handleThemesPress}
      />
      <Separator />
      <ListItem
        customIcon={
          <Ionicons
            name={`${ICON_PREFIX}-link`}
            color={ICON_COLOR}
            size={ICON_SIZE}
          />
        }
        text="Fixer.io"
        onPress={handleSitePress}
      />
      <Separator />
    </ScrollView>
  );
};

Options.propTypes = {
  alertWithType: PropTypes.func,
  navigation: PropTypes.object,
};

export default connectAlert(Options);
