import React, {
  Component,
  Dimensions,
  Image,
  PixelRatio,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Switch
} from 'react-native';

import MultiSlider from 'react-native-multi-slider';


class TabSettings extends Component {
  constructor(props) {
    super(props);
  }

  handlePress (pressed) {
    this.props.onMultiSliderPress(pressed);
  }

  render() {
    const { onScroll = () => {} } = this.props;
    return (
      <View style={{margin: 10}}>
        <View style={{flexDirection: 'row', padding: 5}}>
          <Text style={{flex:1, backgroundColor: 'rgba(0,0,0,0)', paddingLeft: 5, color: 'rgba(255, 255, 255, 1)', fontWeight: '700'}}>Stores</Text>
          <Text style={{flex:1, backgroundColor: 'rgba(0,0,0,0)', textAlign: 'right', paddingRight: 5, color: 'rgba(255, 255, 255, 0.4)'}}>FlipKart</Text>
        </View>

        <View style={{backgroundColor: 'rgba(255, 255, 255, 1)', padding: 0, margin: 5, borderRadius: 4, shadowColor: 'rgba(0,0,0,0.4)', shadowOffset: {width:1,height:1}, shadowOpacity: 1}}>
          <View style={{flex:1, flexDirection: 'row', padding: 5, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{fontSize: 16, flex: 1, color: 'rgba(0,0,0,0.8)'}}>FlipKart</Text>
            <Switch onValueChange={(value) => console.info('do something')} value={true} onTintColor='#4de4bf' tintColor='#e54a08'/>
          </View>
          <View style={{borderTopWidth: 1, borderColor: 'rgba(0,0,0,0.2)', flex:1, flexDirection: 'row', padding: 5, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{fontSize: 16, flex: 1, color: 'rgba(0,0,0,0.4)'}}>Amazon</Text>
          <Switch onValueChange={(value) => console.info('do something')} value={false} disabled={true} />
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
          <View style={{flex:1, flexDirection: 'row', padding: 5, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{fontSize: 16, flex: 1, color: 'rgba(0,0,0,0.8)'}}>Electronics</Text>
            <Switch onValueChange={(value) => console.info('do something')} value={true} onTintColor='#4de4bf' tintColor='#e54a08'/>
          </View>
          <View style={{borderTopWidth: 1, borderColor: 'rgba(0,0,0,0.2)', flex:1, flexDirection: 'row', padding: 5, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{fontSize: 16, flex: 1, color: 'rgba(0,0,0,0.8)'}}>Fashion</Text>
            <Switch onValueChange={(value) => console.info('do something')} value={false} onTintColor='#4de4bf' tintColor='#e54a08'/>
          </View>
          <View style={{borderTopWidth: 1, borderColor: 'rgba(0,0,0,0.2)', flex:1, flexDirection: 'row', padding: 5, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{fontSize: 16, flex: 1, color: 'rgba(0,0,0,0.8)'}}>Furniture</Text>
            <Switch onValueChange={(value) => console.info('do something')} value={true} onTintColor='#4de4bf' tintColor='#e54a08'/>
          </View>
          <View style={{borderTopWidth: 1, borderColor: 'rgba(0,0,0,0.2)', flex:1, flexDirection: 'row', padding: 5, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{fontSize: 16, flex: 1, color: 'rgba(0,0,0,0.8)'}}>Destinations</Text>
            <Switch onValueChange={(value) => console.info('do something')} value={true} onTintColor='#4de4bf' tintColor='#e54a08'/>
          </View>
          <View style={{borderTopWidth: 1, borderColor: 'rgba(0,0,0,0.2)', flex:1, flexDirection: 'row', padding: 5, justifyContent: 'space-between', alignItems: 'center'}}>
            <Text style={{color: '#4de4bf', marginTop: 5, marginBottom: 5, fontSize: 16}}>+ Add Another Category</Text>
          </View>
        </View>
        <View style={{flexDirection: 'row', padding: 5}}>
          <Text style={{backgroundColor: 'rgba(0,0,0,0)', paddingLeft: 5, color: 'rgba(255, 255, 255, 1)', fontWeight: '700'}}>Price Range</Text>
          <Text style={{flex:1, backgroundColor: 'rgba(0,0,0,0)', textAlign: 'right', paddingRight: 5, color: 'rgba(255, 255, 255, 0.4)'}}>500 - 5000</Text>
        </View>
        <View style={{backgroundColor: 'rgba(255, 255, 255, 1)', padding: 0, margin: 5, borderRadius: 4, shadowColor: 'rgba(0,0,0,0.4)', shadowOffset: {width:1,height:1}, shadowOpacity: 1}}>
          <View style={{flex:1, flexDirection: 'row', padding: 5, justifyContent: 'center'}}>
          <MultiSlider values={[3,7]} sliderLength={280} selectedStyle={{backgroundColor: '#4de4bf'}} unselectedStyle={{backgroundColor: 'rgba(182, 182, 182, 1)'}}             trackStyle={{ height:1, borderRadius: 2}} markerStyle={{height: 28, width: 28, borderRadius: 50, backgroundColor: 'rgba(255, 255, 255, 1)', borderWidth: 0.5, borderColor: 'rgba(0,0,0,0.1)', shadowColor: 'rgba(0,0,0,0.05)', shadowOffset: {height: 3, width: 3}, shadowRadius: 3}} onValuesChangeStart={this.handlePress.bind(this, true)} onValuesChangeFinish={this.handlePress.bind(this, false)}/>
          </View>
        </View>
        <View style={{backgroundColor: 'rgba(0,0,0,0)', margin: 5}}>
          <Text style={{fontSize: 10, color: 'rgba(255,255,255,0.2)'}}>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</Text>
        </View>
      </View>
    );
  }
}


export default TabSettings;
