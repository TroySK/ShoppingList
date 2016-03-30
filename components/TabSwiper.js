'use strict';

import React, {StyleSheet, Text, View, Image, Animated} from 'react-native';

import SwipeCards from './SwipeCards.js';
import Icon from 'react-native-vector-icons/Ionicons';
var lodash = require('lodash');

let Card = React.createClass({
  render() {
    return (
      <View style={[styles.card, {backgroundColor: '#fff'}]}>
        <Image style={{width:300, height: 400, borderRadius: 4}} source={{uri: 'http://lorempixel.com/300/400/?' + this.props.text}}/>
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
        <View style={{flex: 1, marginTop: 40}}>
          <View style={{backgroundColor: '#fff', width: 260, height: 346, alignSelf: 'center', top: 0, left:60, opacity: 0.2, borderRadius: 4, position: 'absolute',     shadowColor: 'rgba(0,0,0,0.4)', shadowOffset: {width:1,height:1}, shadowOpacity: 1}} />
          <View style={{backgroundColor: '#fff', width: 280, height: 373, alignSelf: 'center', top: 10, left: 50, opacity: 0.4, borderRadius: 4, position: 'absolute', shadowColor: 'rgba(0,0,0,0.4)', shadowOffset: {width:1,height:1}, shadowOpacity: 1}} />
          <View style={styles.buttonGroup}>
            <View style={styles.button}>
              <Icon name="ios-close-outline" color="#e54a08" style={styles.buttonIcon} onPress={this.handleNoPress}>
              </Icon>
            </View>
            <View style={styles.button}>
              <Icon name="ios-checkmark-outline" color="#4de4bf" style={styles.buttonIcon} onPress={this.handleYesPress}>
              </Icon>
            </View>
          </View>
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
    height: 400,
    shadowColor: 'rgba(0,0,0,0.4)',
    shadowOffset: {width:1,height:1},
    shadowOpacity: 1,
    borderRadius: 4
  },
  container: {
    justifyContent: 'flex-start',
    backgroundColor: 'rgba(0,0,0,0)',
    marginBottom: 0,
    flexDirection: 'column',
    flex: 1
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    top: 420
  },
  button: {
    padding: 20
  },
  buttonIcon: {
    fontSize: 72,
  }
})
