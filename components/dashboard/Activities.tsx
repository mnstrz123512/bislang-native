/* eslint-disable react-native/no-inline-styles */
import styled from '@emotion/native';
import React from 'react';
import {Text, TouchableRipple} from 'react-native-paper';
import {Dimensions} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from 'types';

interface ContainerProps {
  isMobile: boolean;
}
const ActivityContainer = styled.View<ContainerProps>`
  flex-direction: ${props => (props.isMobile ? 'column' : 'row')};
  flex-wrap: wrap;
  justify-content: space-around;
  margin-top: 20px;
  gap: 20px;
`;

const ActivityInnerContainer = styled.View`
  align-items: center;
`;

const ActivityItem = styled(TouchableRipple)<{color: string}>`
  background-color: ${props => props.color};
  padding: 10px;
  border-radius: 10px;
  margin-bottom: 10px;

  align-items: center;
  justify-content: center;

  height: 250px
  width: 250px;
  padding: 20px;
`;

const StyledImage = styled.Image`
  width: 100px;
  height: 100px;
`;

type ActivityNavigationProps = StackNavigationProp<
  RootStackParamList,
  'Module'
>;

const Activities = () => {
  const navigate = useNavigation<ActivityNavigationProps>();
  const width = Dimensions.get('window').width;

  const isMobile = width < 768;

  return (
    <ActivityContainer isMobile={isMobile}>
      <ActivityItem
        color="#BAD795"
        onPress={() => {
          navigate.navigate('Module');
        }}>
        <ActivityInnerContainer>
          <StyledImage source={require('../../assets/images/book-stack.png')} />
          <Text style={{marginTop: 20}} variant="titleLarge">
            Modyul
          </Text>
          <Text variant="bodySmall">(Module)</Text>
        </ActivityInnerContainer>
      </ActivityItem>
      <ActivityItem color="#BAD795">
        <ActivityInnerContainer>
          <StyledImage
            source={require('../../assets/images/game-controller.png')}
          />
          <Text style={{marginTop: 20}} variant="titleLarge">
            Dula
          </Text>
          <Text variant="bodySmall">(Game)</Text>
        </ActivityInnerContainer>
      </ActivityItem>
    </ActivityContainer>
  );
};

export default Activities;
