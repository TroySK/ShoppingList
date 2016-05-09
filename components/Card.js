'use strict';

var React = require('react-native');

var {
  View,
  Easing,
  Dimensions,
  Text,
  Component,
  Image,
  StyleSheet,
  Modal
  } = React;

import ItemDetails from './ItemDetails.js';
const window = Dimensions.get('window');

class Card extends Component {

  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
    };
  }

  _setModalVisible(visible) {
    this.setState({modalVisible: true});
    console.info('modal = ' + this.state.modalVisible)
  }

  render = () => {
    return (
      <View style={styles.face}>
        <View style={[{backgroundColor: 'rgba(0,0,0,0)', flex: 1}]}>
          <Image resizeMode="cover" style={{width: window.width * 0.8, height: window.width * 0.8, borderRadius: 4}} source={{uri: 'http://lorempixel.com/300/300/'}}/>
          <View style={{width: window.width * 0.8, height: ((window.height * 0.6) - (window.width * 0.8)), borderBottomLeftRadius: 4, borderBottomRightRadius: 4, backgroundColor: 'rgba(240,240,240, 1)', paddingLeft: 22}}>
            <Text style={{color: 'rgba(45, 45, 45, 1)', marginTop: 12, fontSize: 18, fontWeight: 'bold'}}>Apple iPhone 6S</Text>
            <Text style={{color: 'rgba(45, 45, 45, 1)', marginTop: 3, fontSize: 14, fontWeight: 'normal'}}>(Silver, 128 GB)</Text>
            <Text style={{color: 'rgba(0, 203, 255, 1)', marginTop: 3, fontSize: 14, fontWeight: 'bold', bottom: 12, position: 'absolute'}}>Rs. 64,990</Text>
          </View>
        </View>
        <Modal
          animated={true}
          transparent={false}
          visible={this.props.flipped}
          onRequestClose={() => {this._setModalVisible(false)}}
          >
          <ItemDetails></ItemDetails>
        </Modal>
      </View>
    );
  };
}

const styles = StyleSheet.create({

});
export default Card
