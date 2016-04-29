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

import FlipCard from './FlipCard.js'
import ItemDetails from './ItemDetails.js';
const window = Dimensions.get('window');

class Card extends Component {

  constructor (props) {
    super(props)
    this.state = {
      isFlipped: false
    }
  }

  render = () => {
    return (
      <FlipCard flip={this.props.flipped}
        style={{borderWidth: 0}}
        friction={20}
        flipHorizontal={false}
        flipVertical={true}
        clickable={!this.state.isFlipped}
        onFlipped={(isFlipped)=>{console.log('isFlipped', isFlipped); this.setState({isFlipped: isFlipped})}}>
        <View style={styles.face}>
          <View style={[{backgroundColor: 'rgba(0,0,0,0)', flex: 1}]}>
            <Image resizeMode="cover" style={{width: window.width * 0.8, height: window.width * 0.8, borderRadius: 4}} source={{uri: 'http://lorempixel.com/300/300/'}}/>
            <View style={{width: window.width * 0.8, height: ((window.height * 0.6) - (window.width * 0.8)), borderBottomLeftRadius: 4, borderBottomRightRadius: 4, backgroundColor: 'rgba(240,240,240, 1)', paddingLeft: 22}}>
              <Text style={{color: 'rgba(45, 45, 45, 1)', marginTop: 12, fontSize: 18, fontWeight: 'bold'}}>Apple iPhone 6S</Text>
              <Text style={{color: 'rgba(45, 45, 45, 1)', marginTop: 3, fontSize: 14, fontWeight: 'normal'}}>(Silver, 128 GB)</Text>
              <Text style={{color: 'rgba(0, 203, 255, 1)', marginTop: 3, fontSize: 14, fontWeight: 'bold', bottom: 12, position: 'absolute'}}>Rs. 64,990</Text>
            </View>
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
