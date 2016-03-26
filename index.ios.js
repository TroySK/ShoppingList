'use strict';

import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View
} from 'react-native';

import ScrollableTabView from 'react-native-scrollable-tab-view';
import TabBar from './components/TabBar.js';

class ShoppingList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      swipingInProgress: false,
    };
  }
  render() {
    return (
      <ScrollableTabView style={styles.container} initialPage={1} renderTabBar={() => <TabBar/>} locked={!this.state.swipingInProgress}>
        <View tabLabel="settings" style={styles.tabHeader}>
          <Text>Hello</Text>
        </View>
        <View tabLabel="images" style={[styles.tabHeader, styles.tabHome]}>
          <Text>Bolo</Text>
        </View>
        <View tabLabel="chatboxes" style={styles.tabHeader}>
          <Text>Kuch</Text>
        </View>
      </ScrollableTabView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#e1eef6',
    marginTop: 20
  },
  tabHeader: {
    flex: 1
  },
  tabHome: {

  },
  swiper: {
    flex: 1,
  }
});

AppRegistry.registerComponent('ShoppingList', () => ShoppingList);
