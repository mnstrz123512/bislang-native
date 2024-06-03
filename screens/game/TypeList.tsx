import React, { useCallback, useEffect } from 'react';
import styled from '@emotion/native';
import LinearGradient from 'react-native-linear-gradient';
import Item from '@components/game/type/Item';
import { StackNavigationProp } from '@react-navigation/stack';
import { GameStackParamList, Navbar } from 'types';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { Text, ActivityIndicator } from 'react-native-paper';
import { useGameTypes } from '@services/queries/game';
import { ImageBackground, ScrollView } from 'react-native'; // Import View for creating a fixed container
import { Image } from 'react-native';
const BackgroundImage = styled(ImageBackground)`
  flex: 1;
`;

const GameTypeListContainer = styled.View`
  flex: 1;
  padding: 20px;
  margin-bottom: 30px;
`;

const LoadingContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
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
  padding: 4px;
`;

// Styled component for the image logo
const FooterImage = styled(Image)`
  width: 25px; // Adjust the width and height as per your logo dimensions
  height: 25px;
`;

type ActivityNavigationProps = StackNavigationProp<GameStackParamList, 'TypeList'>;
type NavbarNavigationProps = StackNavigationProp<Navbar>;

const GameTypeList = () => {
  const navigate = useNavigation<ActivityNavigationProps>();
  const navbarNavigate = useNavigation<NavbarNavigationProps>();
  const { data, isLoading, isError, refetch } = useGameTypes();
  
  useEffect(() => {
    if (isError) {
      console.error('Error fetching game types');
    }
  }, [isError]);

  useFocusEffect(
    useCallback(() => {
      refetch();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
  );

  // Sort the data array based on the id property
  const sortedData = data?.sort((a: { id: number }, b: { id: number }) => a.id - b.id);;

  return (
    <BackgroundImage source={require('../../assets/images/bggame.png')}>
      <GameTypeListContainer>
        <ScrollView>
          {isLoading ? (
            <LoadingContainer>
              <ActivityIndicator size="large" color="#0000ff" />
              <Text>Loading...</Text>
            </LoadingContainer>
          ) : (
            sortedData?.map(
              (
                { id, name, description, total_completed_games, total_games }: any,
                index: number
              ) => (
                <Item
                  key={index}
                  title={name}
                  subTitle={description}
                  completed={total_completed_games}
                  total={total_games}
                  onPress={() => {
                    navigate.navigate('List', {
                      type: id,
                      title: name,
                      subTitle: description,
                    });
                  }}
                />
              )
            )
          )}
        </ScrollView>
      </GameTypeListContainer>
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
    </BackgroundImage>
  );
};

export default GameTypeList;
