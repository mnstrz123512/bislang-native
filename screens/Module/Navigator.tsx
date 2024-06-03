import React from 'react';
import { Image, View, Text, StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import List from './List';
import ModuleProvider from './Provider';
import { ModuleStackParamList } from 'types';
import PageList from './PageList';
import { StackNavigationProp } from '@react-navigation/stack';
import Page from './Page';
import SoundButton from '@components/SoundButton';

// Import the logo image
const logo = require('../../assets/images/juan.png');

const ModuleStack = createNativeStackNavigator<ModuleStackParamList>();

type ModuleNavigatorProps = StackNavigationProp<ModuleStackParamList>;

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

const ModuleNavigator = () => (
  <ModuleProvider>
    <ModuleStack.Navigator
      screenOptions={{
        headerTitle: () => <LogoTitle title="Module" />,
      }}>
      <ModuleStack.Screen
        name="List"
        component={List}
      />
      <ModuleStack.Screen
        name="PageList"
        component={PageList}
        options={({ route }) => ({
          headerTitle: () => <LogoTitle title={route.params.screenOptions?.title} />,
        })}
      />
      <ModuleStack.Screen
        name="Page"
        component={Page}
        options={({ route }) => ({
          headerTitle: () => <LogoTitle title={route.params.screenOptions?.title} />,
          headerRight: () => {
            if (route.params.audio) {
              return <SoundButton soundUrl={route.params.audio} />;
            }
            return null;
          },
        })}
      />
    </ModuleStack.Navigator>
  </ModuleProvider>
);

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // Adjust as needed
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

export default ModuleNavigator;

export type { ModuleNavigatorProps };
