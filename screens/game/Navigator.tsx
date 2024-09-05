import React from 'react';
import { Image, View, Text, StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TypeList from './TypeList';
import ModuleProvider from './Provider';
import { GameStackParamList } from 'types';
import { StackNavigationProp } from '@react-navigation/stack';
import List from './List';
import Game from './Game';

// Import the logo image
const logo = require('../../assets/images/juan.png');

const ModuleStack = createNativeStackNavigator<GameStackParamList>();

type GameNavigatorProps = StackNavigationProp<GameStackParamList>;

// Define a type for the props of the LogoTitle component
type LogoTitleProps = {
  title?: string;
};

const LogoTitle: React.FC<LogoTitleProps> = ({ title }) => (
  <View style={styles.headerContainer}>
    <Image source={logo} style={styles.logo} />
    {title && <Text style={styles.title}>{title}</Text>}
  </View>
);

const GameNavigator = () => (
  <ModuleProvider>
    <ModuleStack.Navigator>
      <ModuleStack.Screen
        name="TypeList"
        component={TypeList}
        options={{
          headerTitle: () => <LogoTitle title="Game (Duwa)" />,
        }}
      />
      <ModuleStack.Screen
        name="List"
        component={List}
        options={{
          headerTitle: () => <LogoTitle title="Game (Duwa)" />,
        }}
      />
      <ModuleStack.Screen
        name="PlayGame"
        component={Game}
        options={{
          headerTitle: () => <LogoTitle title="Game (Duwa)" />,
        }}
      />
    </ModuleStack.Navigator>
  </ModuleProvider>
);

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 30, // Adjust the size as needed
    height: 30,
    marginRight: 7,
  },
  title: {
    fontSize: 15, // Adjust the size as needed
  },
});

export default GameNavigator;

export type { GameNavigatorProps };
