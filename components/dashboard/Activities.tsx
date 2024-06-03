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
  margin-top: 30px;
  gap: 20px;
`;

const ActivityInnerContainer = styled.View`
  align-items: center;
`;
/* design for button of module and games in main dashboard*/
const ActivityItem = styled(TouchableRipple)<{color: string}>`
  background-color: ${props => props.color};
  padding: 10px;
  border-radius: 40px;
  margin-bottom: 10px;

  align-items: center;
  justify-content: center;
  border: 2px solid #ffa500;
  height: 250px
  width: 300px;
  padding: 20px;
  
`;

const StyledImage = styled.Image`
  width: 100px;
  height: 100px;
`;

type ActivityNavigationProps = StackNavigationProp<RootStackParamList>;

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
      <ActivityItem
        color="#92d1f0"
        onPress={() => {
          navigate.navigate('Game');
        }}>
        <ActivityInnerContainer>
          <StyledImage
            source={require('../../assets/images/game-controller.png')}
          />
          <Text style={{marginTop: 3}} variant="titleLarge">
            Duwa
          </Text>
          <Text variant="bodySmall">(Game)</Text>
        </ActivityInnerContainer>
      </ActivityItem>
    </ActivityContainer>
  );
};

export default Activities;