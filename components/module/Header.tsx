import React from 'react';
import {Icon} from 'react-native-paper';
import styled from '@emotion/native';
import {TouchableOpacity} from 'react-native';
import useIsMobile from '@hooks/useIsMobile';

const HeaderTitle = styled.Text`
  font-size: 20px;
  font-weight: 500;
`;
const HeaderContainer = styled.View<{isMobile: boolean}>`
  flex-direction: row;
  align-items: center;
  gap: 10px;
  padding: 10px;
  height: 70px;
  // margin-top: 50px;
  margin-top: ${props => (props.isMobile ? 0 : 50)}px;
  background-color: #ffa500;
`;

interface HeaderProps {
  title: string;
}

const Header = ({title}: HeaderProps) => {
  return (
    <HeaderContainer isMobile={useIsMobile()}>
      <TouchableOpacity onPress={() => console.log('')}>
        <Icon source="arrow-left" size={25} />
      </TouchableOpacity>
      <HeaderTitle>{title}</HeaderTitle>
    </HeaderContainer>
  );
};

export default Header;
