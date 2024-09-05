import React, { useCallback, useEffect } from 'react';
import styled from '@emotion/native';
import { ImageBackground, Text, ActivityIndicator, ScrollView, Image } from 'react-native'; // Added Image import
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { ModuleStackParamList, Navbar } from 'types';
import Item from '@components/game/type/Item';
import { useModules } from '@services/queries/module';

const LoadingContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const BackgroundImage = styled(ImageBackground)`
  flex: 1;
`;

const ModuleTypeListContainer = styled.View`
  flex: 1;
  padding: 20px;
  margin-bottom: 30px;
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

type ActivityNavigationProps = StackNavigationProp<ModuleStackParamList, 'List'>;
type NavbarNavigationProps = StackNavigationProp<Navbar>;

interface ModuleData {
  id: number;
  name: string;
  total_pages: number;
  total_completed_pages: number;
}

const GameTypeList = () => {
  const navigate = useNavigation<ActivityNavigationProps>();
  const navbarNavigate = useNavigation<NavbarNavigationProps>();
  const { data, isLoading, isError, refetch } = useModules();

  useEffect(() => {
    if (isError) {
      console.error('Error fetching modules');
    }
  }, [isError]);

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [])
  );

  const sortedData = data?.sort((a: ModuleData, b: ModuleData) => a.id - b.id);

  return (
    <BackgroundImage source={require('../../assets/images/bgmods.png')}>
      <ModuleTypeListContainer>
        <ScrollView>
          {isLoading ? (
            <LoadingContainer>
              <ActivityIndicator size="large" color="#0000ff" />
              <Text>Loading...</Text>
            </LoadingContainer>
          ) : (
            sortedData?.map(({ id, name, total_pages, total_completed_pages }: ModuleData, index: number) => (
              <Item
                key={index}
                title={name}
                subTitle={''}
                completed={total_completed_pages}
                total={total_pages}
                onPress={() => {
                  navigate.navigate('PageList', {
                    module_id: id,
                    screenOptions: {
                      title: name,
                    },
                  });
                }}
              />
            ))
          )}
        </ScrollView>
      </ModuleTypeListContainer>
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
