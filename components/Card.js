'use strict';

var React = require('react-native');

var {
  View,
  Easing,
  TouchableOpacity,
  Text,
  Component,
  Image
  } = React;

var FlipView = require('react-native-flip-view');

class Card extends Component {
  constructor(props) {
    super(props);
    this.state = { isFlipped: false };
  }

  render = () => {
    return (
      <FlipView style={{flex: 1}}
                front={this._renderFront()}
                back={this._renderBack()}
                isFlipped={this.state.isFlipped}
                onFlipped={(val) => {console.log('Flipped: ' + val);}}
                flipAxis="y"
                flipEasing={Easing.out(Easing.ease)}
                flipDuration={500}
                perspective={1000}/>
    );
  };

  _renderFront = () => {
    return (
      <View style={{flex: 1}}>
        <Image resizeMode="cover" style={{ width: window.width * 0.8, height: window.height * 0.6, borderRadius: 4}} source={{uri: 'http://lorempixel.com/300/400/'}} onPress={this._flip}/>
      </View>
    );
  };

  _renderBack = () => {
    return (
      <View style={{flex: 1, backgroundColor: '#1565C0', justifyContent: 'center', alignItems: 'center'}}>
      <TouchableOpacity style={{backgroundColor: 'black', padding: 20}} onPress={this._flip}>
        <Text style={{fontSize: 32, color: 'white'}}>Flip to Front!</Text>
      </TouchableOpacity>
      </View>
    );
  };

  _flip = () => {
    this.setState({isFlipped: !this.state.isFlipped});
  };
}

export default Card
