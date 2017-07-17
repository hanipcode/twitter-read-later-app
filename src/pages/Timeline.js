import React, { Component } from 'react';
import { Text, View, AsyncStorage, FlatList } from 'react-native';
import TwitterItem from '../components/TwitterItem';

export default class Timeline extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tweetData: [],
    };
  }
  async componentWillMount() {
    try {
      const tweetData = await AsyncStorage.getItem('tweetData');
      const parsedTweetData = JSON.parse(tweetData);
      this.setState({ tweetData: parsedTweetData });
      console.log(parsedTweetData);
    } catch (e) {
      this.props.navigation.navigate('Generate');
    }
  }

  renderItem({ item }) {
    return <TwitterItem data={item} />;
  }

  render() {
    return (
      <View>
        <FlatList data={this.state.tweetData} renderItem={this.renderItem} />
      </View>
    );
  }
}
