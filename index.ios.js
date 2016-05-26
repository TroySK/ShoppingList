'use strict';

import React, {
  AppRegistry,
  Component,
} from 'react-native';

import ShoppingListMain from './components/Main.js';

class ShoppingList extends Component {

  render() {
    return (
      <ShoppingListMain />
    );
  }
}

AppRegistry.registerComponent('ShoppingList', () => ShoppingList);
