import React, { Component } from 'react';
import { Text, View, AsyncStorage } from 'react-native';
import { Button, FormLabel, FormInput, CheckBox, Icon, Header } from 'react-native-elements';
import TwitterItem from '../components/TwitterItem';
import twitter, { auth } from 'react-native-twitter';

export default class Generate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 1,
      haveData: false,
      overrideCurrent: false,
    };
    this.onGenerate = this.onGenerate.bind(this);
    this.onGoToTimeline = this.onGoToTimeline.bind(this);
  }

  async componentWillMount() {
    try {
      const data = await AsyncStorage.getItem('tweetData');
      if (JSON.parse(data).length > 0) this.setState({ haveData: true });
    } catch (e) {
      console.log("don't have any data", e);
    }
  }

  onGenerate() {
    const Twitter =
      this.props.navigation.state.params.Twitter ||
      twitter(this.props.navigation.state.params.tokens);
    const { rest } = Twitter;
    rest
      .get('statuses/home_timeline', { count: this.state.count })
      .then((data) => {
        if (this.state.overrideCurrent) {
          return AsyncStorage.removeItem('tweetData').then(() =>
            AsyncStorage.setItem('tweetData', JSON.stringify(data.map(this.filterData))),
          );
        }
        return AsyncStorage.setItem('tweetData', JSON.stringify(data.map(this.filterData)));
      })
      .then(() => {
        this.props.navigation.navigate('Timeline');
      });
  }

  onGoToTimeline() {
    this.props.navigation.navigate('Timeline');
  }

  logout() {
    AsyncStorage.clear().then(() => {
      this.props.navigation.navigate('Login');
    });
  }

  onChangeText(text) {
    this.setState({
      count: text,
    });
  }

  filterData(twitterData) {
    const data = {
      avatarUrl: twitterData.user.profile_image_url,
      fullname: twitterData.user.screen_name,
      sentDate: twitterData.created_at,
      text: twitterData.text,
    };
    return data;
  }

  render() {
    return (
      <View style={{ flex: 1, paddingTop: 45 }}>
        <Header
          rightComponent={<Logout onPress={() => this.logout()} />}
          backgroundColor="#0077C0"
          outerContainerStyles={{ height: 45 }}
        />
        <FormLabel>Number of Tweets</FormLabel>
        <FormInput
          value={this.state.count}
          placeholder="Number of tweets to retrieve"
          onChangeText={text => this.onChangeText(text)}
        />
        <CheckBox
          title="override current data"
          checked={this.state.overrideCurrent}
          onPress={() => this.setState({ overrideCurrent: !this.state.overrideCurrent })}
        />
        <Button
          title="generate"
          raised
          icon={{ name: 'query-builder' }}
          onPress={this.onGenerate}
          buttonStyle={{ marginVertical: 10 }}
          backgroundColor="#29C5FF"
        />
        {this.state.haveData &&
          <Button
            title="Go to Timeline"
            raised
            icon={{ name: 'view-list' }}
            onPress={this.onGoToTimeline}
            buttonStyle={{ marginVertical: 10 }}
          />}
      </View>
    );
  }
}

const Logout = ({ onPress }) => <Icon name="exit-to-app" color="#eee" onPress={onPress} />;

Generate.navigationOptions = {
  header: null,
};
