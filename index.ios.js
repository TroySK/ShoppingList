'use strict';

import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View,
  StatusBar
} from 'react-native';

import ScrollableTabView from 'react-native-scrollable-tab-view';
import TabBar from './components/TabBar.js';
import TabSwiper from './components/TabSwiper.js';

class ShoppingList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      swipingInProgress: false,
    };
  }
  handleSwiping(status) {
    this.setState({
      swipingInProgress: status
    });
  }
  render() {
    return (
      <View style={{flex: 1}}>
        <StatusBar hidden={true} />
        <ScrollableTabView style={styles.container} initialPage={1} renderTabBar={() => <TabBar/>} locked={this.state.swipingInProgress}>
          <View tabLabel="shopsettings" style={styles.tabHeader}>
            <Text>Hello</Text>
          </View>
          <View tabLabel="shoppinglist" style={[styles.tabHeader, styles.tabHome]}>
            <TabSwiper style={styles.swiper} onSwiping={this.handleSwiping.bind(this)} />
          </View>
          <View tabLabel="thelist" style={styles.tabHeader}>
            <Text>Kuch</Text>
          </View>
        </ScrollableTabView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
    marginTop: 0
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
