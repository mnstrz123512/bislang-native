import styled from '@emotion/native';
import React, { useCallback, useEffect } from 'react';
import { ImageBackground, ScrollView, Text, TouchableOpacity, View, Image } from 'react-native'; // Added Image import
import useIsMobile from '@hooks/useIsMobile';
import PagesList from '@components/module/PagesList';
import { usePages } from '@services/queries/module';
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { PageListParams, Navbar } from 'types';

interface ContainerProps {
  isMobile: boolean;
}

const BackgroundImage = styled(ImageBackground)`
  flex: 1;
`;

const Container = styled.ScrollView<ContainerProps>`
  flex: 1;
  background-color: transparent;
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

type NavbarNavigationProps = StackNavigationProp<Navbar>;

export default function PageList() {
  const params = useRoute().params as PageListParams;
  const { data, refetch } = usePages(params.module_id);
  const navbarNavigate = useNavigation<NavbarNavigationProps>();

  useEffect(() => {
    refetch();
  }, [params.module_id, refetch]);

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch])
  );

  return (
    <BackgroundImage
      source={require('../../assets/images/bgmod.png')} // Specify the correct path to your image
      resizeMode="cover"
    >
      <Container isMobile={useIsMobile()}>
        {data ? <PagesList items={data} /> : null}
      </Container>
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
}
