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
} from 'react-native';

import ParallaxView from 'react-native-parallax-view';
import ModalSettings from './ModalSettings.js';

class TabSettings extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { onScroll = () => {} } = this.props;
    return (
      <ParallaxView
        backgroundSource={require('./../assets/images/cover.png')}
        windowHeight={window.width}
        style={{opacity:0.8, backgroundColor: 'rgba(0,0,0,0)'}}
        header={(
          <View style={ styles.parallaxHeader }>
            <Image style={[styles.avatar,
                           {width: AVATAR_SIZE, height: AVATAR_SIZE}] }
                   source={require('./../assets/images/ShoppingList.png')} />
            <Text style={ styles.sectionSpeakerText }>
              Shopping List
            </Text>
            <Text style={ styles.sectionTitleText }>
              get your shortlisting done!
            </Text>
          </View>
        )}
        scrollableViewStyle={{ backgroundColor: 'rgba(0,0,0,0)' }}
    >
      <View>
        <ModalSettings style={ styles.row } title="Shop Settings">
          <Text>This is the Shop Settings Modal</Text>
        </ModalSettings>
        <ModalSettings style={ styles.row } title="App Settings">
          <Text>This is the App Settings Modal</Text>
        </ModalSettings>
      </View>
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

export default TabSettings;
