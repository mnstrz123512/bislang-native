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

  const navigate = useNavigation<UserDetailNavigationProps>();
  //BUtton Design for Badge profile
  return (
    <UserDetailContainer>
      <Container>
        <View >
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
          
          
          <Button mode="text" onPress={() => navigate.navigate('Profile')} style={{ backgroundColor: '#000000', borderRadius: 30, paddingVertical: 1,  marginTop:2,  }}
  labelStyle={{ color: '#ffffff', fontSize: 18 }}>
            Badge Profile
          </Button>

          
        </TextContainer>
      </Container>
    </UserDetailContainer>
  );
};

export default UserDetail;
