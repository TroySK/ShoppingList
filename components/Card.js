'use strict';

var React = require('react-native');

var {
  View,
  Easing,
  Dimensions,
  TouchableOpacity,
  Text,
  Component,
  Image,
  StyleSheet
  } = React;

import FlipCard from 'react-native-flip-card'
import ItemDetails from './ItemDetails.js';
const window = Dimensions.get('window');

class Card extends Component {

  render = () => {
    return (
      <FlipCard flip={this.props.flipped}
        style={{borderWidth: 0}}
        friction={20}
        flipHorizontal={false}
        flipVertical={true}
        clickable={true}
        onFlipped={(isFlipped)=>{console.log('isFlipped', isFlipped)}}>
        <View style={styles.face}>
          <View style={[{backgroundColor: 'rgba(0,0,0,0)', flex: 1, borderRadius: 4}]}>
            <Image resizeMode="cover" style={{width: window.width * 0.8, height: window.height *0.6, borderRadius: 4}} source={{uri: 'http://lorempixel.com/300/400/'}}/>
          </View>
        </View>
        <View style={{width: window.width, height: window.height, borderRadius: 4, left: window.width * -0.1, top: window.height * -0.1}}>
          <ItemDetails />
        </View>
      </FlipCard>
    );
  };
}

const styles = StyleSheet.create({

});
export default Card
