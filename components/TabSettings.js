/*
 * This example demonstrates how to use ParallaxScrollView within a ScrollView component.
 */
import React, {
  Component,
  Dimensions,
  Image,
  ListView,
  PixelRatio,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import ParallaxScrollView from 'react-native-parallax-scroll-view';

class TabSettings extends Component {
  constructor(props) {
    super(props);
    this.state =  {
      dataSource: new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2
      }).cloneWithRows([
        'Shop Settings',
        'App Settings'
      ])
    };
  }

  render() {
    const { onScroll = () => {} } = this.props;
    return (
      <ParallaxScrollView
          ref="ParallaxView"
          onScroll={onScroll}

          headerBackgroundColor="#333"
          stickyHeaderHeight={ STICKY_HEADER_HEIGHT }
          parallaxHeaderHeight={ PARALLAX_HEADER_HEIGHT }
          backgroundSpeed={10}

          renderBackground={() => (
            <View key="background">
              <Image source={require('./../assets/images/cover.png')}
                     style={{width: window.width,
                             height: PARALLAX_HEADER_HEIGHT}}/>
              <View style={{position: 'absolute',
                            top: 0,
                            width: window.width,
                            backgroundColor: 'rgba(0,0,0,.4)',
                            height: PARALLAX_HEADER_HEIGHT}}/>
            </View>
          )}

          renderForeground={() => (
            <View key="parallax-header" style={ styles.parallaxHeader }>
              <Image style={ [styles.avatar,
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

          renderFixedHeader={() => (
            <View key="fixed-header" style={styles.fixedSection}>
              <Text style={styles.fixedSectionText}
                    onPress={() => this.refs.ParallaxView.scrollTo({ x: 0, y: 0 })}>
                Scroll to top
              </Text>
            </View>
          )}>
        <ListView
            style={styles.container}
            dataSource={ this.state.dataSource }
            renderRow={(rowData) => (
              <View key={rowData} style={ styles.row }>
                <Text style={ styles.rowText }>
                  { rowData }
                </Text>
              </View>
             )}/>
    </ParallaxScrollView>
    );
  }
}

const window = Dimensions.get('window');

const AVATAR_SIZE = 90;
const ROW_HEIGHT = 60;
const PARALLAX_HEADER_HEIGHT = 300;
const STICKY_HEADER_HEIGHT = 0;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black'
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: window.width,
    height: PARALLAX_HEADER_HEIGHT
  },
  stickySection: {
    height: STICKY_HEADER_HEIGHT,
    width: 300,
    justifyContent: 'flex-end'
  },
  stickySectionText: {
    color: 'white',
    fontSize: 20,
    margin: 10
  },
  fixedSection: {
    position: 'absolute',
    bottom: 10,
    right: 10
  },
  fixedSectionText: {
    color: '#999',
    fontSize: 20
  },
  parallaxHeader: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'column',
    paddingTop: 100
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
    backgroundColor: 'white',
    borderColor: '#ccc',
    borderBottomWidth: 1,
    justifyContent: 'center'
  },
  rowText: {
    fontSize: 20
  }
});

export default TabSettings;
