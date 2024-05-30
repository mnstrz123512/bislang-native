import React from 'react';
import styled from '@emotion/native';
import {Dimensions, Image} from 'react-native';
import LoginForm from '../components/authentication/LoginForm';

interface ContainerProps {
  isMobile: boolean;
}
//null-size
const StyledImage = styled.Image`
`;
const Container = styled.View((props: ContainerProps) => ({
  backgroundColor: '#FFA500',
  flex: 1,
  justifyContent: props.isMobile ? 'flex-end' : 'center',
  alignItems: 'center',
}));

const InnerContainer = styled.View((props: ContainerProps) => ({
  backgroundColor: '#F6F8F6',
  width: '100%',
  maxWidth: props.isMobile ? '100%' : 500,
  borderTopLeftRadius: 50,
  borderTopRightRadius: 50,
  borderBottomLeftRadius: props.isMobile ? 0 : 50,
  borderBottomRightRadius: props.isMobile ? 0 : 50,
  alignItems: 'center', // Center the image horizontally
  justifyContent: 'center',
  padding: 50,
}));

const HeaderText = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: #333;
  margin-bottom: 30px;
`;


const Login = () => {
  const width = Dimensions.get('window').width;

  const isMobile = width < 768;

  return (
    
    <Container isMobile={isMobile}>
      <StyledImage
            source={require('./../assets/images/tane.png')}
          />

      <InnerContainer isMobile={isMobile}>
        <HeaderText>Login to your account</HeaderText>
        <LoginForm />
      </InnerContainer>
    </Container>
  );
};

export default Login;