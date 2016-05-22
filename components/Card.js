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
  Modal,
  TouchableOpacity
  } = React;

import ItemDetails from './ItemDetails.js';
const window = Dimensions.get('window');

class Card extends Component {

  constructor(props) {
    super(props);
    this.state = {
      modalVisible: this.props.flipped,
    };
  }

  _setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  componentWillReceiveProps(nextProps) {
    this._setModalVisible(nextProps.flipped);
  }

  render = () => {
    return (
      <TouchableOpacity onPress={() => this._setModalVisible(!this.state.modalVisible) }>
        <View>
          <View style={[this.props.style, {alignSelf: 'center'}]}>
            <View style={[{backgroundColor: 'rgba(0,0,0,0)'}]}>
              <Image resizeMode="cover" style={{width: window.width * (this.props.full ? 0.98 : 0.8), height: window.width * (this.props.full ? 0.98 : 0.8), borderRadius: 4 }} source={{uri: 'http://lorempixel.com/300/300/'}}/>
              <View style={{width: window.width * (this.props.full ? 0.98 : 0.8), height: ((window.height * 0.6) - (window.width * 0.8)), borderBottomLeftRadius: 4, borderBottomRightRadius: 4, backgroundColor: 'rgba(240,240,240, 1)', paddingLeft: 22, top: -3, flex: 1, flexDirection: 'row'}}>
                <View style={{flex: 4}}>
                  <Text style={{color: 'rgba(45, 45, 45, 1)', marginTop: 12, fontSize: 18, fontWeight: 'bold'}}>Apple iPhone 6S</Text>
                  <Text style={{color: 'rgba(45, 45, 45, 1)', marginTop: 3, fontSize: 14, fontWeight: 'normal'}}>(Silver, 128 GB)</Text>
                  <Text style={{color: 'rgba(0, 203, 255, 1)', marginTop: 3, fontSize: 14, fontWeight: 'bold', bottom: 12, position: 'absolute'}}>Rs. 64,990</Text>
                </View>
                <View style={{flex: 0, marginTop: 40, right: 40, opacity: (this.props.full ? 1 : 0)}}>
                  <TouchableOpacity onPress={() => console.info('Yo') }>
                    <Text style={{borderWidth: 2, borderRadius: 15, paddingLeft: 12, paddingTop: 5, paddingRight: 12, paddingBottom: 3, textAlign:'center', color: 'rgba(80, 227, 194, 1)', borderColor: 'rgba(80, 227, 194, 1)', fontSize: 16}}>Buy</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
          <Modal
            animated={true}
            transparent={false}
            visible={this.state.modalVisible}
            onRequestClose={() => {this._setModalVisible(false)}}
            >
            <ItemDetails></ItemDetails>
          </Modal>
        </View>
      </TouchableOpacity>
    );
  };
}

const styles = StyleSheet.create({

});
export default Card
