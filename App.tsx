import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {NavigationContainer} from '@react-navigation/native';
import Login from './screens/Login';
import Dashboard from './screens/Dashboard';
import {RootStackParamList} from './types';
import Modules from '@screens/Modules';
import {PaperProvider} from 'react-native-paper';

const Stack = createNativeStackNavigator<RootStackParamList>();

function App(): React.JSX.Element {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Login"
            component={Login}
            options={{
              headerShown: false,
            }}
          />

          <Stack.Screen
            name="Dashboard"
            component={Dashboard}
            options={{
              headerShown: false,
            }}
          />

          <Stack.Screen name="Module" component={Modules} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

export default App;
