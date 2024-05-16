import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TypeList from './TypeList';
import ModuleProvider from './Provider';
import {GameStackParamList} from 'types';
import {StackNavigationProp} from '@react-navigation/stack';
import List from './List';
import Game from './Game';

const ModuleStack = createNativeStackNavigator<GameStackParamList>();

type GameNavigatorProps = StackNavigationProp<GameStackParamList>;

const GameNavigator = () => (
  <ModuleProvider>
    <ModuleStack.Navigator>
      <ModuleStack.Screen
        name="TypeList"
        component={TypeList}
        options={{
          headerTitle: 'Duwa',
        }}
      />

      <ModuleStack.Screen
        name="List"
        component={List}
        options={{
          headerTitle: 'Duwa',
        }}
      />

      <ModuleStack.Screen
        name="PlayGame"
        component={Game}
        options={{
          headerTitle: '',
        }}
      />
    </ModuleStack.Navigator>
  </ModuleProvider>
);

export default GameNavigator;

export type {GameNavigatorProps};
