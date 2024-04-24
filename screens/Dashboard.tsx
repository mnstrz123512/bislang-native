import React from 'react';
import styled from '@emotion/native';
import {Dimensions} from 'react-native';
import UserDetail from '@components/dashboard/UserDetail';
import Activities from '@components/dashboard/Activities';

interface ContainerProps {
  isMobile: boolean;
}
const Container = styled.View<ContainerProps>`
  background-color: #ffa500;
  flex: 1;
  justify-content: ${props => (props.isMobile ? 'flex-end' : 'center')};
  align-items: center;
`;

const InnerContainer = styled.View<ContainerProps>`
  background-color: #f6f8f6;
  width: ${props => (props.isMobile ? '100%' : '80vh')};
  max-width: ${props => (props.isMobile ? '100%' : 1000)};
  border-top-left-radius: 50px;
  border-top-right-radius: 50px;
  border-bottom-left-radius: ${props => (props.isMobile ? 0 : 50)}px;
  border-bottom-right-radius: ${props => (props.isMobile ? 0 : 50)}px;
  align-items: ${props => (props.isMobile ? 'center' : 'flex-start')};
  padding: 50px;
`;

const Dashboard = () => {
  const width = Dimensions.get('window').width;

  const isMobile = width < 768;

  return (
    <Container isMobile={isMobile}>
      <InnerContainer isMobile={isMobile}>
        <UserDetail />
        <Activities />
      </InnerContainer>
    </Container>
  );
};

export default Dashboard;
