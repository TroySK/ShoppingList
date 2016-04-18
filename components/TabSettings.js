/*
 * This example demonstrates how to use ParallaxScrollView within a ScrollView component.
 */
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

import ModalSettings from './ModalSettings.js';

class TabSettings extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { onScroll = () => {} } = this.props;
    return (
      <ScrollView style={{margin: 10}}>
        <View style={{flexDirection: 'row', padding: 5}}>
          <Text style={{flex:1, backgroundColor: 'rgba(0,0,0,0)', paddingLeft: 5, color: 'rgba(255, 255, 255, 1)', fontWeight: '700'}}>Stores</Text>
          <Text style={{flex:1, backgroundColor: 'rgba(0,0,0,0)', textAlign: 'right', paddingRight: 5, color: 'rgba(255, 255, 255, 0.4)'}}>FlipKart</Text>
        </View>
        <View style={{backgroundColor: 'rgba(255, 255, 255, 1)', padding: 0, margin: 5, borderRadius: 4, shadowColor: 'rgba(0,0,0,0.4)', shadowOffset: {width:1,height:1}, shadowOpacity: 1}}>
          <View style={{flex:1, flexDirection: 'row', padding: 5}}>
            <Text style={{fontSize: 16, flex: 1, color: 'rgba(0,0,0,0.8)'}}>FlipKart</Text>
            <Text style={{color: '#4de4bf'}}>Input</Text>
          </View>
          <View style={{borderTopWidth: 1, borderColor: 'rgba(0,0,0,0.2)', flex:1, flexDirection: 'row', padding: 5}}>
          <Text style={{fontSize: 16, flex: 1, color: 'rgba(0,0,0,0.8)'}}>Amazon</Text>
          <Text style={{color: 'rgba(0,0,0,0.2)'}}>Coming Soon</Text>
          </View>
        </View>
        <View style={{backgroundColor: 'rgba(0,0,0,0)', margin: 5}}>
          <Text style={{fontSize: 10, color: 'rgba(255,255,255,0.2)'}}>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</Text>
        </View>
        <View style={{flexDirection: 'row', padding: 5}}>
          <Text style={{backgroundColor: 'rgba(0,0,0,0)', paddingLeft: 5, color: 'rgba(255, 255, 255, 1)', fontWeight: '700'}}>Show Me</Text>
          <Text style={{flex:1, backgroundColor: 'rgba(0,0,0,0)', textAlign: 'right', paddingRight: 5, color: 'rgba(255, 255, 255, 0.4)'}}>Electronics, Apparel and more</Text>
        </View>
        <View style={{backgroundColor: 'rgba(255, 255, 255, 1)', padding: 0, margin: 5, borderRadius: 4, shadowColor: 'rgba(0,0,0,0.4)', shadowOffset: {width:1,height:1}, shadowOpacity: 1}}>
          <View style={{flex:1, flexDirection: 'row', padding: 5}}>
            <Text style={{fontSize: 16, flex: 1, color: 'rgba(0,0,0,0.8)'}}>Electronics</Text>
            <Text style={{color: '#4de4bf'}}>Input</Text>
          </View>
          <View style={{borderTopWidth: 1, borderColor: 'rgba(0,0,0,0.2)', flex:1, flexDirection: 'row', padding: 5}}>
            <Text style={{fontSize: 16, flex: 1, color: 'rgba(0,0,0,0.8)'}}>Fashion</Text>
            <Text style={{color: '#4de4bf'}}>Input</Text>
          </View>
          <View style={{borderTopWidth: 1, borderColor: 'rgba(0,0,0,0.2)', flex:1, flexDirection: 'row', padding: 5}}>
            <Text style={{fontSize: 16, flex: 1, color: 'rgba(0,0,0,0.8)'}}>Furniture</Text>
            <Text style={{color: '#e54a08'}}>Input</Text>
          </View>
          <View style={{borderTopWidth: 1, borderColor: 'rgba(0,0,0,0.2)', flex:1, flexDirection: 'row', padding: 5}}>
            <Text style={{fontSize: 16, flex: 1, color: 'rgba(0,0,0,0.8)'}}>Destinations</Text>
            <Text style={{color: '#4de4bf'}}>Input</Text>
          </View>
          <View style={{borderTopWidth: 1, borderColor: 'rgba(0,0,0,0.2)', flex:1, flexDirection: 'row', padding: 5}}>
            <Text style={{color: '#4de4bf'}}>+ Add Another Category</Text>
          </View>
        </View>
        <View style={{flexDirection: 'row', padding: 5}}>
          <Text style={{backgroundColor: 'rgba(0,0,0,0)', paddingLeft: 5, color: 'rgba(255, 255, 255, 1)', fontWeight: '700'}}>Price Range</Text>
          <Text style={{flex:1, backgroundColor: 'rgba(0,0,0,0)', textAlign: 'right', paddingRight: 5, color: 'rgba(255, 255, 255, 0.4)'}}>500 - 5000</Text>
        </View>
        <View style={{backgroundColor: 'rgba(255, 255, 255, 1)', padding: 0, margin: 5, borderRadius: 4, shadowColor: 'rgba(0,0,0,0.4)', shadowOffset: {width:1,height:1}, shadowOpacity: 1}}>
          <View style={{flex:1, flexDirection: 'row', padding: 5}}>
            <Text style={{color: '#4de4bf'}}>Range Selector</Text>
          </View>
        </View>
        <View style={{backgroundColor: 'rgba(0,0,0,0)', margin: 5}}>
          <Text style={{fontSize: 10, color: 'rgba(255,255,255,0.2)'}}>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</Text>
        </View>
      </ScrollView>
    );
  }
}


export default TabSettings;
