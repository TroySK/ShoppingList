'use strict';

import React, { StyleSheet, Text, View, Animated, Component, PanResponder, Image, Dimensions} from 'react-native';
import clamp from 'clamp';
import Icon from 'react-native-vector-icons/Ionicons';

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
      nextImage: this.props.cards[0]
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

  _nextRandomImage() {
    setInterval(function(){
      this.state.nextImage = this.props.cards[Math.floor(Math.random() * this.props.cards.length)]
    }.bind(this), 500);
  }

  componentDidMount() {
    this._animateEntrance();
    this._nextRandomImage();
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
        if(Math.abs(this.state.pan.x._value) === 0 && Math.abs(this.state.pan.y._value === 0)){
          this.props.onCardPress();
        }

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

            <View style={{backgroundColor: '#fff', opacity: 0.2, borderRadius: 4, shadowColor: 'rgba(0,0,0,0.4)', shadowOffset: {width:1,height:1}, shadowOpacity: 1, flex: 1, justifyContent: 'center', alignSelf: 'center', position: 'absolute', top: 80, left: window.width *0.1, width: window.width * 0.6, height: window.height *0.5 }}>
              <View style={[{backgroundColor: 'rgba(0,0,0,0)', flex: 1}]}>
                <Image resizeMode="cover" style={{flex:2.5, borderRadius: 4 }} source={{uri: 'http://lorempixel.com/300/300/'}}/>
                <View style={{flex: 1, borderBottomLeftRadius: 4, borderBottomRightRadius: 4, backgroundColor: 'rgba(240,240,240, 1)', paddingLeft: 22, top: -3}}>
                  <View style={{width: window.width * 0.48, height: 16, backgroundColor: 'rgba(110,110,110, 0.2)', top: 15}}></View>
                  <View style={{width: window.width * 0.38, height: 16, backgroundColor: 'rgba(110,110,110, 0.2)', top: 25}}></View>
                  <View style={{width: 60, height: 16, backgroundColor: 'rgba(110,110,110, 0.2)', top: 35}}></View>
                </View>
              </View>
            </View>

            <View style={{backgroundColor: '#fff', opacity: 0.4, borderRadius: 4, shadowColor: 'rgba(0,0,0,0.4)', shadowOffset: {width:1,height:1}, shadowOpacity: 1, flex: 1, justifyContent: 'center', alignSelf: 'center', position: 'absolute', top: 62, left: window.width * 0.05, width: window.width * 0.7, height: window.height * 0.5 }}>
              <View style={[{backgroundColor: 'rgba(0,0,0,0)', flex: 1}]}>
                <Image resizeMode="cover" style={{flex:2.5, borderRadius: 4 }} source={{uri: 'http://lorempixel.com/300/300/'}}/>
                <View style={{flex: 1, borderBottomLeftRadius: 4, borderBottomRightRadius: 4, backgroundColor: 'rgba(240,240,240, 1)', paddingLeft: 22, top: -3}}>
                  <Text>{this.state.nextImage.text}</Text>
                  <View style={{width: window.width * 0.58, height: 20, backgroundColor: 'rgba(110,110,110, 0.2)', top: 10}}></View>
                  <View style={{width: window.width * 0.48, height: 20, backgroundColor: 'rgba(110,110,110, 0.2)', top: 20}}></View>
                  <View style={{width: 80, height: 20, backgroundColor: 'rgba(110,110,110, 0.2)', top: 30}}></View>
                </View>
              </View>
            </View>
            <View style={styles.container}>
              { this.state.card
                  ?
                  (
                    <Animated.View style={[styles.card, animatedCardstyles]} {...this._panResponder.panHandlers}>
                      {this.renderCard(this.state.card)}
                    </Animated.View>
                  )
                  : this.renderNoMoreCards() }


              { this.props.showNope
                ? (
                  <Animated.View style={[styles.nope, animatedNopeStyles]}>
                    <Text style={styles.nopeText}>
                      Nevermind  <Icon name="close" color="rgba(255, 255, 255, 1)" size={16} />
                    </Text>
                  </Animated.View>
                  )
                : null
              }

              { this.props.showYup
                ? (
                  <Animated.View style={[styles.yup, animatedYupStyles]}>
                    <Text style={styles.yupText}>
                      Shortlisted  <Icon name="checkmark" color="rgba(255, 255, 255, 1)" size={16} />
                    </Text>
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
    top: -20,
    borderRadius: 4
  },
  yup: {
    backgroundColor: 'rgba(80, 227, 194, 1)',
    borderRadius: 15,
    padding: 8,
    bottom: -160,
    position: 'absolute',
    left: window.width/2 - 100
  },
  yupText: {
    fontSize: 16,
    color: 'rgba(255,255,255,1)',
    fontWeight: "700"
  },
  nope: {
    backgroundColor: 'rgba(229, 74, 9, 1)',
    borderRadius: 15,
    padding: 8,
    bottom: -160,
    position: 'absolute',
    left: window.width/2 - 100
  },
  nopeText: {
    fontSize: 16,
    color: 'rgba(255,255,255,1)',
    fontWeight: "700"
  }
});

export default SwipeCards
