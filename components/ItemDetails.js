import React, {
  Component,
  Dimensions,
  Image,
  PixelRatio,
  StyleSheet,
  Text,
  View,
  ScrollView
} from 'react-native';

import ParallaxView from 'react-native-parallax-view';
import ModalSettings from './ModalSettings.js';
import LinearGradient from 'react-native-linear-gradient';

class ItemDetails extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { onScroll = () => { } } = this.props;
    return (
      <ParallaxView
        backgroundSource={{uri: 'http://lorempixel.com/300/300/'}}
        style={{backgroundColor: 'rgba(255, 255, 255,1)'}}
        scrollableViewStyle={{ backgroundColor: 'rgba(240, 240, 240,1)' }}
    >
      <View style={{margin: 24, width: window.width, height: (window.height - window.width)}}>
        <Text style={{color: 'rgba(45, 45, 45, 1)', fontSize: 18, fontWeight: 'bold'}}>Apple iPhone 6S</Text>
        <Text style={{color: 'rgba(45, 45, 45, 1)', marginTop: 10, fontSize: 14, fontWeight: 'normal'}}>(Silver, 128 GB)</Text>
        <View>
          <Text style={{color: 'rgba(183, 183, 183, 1)', marginTop: 10, fontSize: 16}}>OS 9</Text>
          <Text style={{color: 'rgba(183, 183, 183, 1)', fontSize: 16}}>4.7 inch Touchscreen</Text>
          <Text style={{color: 'rgba(183, 183, 183, 1)', fontSize: 16}}>12 MP Primary Camera</Text>
          <Text style={{color: 'rgba(183, 183, 183, 1)', fontSize: 16}}>3D Touch & Live Photos</Text>
          <Text style={{color: 'rgba(183, 183, 183, 1)', fontSize: 16}}>4.7 inch Touchscreen</Text>
          <Text style={{color: 'rgba(183, 183, 183, 1)', fontSize: 16}}>12 MP Primary Camera</Text>
          <Text style={{color: 'rgba(183, 183, 183, 1)', fontSize: 16}}>3D Touch & Live Photos</Text>
          <Text style={{color: 'rgba(183, 183, 183, 1)', fontSize: 16}}>Warranty</Text>
          <Text style={{width: (window.width - 48), color: 'rgba(183, 183, 183, 1)', fontSize: 16}}>1 year manufacturer warranty for Phone and 6 months warranty for in the box accessories</Text>
          <Text style={{color: 'rgba(0, 203, 255, 1)', marginTop: 10, fontSize: 14, fontWeight: 'bold', fontSize: 16}}>Rs. 64,990</Text>
        </View>
      </View>
      <LinearGradient style={{width: window.width, height: window.width + 200, position:'absolute', top: 0, left: 0}} colors={['rgba(255,255,255,0)','rgba(255,255,255,0.5)', 'rgba(255,255,255,1)']}></LinearGradient>
    </ParallaxView>
    );
  }
}

const window = Dimensions.get('window');

const AVATAR_SIZE = 90;
const ROW_HEIGHT = 60;
const PARALLAX_HEADER_HEIGHT = 300;
const STICKY_HEADER_HEIGHT = 0;

const styles = StyleSheet.create({
  parallaxHeader: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'column',
    paddingTop: 100,
    backgroundColor: 'rgba(0,0,0,0)'
  },
  avatar: {
    marginBottom: 10,
    borderRadius: AVATAR_SIZE / 2
  },
  sectionSpeakerText: {
    color: 'white',
    fontSize: 24,
    paddingVertical: 5
  },
  sectionTitleText: {
    color: 'white',
    fontSize: 18,
    paddingVertical: 5
  },
  row: {
    overflow: 'hidden',
    paddingHorizontal: 10,
    height: ROW_HEIGHT,
    borderColor: '#000',
    borderBottomWidth: 1,
    justifyContent: 'center'
  },
  rowText: {
    fontSize: 20
  }
});

export default ItemDetails;
