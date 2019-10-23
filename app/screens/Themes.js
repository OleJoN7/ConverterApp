import React from 'react';
import {ScrollView, StatusBar} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {connect} from 'react-redux';

import {ListItem, Separator} from '../components/List';

import {changePrimaryColor} from '../actions/themes';

const styles = EStyleSheet.create({
  $blue: '$primaryBlue',
  $green: '$primaryGreen',
  $orange: '$primaryOrange',
  $purple: '$primaryPurple',
});

const Themes = props => {
  const handleThemePress = color => {
    props.dispatch(changePrimaryColor(color));
    props.navigation.goBack(null);
  };
  return (
    <ScrollView>
      <StatusBar translucent={false} barStyle="default" />
      <ListItem
        text="Blue"
        onPress={() => handleThemePress(styles.$blue)}
        selected
        checkmark={false}
        iconBackground={styles.$blue}
      />
      <Separator />
      <ListItem
        text="Orange"
        onPress={() => handleThemePress(styles.$orange)}
        selected
        checkmark={false}
        iconBackground={styles.$orange}
      />
      <Separator />
      <ListItem
        text="Green"
        onPress={() => handleThemePress(styles.$green)}
        selected
        checkmark={false}
        iconBackground={styles.$green}
      />
      <Separator />
      <ListItem
        text="Purple"
        onPress={() => handleThemePress(styles.$purple)}
        selected
        checkmark={false}
        iconBackground={styles.$purple}
      />
      <Separator />
    </ScrollView>
  );
};

export default connect()(Themes);
