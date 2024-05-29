import React from 'react';
import {useAuth} from '@components/authentication/Provider';
import {Avatar, Text} from 'react-native-paper';
import styled from '@emotion/native';
import {Image, View} from 'react-native';
import {useBadges} from '@services/queries/auth';

const Container = styled.View`
  align-items: center;
  flex-direction: row;
  gap: 20px;
  background: #ffa500;
`;

const DetailContainer = styled.View`
  flex-direction: row;
  gap: 20px;
  width: 100%;
  margin: 25px;
`;

const TextContainer = styled.View`
  align-items: left;
  justify-content: center;
`;

const BadgeSectionContainer = styled.View`
  margin: 25px;
`;

const BadgesContainer = styled.View`
  margin: 25px;
  flex-direction: row;
  gap: 20px;
`;
const BadgeHeader = styled(Text)`
  font-size: 24px;
  font-weight: bold;
  mrgin-bottom: 25px;
`;
const StyledText = styled(Text)`
  font-weight: bold;
`;

const BadgeInnerContainer = styled.View`
  gap: 20px;
  margin-bottom: 25px;
  align-items: center;
  justify-content: center;
  width: 100px;
`;

const StyledImage = styled(Image)`
  width: 100px;
  height: 100px;
`;

const Profile = () => {
  const {firstName, lastName, profileImage, emailAddress} = useAuth();

  const {data} = useBadges();

  return (
    <View>
      <Container>
        <DetailContainer>
          {profileImage ? (
            <Avatar.Image size={100} source={{uri: profileImage}} />
          ) : (
            <Avatar.Text size={100} label={`${firstName} ${lastName}`} />
          )}
          <TextContainer>
            <StyledText variant="headlineMedium">{`${firstName} ${lastName}`}</StyledText>
            <StyledText variant="bodyMedium">{emailAddress}</StyledText>
          </TextContainer>
        </DetailContainer>
      </Container>
      <BadgeSectionContainer>
        <BadgeHeader>Badges</BadgeHeader>
        <BadgesContainer>
          {data?.map((badge: any) => (
            <BadgeInnerContainer key={badge.id}>
              <StyledImage source={{uri: badge.image}} />
              <Text>{badge.name}</Text>
            </BadgeInnerContainer>
          ))}
        </BadgesContainer>
      </BadgeSectionContainer>
    </View>
  );
};

export default Profile;
