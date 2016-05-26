'use strict';

import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View,
  StatusBar,
  ScrollView,
  AsyncStorage
} from 'react-native';

import ScrollableTabView from 'react-native-scrollable-tab-view';
import LinearGradient from 'react-native-linear-gradient';
import TabBar from './TabBar.js';
import TabSwiper from './TabSwiper.js';
import TabSettings from './TabSettings.js';
import TabList from './TabList.js';

class ShoppingListMain extends Component {
  constructor(props) {
    super(props);
    this.state = {
      swipingInProgress: false,
    };
    AsyncStorage.setItem('app_name', 'Shopping List');
    AsyncStorage.setItem('stores', JSON.stringify([
      { "FlipKart" : true },
      { "Amazon" : false }
    ]));
    AsyncStorage.setItem('categories', JSON.stringify([
      { "Electronics" : true },
      { "Fashion" : false },
      { "Furniture" : true }
    ]));
  }
  handleSwiping(status) {
    this.setState({
      swipingInProgress: status
    });
  }
  render() {
    return (
      <LinearGradient style={{flex: 1}} colors={['#035A69', '#0F325C', '#0D064A']}>
        <StatusBar barStyle="light-content"/>
        <ScrollableTabView style={styles.container} initialPage={1} renderTabBar={() => <TabBar/>} locked={this.state.swipingInProgress}>
          <ScrollView tabLabel="shopsettings">
            <TabSettings onMultiSliderPress={this.handleSwiping.bind(this)}/>
          </ScrollView>
          <View tabLabel="shoppinglist" style={{flex: 1}}>
            <TabSwiper style={styles.swiper} onSwiping={this.handleSwiping.bind(this)} />
          </View>
          <ScrollView tabLabel="thelist">
            <TabList />
          </ScrollView>
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
  tabHome: {

  },
  swiper: {
    flex: 1,
  }
});

export default ShoppingListMain;
