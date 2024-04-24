import React from 'react';
import {View} from 'react-native';
import {Avatar, Button, Text, ProgressBar} from 'react-native-paper';
import styled from '@emotion/native';

const Container = styled.View`
  align-items: center;
  flex-direction: row;
  gap: 20px;
`;

const TextContainer = styled.View`
  align-items: left;
`;

const ProgressBarContainer = styled.View`
  margin-top: 20px;
`;

const StyledProgressBar = styled(ProgressBar)`
  margin-top: 20px;
  height: 15px;
  width: 100%;
`;

const UserDetailContainer = styled.View`
  flex-direction: column;
  gap: 20px;
  width: 100%;
`;

const UserDetail = () => {
  return (
    <UserDetailContainer>
      <Container>
        <View>
          <Avatar.Image
            size={100}
            source={{uri: 'https://picsum.photos/200'}}
          />
        </View>
        <TextContainer>
          <Text variant="headlineMedium">@REEEEEM</Text>
          <Text variant="bodyMedium">Allen Raven Antipuesto</Text>
          <Button>Edit Account Info</Button>
        </TextContainer>
      </Container>
      <ProgressBarContainer>
        <Text>Current Progress:</Text>
        <StyledProgressBar progress={0.5} color={'#4CDF5B'} />
      </ProgressBarContainer>
    </UserDetailContainer>
  );
};

export default UserDetail;
