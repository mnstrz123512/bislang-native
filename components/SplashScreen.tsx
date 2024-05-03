import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {View, Text, ActivityIndicator} from 'react-native';
import {RootStackParamList} from 'types';
import {StackNavigationProp} from '@react-navigation/stack';
import {useAuth} from './authentication/Provider';

type SplashScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'SplashScreen'
>;
const SplashScreen = () => {
  const {loadAuth, isAuthenticated} = useAuth();
  const navigate = useNavigation<SplashScreenNavigationProp>();

  useEffect(() => {
    loadAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      navigate.navigate('Dashboard');
    } else {
      navigate.navigate('Login');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <ActivityIndicator size="large" color="#0000ff" />
      <Text>Loading...</Text>
    </View>
  );
};

export default SplashScreen;
