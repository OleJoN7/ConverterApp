import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {StatusBar, View, KeyboardAvoidingView} from 'react-native';
import {Container} from '../components/Container';
import {Logo} from '../components/Logo';
import {InputWithButton} from '../components/TextInput';
import {ClearButton} from '../components/Buttons';
import {LastConverted} from '../components/Text';
import {Header} from '../components/Header';
import {connectAlert} from '../components/Alert';

import {
  swapCurrency,
  changeCurrencyAmount,
  getInitialConversion,
} from '../actions/currencies';

class Home extends React.Component {
  static propTypes = {
    navigation: PropTypes.object,
    dispatch: PropTypes.func,
    quoteCurrency: PropTypes.string,
    baseCurrency: PropTypes.string,
    amount: PropTypes.number,
    conversionRate: PropTypes.number,
    isFetching: PropTypes.bool,
    lastConvertedDate: PropTypes.object,
    primaryColor: PropTypes.string,
    alertWithType: PropTypes.func,
    currencyError: PropTypes.string,
  };
  componentWillReceiveProps(nextProps) {
    const {currencyError, alertWithType} = this.props;
    if (nextProps.currencyError && !currencyError) {
      alertWithType('error', 'Error', nextProps.currencyError);
    }
  }
  componentWillMount = () => {
    this.props.dispatch(getInitialConversion());
  };
  handleTextChange = amount => {
    this.props.dispatch(changeCurrencyAmount(amount));
  };
  handlePressBaseCurrency = () => {
    this.props.navigation.navigate('CurrencyList', {
      title: 'Base Currency',
      type: 'base',
    });
  };
  handlePressOuoteCurrency = () => {
    this.props.navigation.navigate('CurrencyList', {
      title: 'Quote Currency',
      type: 'quote',
    });
  };
  handleSwapCurrency = () => {
    console.log('Pressed swap Currency');
    this.props.dispatch(swapCurrency());
  };
  handleOptionsPress = () => {
    this.props.navigation.navigate('Options');
  };
  render = () => {
    let quotePrice = (this.props.amount * this.props.conversionRate).toFixed(2);
    if (this.props.isFetching) {
      quotePrice = '...';
    }
    return (
      <Container backgroundColor={this.props.primaryColor}>
        <StatusBar translucent={false} barStyle="light-content" />
        <Header onPress={this.handleOptionsPress} />
        <KeyboardAvoidingView behavior="height">
          <Logo tintColor={this.props.primaryColor} />
          <InputWithButton
            buttonText={this.props.baseCurrency}
            onPress={this.handlePressBaseCurrency}
            defaultValue={this.props.amount.toString()}
            keyboardType="numeric"
            onChangeText={this.handleTextChange}
            textColor={this.props.primaryColor}
          />
          <InputWithButton
            buttonText={this.props.quoteCurrency}
            onPress={this.handlePressOuoteCurrency}
            editable={false}
            value={quotePrice}
            textColor={this.props.primaryColor}
          />
          <LastConverted
            base={this.props.baseCurrency}
            quote={this.props.quoteCurrency}
            date={this.props.lastConvertedDate}
            conversionRate={this.props.conversionRate}
          />
          <ClearButton
            text={'Reverse Currencies'}
            onPress={this.handleSwapCurrency}
          />
        </KeyboardAvoidingView>
      </Container>
    );
  };
}

// taking redux state and mapping it to components props
const mapStateToProps = state => {
  const baseCurrency = state.currencies.baseCurrency;
  const quoteCurrency = state.currencies.quoteCurrency;
  const amount = state.currencies.amount;
  const conversionSelector = state.currencies.conversions[baseCurrency] || {};
  const rates = conversionSelector.rates || {};
  const conversionRate = rates[quoteCurrency] || 0;
  const isFetching = conversionSelector.isFetching;
  const lastConvertedDate = conversionSelector.date
    ? new Date(conversionSelector.date)
    : new Date();
  const primaryColor = state.themes.primaryColor;
  return {
    baseCurrency,
    quoteCurrency,
    amount,
    conversionRate,
    isFetching,
    lastConvertedDate,
    primaryColor,
    currencyError: state.currencies.error,
  };
};

export default connect(mapStateToProps)(connectAlert(Home));
