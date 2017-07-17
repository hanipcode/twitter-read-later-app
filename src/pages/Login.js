import React, { Component } from 'react';
import { SocialIcon } from 'react-native-elements';
import { Text, View, StyleSheet, AsyncStorage } from 'react-native';
import twitter, { auth } from 'react-native-twitter';

const styles = StyleSheet.create({
  button: {
    padding: 0,
    height: 45,
    borderRadius: 5,
  },
  icon: {
    height: 20,
    marginVertical: 10,
  },
});

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
    };
    this.onLoginPress = this.onLoginPress.bind(this);
  }

  onLoginPress() {
    this.setState({ loading: !this.state.loading });
  }

  render() {
    const { loading } = this.state;
    return (
      <View>
        <Text> Login Page </Text>
        <SocialIcon
          title="Login to Your Twitter Account"
          type="twitter"
          button
          style={styles.button}
          iconStyle={styles.icon}
          onPress={this.onLoginPress}
          disabled={loading}
          loading={loading}
        />
      </View>
    );
  }
}
