'use strict';

import React, {StyleSheet, Text, View, Image, Animated, Dimensions, TouchableHighlight} from 'react-native';

import SwipeCards from './SwipeCards.js';
import Card from './Card.js';
import Icon from 'react-native-vector-icons/Ionicons';
var lodash = require('lodash');

const window = Dimensions.get('window');

const Cards = [
  {text: 'Tomato', backgroundColor: 'red'},
  {text: 'Aubergine', backgroundColor: 'purple'},
  {text: 'Courgette', backgroundColor: 'green'},
  {text: 'Blueberry', backgroundColor: 'blue'},
  {text: 'Umm...', backgroundColor: 'cyan'},
  {text: 'orange', backgroundColor: 'orange'},
]

export default React.createClass({
  getInitialState() {
    return {
      cards: Cards,
      pressedYes: false,
      pressedNo: false,
      flipped: false
    }
  },
  handleYup (card) {
    this.setState({
      cards: lodash.pull(this.state.cards, card)
    });
    console.log(`Yup for ${card.text}`)
  },
  handleNope (card) {
    this.setState({
      cards: lodash.pull(this.state.cards, card)
    });
    console.log(`Nope for ${card.text}`)
  },
  handleSwiping (status) {
    this.props.onSwiping(status);
  },
  handlePressed () {
    this.setState({
      pressedYes: false,
      pressedNo: false,
      flipped: false
    });
  },
  handleYesPress () {
    if(this.state.cards.length > 0){
      this.setState({
        pressedYes: true
      });
    }
  },
  handleNoPress () {
    if(this.state.cards.length > 0){
      this.setState({
        pressedNo: true
      });
    }
  },
  handleCardPress () {
    this.setState({
      flipped: this.state.flipped ? false : true
    });
    console.info(this.state.flipped)
    // this.props.onSwiping(this.state.flipped);
  },
  render() {
    return (
      <View style={styles.container}>
        <View style={{flex: 0.8}}>
          <SwipeCards
            cards={this.state.cards}
            renderCard={(cardData) => <Card {...cardData} flipped={this.state.flipped}/>}
            handleYup={this.handleYup}
            handleNope={this.handleNope}
            onSwiping={this.handleSwiping}
            pressedYes={this.state.pressedYes}
            pressedNo={this.state.pressedNo}
            onPressed={this.handlePressed}
            onCardPress={this.handleCardPress}
            isFlipped={this.state.flipped}
          />
        </View>
        <View style={{flex: 0.2}}>
          <View style={styles.buttonGroup}>
            <View style={styles.button}>
              <Icon name="ios-close-outline" color="rgba(229, 74, 9, 1)" style={styles.buttonIcon} onPress={this.handleNoPress}>
              </Icon>
            </View>
            <View style={styles.button}>
              <Icon name="ios-checkmark-outline" color="rgba(80, 227, 194, 1)" style={styles.buttonIcon} onPress={this.handleYesPress}>
              </Icon>
            </View>
          </View>
        </View>
      </View>
    )
  }
})

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0,0,0,0)',
    flex: 1,
    flexDirection: 'column'
  },
  card: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'rgba(0,0,0,0.4)',
    shadowOffset: {width:1,height:1},
    shadowOpacity: 1,
    borderRadius: 4
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 20
  },
  button: {
    padding: 20
  },
  buttonIcon: {
    fontSize: 72,
  }
})
