import React from 'react';
import {View} from 'react-native';
import {Avatar, Button, Text} from 'react-native-paper';
import styled from '@emotion/native';
import {useAuth} from '@components/authentication/Provider';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from 'types';
import {useNavigation} from '@react-navigation/native';

const Container = styled.View`
  align-items: center;
  flex-direction: row;
  gap: 20px;
`;

const TextContainer = styled.View`
  align-items: left;
`;

const UserDetailContainer = styled.View`
  flex-direction: column;
  gap: 20px;
  width: 100%;
`;

type UserDetailNavigationProps = StackNavigationProp<
  RootStackParamList,
  'Dashboard'
>;

const UserDetail = () => {
  const {logout, ...rest} = useAuth();

  console.log(rest);

  const navigate = useNavigation<UserDetailNavigationProps>();
  return (
    <UserDetailContainer>
      <Container>
        <View>
          {rest.profileImage ? (
            <Avatar.Image size={100} source={{uri: rest.profileImage}} />
          ) : (
            <Avatar.Text
              size={100}
              label={`${rest.firstName} ${rest.lastName}`}
            />
          )}
        </View>
        <TextContainer>
          <Text variant="headlineMedium">{`${rest.firstName} ${rest.lastName}`}</Text>
          <Text variant="bodyMedium">{rest.emailAddress}</Text>
          {/* <Button mode="text">Edit Account Info</Button> */}
          <Button
            mode="text"
            onPress={() => {
              logout();

              navigate.reset({
                index: 0,
                routes: [{name: 'Login'}],
              });
            }}>
            Logout
          </Button>
        </TextContainer>
      </Container>
    </UserDetailContainer>
  );
};

export default UserDetail;
