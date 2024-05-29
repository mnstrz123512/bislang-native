import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import List from './List';
import ModuleProvider from './Provider';
import {ModuleStackParamList} from 'types';
import PageList from './PageList';
import {StackNavigationProp} from '@react-navigation/stack';
import Page from './Page';
import SoundButton from '@components/SoundButton';

const ModuleStack = createNativeStackNavigator<ModuleStackParamList>();

type ModuleNavigatorProps = StackNavigationProp<ModuleStackParamList>;

const ModuleNavigator = () => (
  <ModuleProvider>
    <ModuleStack.Navigator>
      <ModuleStack.Screen
        name="List"
        component={List}
        options={{
          headerTitle: 'Modules',
        }}
      />
      <ModuleStack.Screen
        name="PageList"
        component={PageList}
        options={({route}) => ({
          title: route.params.screenOptions?.title,
        })}
      />
      <ModuleStack.Screen
        name="Page"
        component={Page}
        options={({route}) => ({
          title: route.params.screenOptions?.title,
          ...(route.params.audio && {
            headerRight: () => <SoundButton soundUrl={route.params.audio} />,
          }),
        })}
      />
    </ModuleStack.Navigator>
  </ModuleProvider>
);

export default ModuleNavigator;

export type {ModuleNavigatorProps};
