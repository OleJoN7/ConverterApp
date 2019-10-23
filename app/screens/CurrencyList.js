import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {FlatList, View, StatusBar} from 'react-native';
import currencies from '../data/currencies';
import {ListItem, Separator} from '../components/List';

import {changeBaseCurrency, changeQuoteCurrency} from '../actions/currencies';

const CurrencyList = props => {
  const handlePress = currency => {
    const {type} = props.navigation.state.params;
    if (type === 'base') {
      props.dispatch(changeBaseCurrency(currency));
    } else if (type === 'quote') {
      props.dispatch(changeQuoteCurrency(currency));
    }
    props.navigation.goBack(null);
  };
  let comparisonCurrency = props.baseCurrency;
  if (props.navigation.state.params.type === 'quote') {
    comparisonCurrency = props.quoteCurrency;
  }
  return (
    <View style={{flex: 1}}>
      <StatusBar barStyle="default" translucent={false} />
      <FlatList
        data={currencies}
        renderItem={({item}) => {
          return (
            <ListItem
              text={item}
              selected={item === comparisonCurrency}
              onPress={() => handlePress(item)}
              iconBackground={props.primaryColor}
            />
          );
        }}
        keyExtractor={item => item}
        ItemSeparatorComponent={Separator}
      />
    </View>
  );
};

CurrencyList.propTypes = {
  navigation: PropTypes.object,
  dispatch: PropTypes.func,
  baseCurrency: PropTypes.string,
  quoteCurrency: PropTypes.string,
  primaryColor: PropTypes.string,
};

const mapStateToProps = state => {
  return {
    baseCurrency: state.currencies.baseCurrency,
    quoteCurrency: state.currencies.quoteCurrency,
    primaryColor: state.themes.primaryColor,
  };
};

export default connect(mapStateToProps)(CurrencyList);
