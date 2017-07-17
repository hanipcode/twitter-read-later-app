import React, { Component } from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';

const moment = require('moment');

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#FFF',
  },
  avatar: {
    height: 50,
    width: 50,
    borderRadius: 35,
  },
  rightContainer: {
    paddingLeft: 10,
    paddingRight: 10,
    flexShrink: 1,
  },
  icon: {
    width: 30,
    borderRadius: 25,
    alignSelf: 'center',
  },
});

export default class TwitterItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      expanded: false,
    };

    this.toggleExpand = this.toggleExpand.bind(this);
  }

  toggleExpand() {
    this.setState({ expanded: !this.state.expanded });
  }

  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.avatar} source={{ uri: this.props.data.avatarUrl }} />
        <View style={styles.rightContainer}>
          <Text>
            {this.props.data.fullname}
          </Text>
          <Text>
            {moment(this.props.data.sentDate).fromNow()}
          </Text>
          <Text numberOfLines={this.state.expanded ? 5 : 2}>
            {this.props.data.text}
          </Text>
          <Icon
            name="keyboard-arrow-down"
            color="#ccc"
            underlayColor="#eee"
            onPress={this.toggleExpand}
            containerStyle={styles.icon}
          />
        </View>
      </View>
    );
  }
}

TwitterItem.defaultProps = {
  data: {
    avatarUrl: 'http://lorempixel.com/200/200/people/',
    fullname: 'Your Name',
    sentDate: '07 April 2015',
    text:
      'Hi, This is my lorem ipsum Hi, This is my lorem ipsum Hi, This is my lorem ipsumHi, This is my lorem ipsum Hi, This is my lorem ipsum Hi, This is my lorem ipsum',
  },
};
