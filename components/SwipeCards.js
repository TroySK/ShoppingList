'use strict';

import React, { StyleSheet, Text, View, Animated, Component, PanResponder, Image, Dimensions} from 'react-native';
import clamp from 'clamp';

import NoMoreCards from './NoMoreCards.js';

var SWIPE_THRESHOLD = 120;

const window = Dimensions.get('window');

class SwipeCards extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pan: new Animated.ValueXY(),
      enter: new Animated.Value(0.5),
      card: this.props.cards[0],
      pressedYes: this.props.pressedYes,
      pressedNo: this.props.pressedNo,
    }
  }

  _goToNextCard() {
    let currentCardIdx = this.props.cards.indexOf(this.state.card);
    let newIdx = currentCardIdx + 1;

    // Checks to see if last card.
    // If props.loop=true, will start again from the first card.
    let card = newIdx > this.props.cards.length - 1
      ? this.props.loop ? this.props.cards[0] : null
      : this.props.cards[newIdx];

    this.setState({
      card: card
    });
  }

  componentDidMount() {
    this._animateEntrance();
  }

  _animateEntrance() {
    Animated.spring(
      this.state.enter,
      { toValue: 1, friction: 8 }
    ).start();
  }

  componentWillReceiveProps (nextProps) {
    this.setState({
      pressedYes: nextProps.pressedYes,
      pressedNo: nextProps.pressedNo
    });
    return true;
  }

  componentDidUpdate() {
    if(this.state.pressedYes){
      this.props.onPressed();
      Animated.decay(this.state.pan, {
        velocity: {x: 7, y: 0},
        deceleration: 0.98
      }).start(this._resetState.bind(this));
      this.props.handleYup(this.state.card);
    }
    if(this.state.pressedNo){
      this.props.onPressed();
      Animated.decay(this.state.pan, {
        velocity: {x: -7, y: 0},
        deceleration: 0.98
      }).start(this._resetState.bind(this));
      this.props.handleNope(this.state.card);
    }
  }

  componentWillMount() {
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

      onPanResponderGrant: (e, gestureState) => {
        this.props.onSwiping(true);
        this.state.pan.setOffset({x: this.state.pan.x._value, y: this.state.pan.y._value});
        this.state.pan.setValue({x: 0, y: 0});
      },

      onPanResponderMove: Animated.event([
        null, {dx: this.state.pan.x, dy: this.state.pan.y},
      ]),

      onPanResponderRelease: (e, {vx, vy}) => {

        this.state.pan.flattenOffset();
        var velocity;

        if (vx >= 0) {
          velocity = clamp(vx, 3, 5);
        } else if (vx < 0) {
          velocity = clamp(vx * -1, 3, 5) * -1;
        }

        if (Math.abs(this.state.pan.x._value) > SWIPE_THRESHOLD) {

          this.state.pan.x._value > 0
            ? this.props.handleYup(this.state.card)
            : this.props.handleNope(this.state.card)

          this.props.cardRemoved
            ? this.props.cardRemoved(this.props.cards.indexOf(this.state.card))
            : null

          Animated.decay(this.state.pan, {
            velocity: {x: velocity, y: vy},
            deceleration: 0.98
          }).start(this._resetState.bind(this))
        } else {
          Animated.spring(this.state.pan, {
            toValue: {x: 0, y: 0},
            friction: 4
          }).start()
        }
        this.props.onSwiping(false);
      }
    })
  }

  _resetState() {
    this.state.pan.setValue({x: 0, y: 0});
    this.state.enter.setValue(0);
    this._goToNextCard();
    this._animateEntrance();
  }

  renderNoMoreCards() {
    if (this.props.renderNoMoreCards)
      return this.props.renderNoMoreCards();

    return (
      <NoMoreCards />
    )
  }

  renderCard(cardData) {
    return this.props.renderCard(cardData)
  }

  render() {
    let { pan, enter, } = this.state;

    let [translateX, translateY] = [pan.x, pan.y];

    let rotate = pan.x.interpolate({inputRange: [-200, 0, 200], outputRange: ["-30deg", "0deg", "30deg"]});
    let opacity = pan.x.interpolate({inputRange: [-200, 0, 200], outputRange: [0.5, 1, 0.5]});
    let scale = enter;

    let animatedCardstyles = {transform: [{translateX}, {translateY}, {rotate}, {scale}], opacity};

    let yupOpacity = pan.x.interpolate({inputRange: [0, 150], outputRange: [0, 1]});
    let yupScale = pan.x.interpolate({inputRange: [0, 150], outputRange: [0.5, 1], extrapolate: 'clamp'});
    let animatedYupStyles = {transform: [{scale: yupScale}], opacity: yupOpacity}

    let nopeOpacity = pan.x.interpolate({inputRange: [-150, 0], outputRange: [1, 0]});
    let nopeScale = pan.x.interpolate({inputRange: [-150, 0], outputRange: [1, 0.5], extrapolate: 'clamp'});
    let animatedNopeStyles = {transform: [{scale: nopeScale}], opacity: nopeOpacity}

    return (
      <View style={{flex: 1}}>
        <View style={{flex: 0.1}} />
        <View style={{flex: 0.8, flexDirection: 'row'}}>
          <View style={{flex: 0.1}} />
          <View style={{flex: 0.8}}>

            <View style={{backgroundColor: '#fff', opacity: 0.2, borderRadius: 4, shadowColor: 'rgba(0,0,0,0.4)', shadowOffset: {width:1,height:1}, shadowOpacity: 1, flex: 1, justifyContent: 'center', alignSelf: 'center', position: 'absolute', top: 0, left: window.width *0.1, width: window.width * 0.6, height: window.height *0.5 }} />

            <View style={{backgroundColor: '#fff', opacity: 0.2, borderRadius: 4, shadowColor: 'rgba(0,0,0,0.4)', shadowOffset: {width:1,height:1}, shadowOpacity: 1, flex: 1, justifyContent: 'center', alignSelf: 'center', position: 'absolute', top: 10, left: window.width *0.05, width: window.width * 0.7, height: window.height *0.5 }} />

            <View style={styles.container}>
              { this.state.card
                  ? (
                  <Animated.View style={[styles.card, animatedCardstyles]} {...this._panResponder.panHandlers}>
                    {this.renderCard(this.state.card)}
                  </Animated.View>
                  )
                  : this.renderNoMoreCards() }


              { this.props.showNope
                ? (
                  <Animated.View style={[styles.nope, animatedNopeStyles]}>
                    <Text style={styles.nopeText}>Nevermind!</Text>
                  </Animated.View>
                  )
                : null
              }

              { this.props.showYup
                ? (
                  <Animated.View style={[styles.yup, animatedYupStyles]}>
                    <Text style={styles.yupText}>Shortlisted!</Text>
                  </Animated.View>
                )
                : null }
            </View>

          </View>
          <View style={{flex: 0.1}} />
        </View>
        <View style={{flex: 0.1}} />
      </View>
    );
  }
}

SwipeCards.propTypes = {
  cards: React.PropTypes.array,
  renderCards: React.PropTypes.func,
  loop: React.PropTypes.bool,
  renderNoMoreCards: React.PropTypes.func,
  showYup: React.PropTypes.bool,
  showNope: React.PropTypes.bool,
  handleYup: React.PropTypes.func,
  handleNope: React.PropTypes.func
};

SwipeCards.defaultProps = {
  loop: false,
  showYup: true,
  showNope: true
};


var styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0)',
    position: 'absolute',
    top: 20,
    borderRadius: 4
  },
  yup: {
    borderColor: 'green',
    borderWidth: 2,
    position: 'absolute',
    padding: 20,
    bottom: 20,
    borderRadius: 5,
    right: 20,
  },
  yupText: {
    fontSize: 16,
    color: 'green',
  },
  nope: {
    borderColor: 'red',
    borderWidth: 2,
    position: 'absolute',
    bottom: 20,
    padding: 20,
    borderRadius: 5,
    left: 20,
  },
  nopeText: {
    fontSize: 16,
    color: 'red',
  }
});

export default SwipeCards
