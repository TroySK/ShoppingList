'use strict';

import React, {StyleSheet, Text, View, Image, Animated} from 'react-native';

import SwipeCards from './SwipeCards.js';
import Icon from 'react-native-vector-icons/Ionicons';
var lodash = require('lodash');

let Card = React.createClass({
  render() {
    return (
      <View style={[styles.card, {backgroundColor: this.props.backgroundColor}]}>
        <Image style={{width:300, height: 300}} source={{uri: 'http://lorempixel.com/400/400/?' + this.props.text}}/>
      </View>
    )
  }
})



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
      pressedNo: false
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
  render() {
    return (
      <View style={styles.container}>
        <SwipeCards
          cards={this.state.cards}
          renderCard={(cardData) => <Card {...cardData} />}
          handleYup={this.handleYup}
          handleNope={this.handleNope}
          onSwiping={this.handleSwiping}
          pressedYes={this.state.pressedYes}
          pressedNo={this.state.pressedNo}
          onPressed={this.handlePressed}
        />
        <View style={styles.buttonGroup}>
          <View style={styles.button}>
            <Icon name="close-round" color="#004e66" style={styles.buttonIcon} onPress={this.handleNoPress}>
            </Icon>
          </View>
          <View style={styles.button}>
            <Icon name="checkmark-round" color="#ff5f2e" style={styles.buttonIcon} onPress={this.handleYesPress}>
            </Icon>
          </View>
        </View>
      </View>
    )
  }
})

const styles = StyleSheet.create({
  card: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: 300,
    height: 300,
    shadowColor: '#aaa',
    shadowOffset: {width:1,height:0},
    shadowOpacity: 1,
    borderRadius: 8,
  },
  container: {
    justifyContent: 'space-between',
    backgroundColor: '#f5f5f5',
    marginBottom: 0,
    flexDirection: 'column',
    flex: 1
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 100
  },
  button: {
    borderRadius: 50,
    backgroundColor: '#fff',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    // shadowColor: '#aaa',
    // shadowOffset: {width:1,height:0},
    // shadowOpacity: 1
    borderColor: '#ccc',
    borderWidth: 10,
  },
  buttonIcon: {
    fontSize: 48,
    padding: 0,
    margin: 0,
    width: 48,
    height: 48,
    textAlign: 'center',
  }
})
