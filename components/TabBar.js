import React, {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated,
  Image
} from 'react-native';

var TabBar = React.createClass({

  propTypes: {
    goToPage: React.PropTypes.func,
    activeTab: React.PropTypes.number,
    tabs: React.PropTypes.array
  },

  renderTabOption(name, page) {
    var isTabActive = this.props.activeTab === page;
    var images = {
      'shopsettings': require('image!settings'),
      'shoppinglist': require('image!home'),
      'thelist': require('image!cart')
    };
    return (
      <TouchableOpacity key={name} onPress={() => this.props.goToPage(page)} style={styles.tab}>
        <Image source={images[name]} style={{alignSelf: (name == 'shopsettings' ? 'flex-start' : (name == 'thelist' ? 'flex-end' : 'center')), marginLeft: 25, marginRight: 25, opacity: (isTabActive ? 1 : 0.5)}} />
      </TouchableOpacity>
    );
  },

  render() {
    var containerWidth = this.props.containerWidth;
    var numberOfTabs = this.props.tabs.length;
    var tabUnderlineStyle = {
      position: 'absolute',
      width: containerWidth / numberOfTabs,
      height: 2,
      backgroundColor: 'rgba(0,0,0,0.2)',
      bottom: 0,
    };

    var left = this.props.scrollValue.interpolate({
      inputRange: [0, 1], outputRange: [0, containerWidth / numberOfTabs]
    });

    return (
      <View style={{backgroundColor: 'rgba(0,0,0,0.2)'}}>
        <View style={[styles.tabs, this.props.style]}>
          {this.props.tabs.map((tab, i) => this.renderTabOption(tab, i))}
        </View>
        <Animated.View style={[tabUnderlineStyle, {left}]} />
      </View>
    );
  },
});

var styles = StyleSheet.create({
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 10,
  },
  tabs: {
    height: 65,
    flexDirection: 'row',
    paddingTop: 25,
  },
});

module.exports = TabBar;
