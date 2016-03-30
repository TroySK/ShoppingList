'use strict';

import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View,
  StatusBar,
  ScrollView
} from 'react-native';

import ScrollableTabView from 'react-native-scrollable-tab-view';
import LinearGradient from 'react-native-linear-gradient';
import TabBar from './components/TabBar.js';
import TabSwiper from './components/TabSwiper.js';
import TabSettings from './components/TabSettings.js';
import TabList from './components/TabList.js';

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
      <LinearGradient style={{flex: 1}} colors={[ '#055266', '#0b044a']}>
        <StatusBar barStyle="light-content"/>
        <ScrollableTabView style={styles.container} initialPage={1} renderTabBar={() => <TabBar/>} locked={this.state.swipingInProgress}>
          <View tabLabel="shopsettings" style={styles.tabHeader}>
            <TabSettings/>
          </View>
          <View tabLabel="shoppinglist" style={[styles.tabHeader]}>
            <TabSwiper style={styles.swiper} onSwiping={this.handleSwiping.bind(this)} />
          </View>
          <View tabLabel="thelist" style={styles.tabHeader}>
            <ScrollView>
              <TabList />
            </ScrollView>
          </View>
        </ScrollableTabView>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
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
