import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import List from './List';
import ModuleProvider from './Provider';
import {ModuleStackParamList} from 'types';
import SubModule from './SubModule';
import {StackNavigationProp} from '@react-navigation/stack';

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
        name="SubModule"
        component={SubModule}
        options={({route}) => ({
          title: route.params.screenOptions?.title || 'Sub Module',
        })}
      />
    </ModuleStack.Navigator>
  </ModuleProvider>
);

export default ModuleNavigator;

export type {ModuleNavigatorProps};
