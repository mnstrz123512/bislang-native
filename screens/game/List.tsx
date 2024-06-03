import React, { useCallback } from 'react';
import styled from '@emotion/native';
import { Text, ScrollView, TouchableOpacity, View, Dimensions, ImageBackground, Image } from 'react-native';
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { GameStackParamList, ListParams, Navbar } from 'types';
import { useGames } from '@services/queries/game';
import GameCompleted from '@assets/images/svg/complete_icon.svg';

const TextHeader = styled(Text)`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
  align-self: center;
  margin-top: 40px;
`;

const TextSubHeader = styled(Text)`
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 20px;
  align-self: center;
`;

const ListContainer = styled.View`
  flex: 1;
`;

const GameItem = styled.TouchableOpacity`
  background-color: #fff;
  padding: 20px;
  margin: 10px;
  border-radius: 10px;
  elevation: 5;
  width: 64px;
  height: 64px;
  align-items: center;
  border: 1px solid #ffa500;
  margin-bottom: 20px;
`;

const GameItemText = styled(Text)`
  font-size: 18px;
  font-weight: bold;
`;

const ItemTextContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const GameList = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
`;

const Footer = styled.View`
  position: absolute;
  bottom: 0;
  width: 100%;
  flex-direction: row;
  justify-content: space-around;
  background-color: white;
  padding: 10px 0;
  border-top-width: 1px;
  border-top-color: #ccc;
`;

const FooterButton = styled.TouchableOpacity`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 10px;
`;

// Styled component for the image icon
const FooterImage = styled(Image)`
  width: 25px; // Adjust the width and height as per your icon dimensions
  height: 25px;
`;

const FooterButtonText = styled(Text)`
  color: black;
  font-size: 16px;
`;

type ListNavigationProps = StackNavigationProp<GameStackParamList, 'List'>;
type NavbarNavigationProps = StackNavigationProp<Navbar>;

const List = () => {
  const navigate = useNavigation<ListNavigationProps>();
  const navbarNavigate = useNavigation<NavbarNavigationProps>();
  const params = useRoute().params as ListParams;
  const { data, refetch } = useGames(params.type);

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch])
  );

  return (
    <ImageBackground source={require('../../assets/images/bggame.png')} style={{ flex: 1 }}>
      <ScrollView>
        <ListContainer>
          <TextHeader>{params?.subTitle}</TextHeader>
          <TextSubHeader>({params?.title})</TextSubHeader>
          <GameList>
            {data?.map(({ id, is_completed }: any, index: number) => (
              <GameItem
                key={index}
                disabled={is_completed}
                onPress={() => {
                  navigate.navigate('PlayGame', {
                    id,
                    type: params?.type,
                    title: params?.title,
                    subTitle: params?.subTitle,
                  });
                }}>
                <ItemTextContainer>
                  {is_completed ? (
                    <GameCompleted />
                  ) : (
                    <GameItemText>{index + 1}</GameItemText>
                  )}
                </ItemTextContainer>
              </GameItem>
            ))}
          </GameList>
        </ListContainer>
      </ScrollView>
      <Footer>
        {/* Use FooterImage instead of FooterButtonText */}
        <FooterButton onPress={() => navbarNavigate.navigate('Dashboard')}>
          <FooterImage source={require('../../assets/images/home.png')} />
        </FooterButton>
        <FooterButton onPress={() => navbarNavigate.navigate('Module')}>
          <FooterImage source={require('../../assets/images/book.png')} />
        </FooterButton>
        <FooterButton onPress={() => navbarNavigate.navigate('Game')}>
          <FooterImage source={require('../../assets/images/console.png')} />
        </FooterButton>
      </Footer>
    </ImageBackground>
  );
};

export default List;
