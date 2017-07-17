import React, { Component } from 'react';
import { SocialIcon } from 'react-native-elements';
import { Text, View, StyleSheet, AsyncStorage } from 'react-native';
import twitter, { auth } from 'react-native-twitter';
import CONFIG from '../config';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#29C5FF',
  },
  button: {
    padding: 0,
    paddingHorizontal: 10,
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
      authorized: false,
      tokens: {
        consumerKey: CONFIG.CONSUMER_KEY,
        consumerSecret: CONFIG.CONSUMER_SECRET,
        accessToken: '',
        accessTokenSecret: '',
      },
      loading: false,
    };
    this.onLoginPress = this.onLoginPress.bind(this);
  }

  async componentWillMount() {
    try {
      const data = await AsyncStorage.getItem('tokens');
      if (JSON.parse(data).accessToken) {
        this.props.navigation.navigate('Generate', { tokens: JSON.parse(data) });
      }
    } catch (e) {
      console.log("don't have any data", e);
    }
  }

  async onLoginPress() {
    this.setState({ loading: true });
    auth(this.state.tokens, 'deeplink://home')
      .then(({ accessToken, accessTokenSecret }) => {
        const tokens = { ...this.state.tokens, accessToken, accessTokenSecret };
        AsyncStorage.setItem('tokens', JSON.stringify(tokens));
        this.setState({
          authorized: true,
          loading: false,
          tokens,
        });
        this.props.navigation.navigate('Generate', { Twitter: twitter(tokens) });
      })
      .catch((err) => {
        alert(err);
      });
  }

  render() {
    const { loading } = this.state;
    return (
      <View style={styles.container}>
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
