import React from 'react';
import styled from '@emotion/native';
import { Dimensions, ImageBackground, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import UserDetail from '@components/dashboard/UserDetail';
import Activities from '@components/dashboard/Activities';
import { Gologin } from 'types';
import { StackNavigationProp } from '@react-navigation/stack';

interface ContainerProps {
  isMobile: boolean;
}

// Define your background image source
const backgroundImage = require('./../assets/images/logoo.png');
const headerImage = require('./../assets/images/logog2.png');
const logoutButtonImage = require('./../assets/images/log.png');

const Container = styled(ImageBackground)<ContainerProps>`
  flex: 1;
  justify-content: ${props => (props.isMobile ? 'flex-end' : 'center')};
  align-items: center;
`;

const InnerContainer = styled.View<ContainerProps>`
  background-color: #FFF2D7;
  width: ${props => (props.isMobile ? '100%' : '80vh')};
  max-width: ${props => (props.isMobile ? '100%' : 1000)};
  border-top-left-radius: 50px;
  border-top-right-radius: 50px;
  border-bottom-left-radius: ${props => (props.isMobile ? 0 : 50)}px;
  border-bottom-right-radius: ${props => (props.isMobile ? 0 : 50)}px;
  align-items: ${props => (props.isMobile ? 'center' : 'flex-start')};
  padding: 50px;
`;

const HeaderImage = styled.Image`
  width: 520px; /* Adjust width as needed */
  height: 230px; /* Adjust height as needed */


`;

const HeaderContainer = styled.View`
  
  top: 30px;
`;

const LogoutButton = styled.TouchableOpacity`
  position: absolute;
  top: 20px;
  right: 30px;
`;

const LogoutButtonImage = styled.Image`
  width: 24px; /* Adjust width as needed */
  height: 24px; /* Adjust height as needed */
`;

const Dashboard = () => {
  const navigation = useNavigation<Gologin>();

  const width = Dimensions.get('window').width;
  const isMobile = width < 768;

  const handleLogout = () => {
    // Navigate to the login page
    navigation.navigate('Login');
  };

  return (
    <Container source={backgroundImage} isMobile={isMobile}>
      <HeaderContainer>
        <HeaderImage source={headerImage} />
      </HeaderContainer>
      <InnerContainer isMobile={isMobile}>
        {/* Logout Button */}
        <LogoutButton onPress={handleLogout}>
          <LogoutButtonImage source={logoutButtonImage} />
        </LogoutButton>
        <UserDetail />
        <Activities />
      </InnerContainer>
    </Container>
  );
};

export default Dashboard;
