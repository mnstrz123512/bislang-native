import React from 'react';
import styled from '@emotion/native';
import { Dimensions, ImageBackground, Image } from 'react-native';
import UserDetail from '@components/dashboard/UserDetail';
import Activities from '@components/dashboard/Activities';

interface ContainerProps {
  isMobile: boolean;
}

// Define your background image source
const backgroundImage = require('./../assets/images/rens.png');
const headerImage = require('./../assets/images/hihi.png');

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
  width: 500px; /* Adjust width as needed */
  height: 300px; /* Adjust height as needed */
  
  top: 25px; 
`;

const Dashboard = () => {
  const width = Dimensions.get('window').width;

  const isMobile = width < 768;

  return (
    <Container 
      source={backgroundImage} // Set the background image source here
      isMobile={isMobile}
    >
      <HeaderImage source={headerImage} />
      <InnerContainer isMobile={isMobile}>
        <UserDetail />
        <Activities />
      </InnerContainer>
    </Container>
  );
};

export default Dashboard;
