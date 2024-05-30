import React from 'react';
import {Image} from 'react-native';
import styled from '@emotion/native';

const BadgeContainer = styled.View`
  align-items: center;
  justify-content: center;
  margin-top: 30px;
  flex-direction: row;
  flex-wrap: wrap;
`;

const BadgeItem = styled(Image)`
  width: 50px;
  height: 50px;
`;

const Badge = () => {
  return (
    <BadgeContainer>
      <BadgeItem source={require('../../assets/images/medal.png')} />
      <BadgeItem source={require('../../assets/images/medal.png')} />
      <BadgeItem source={require('../../assets/images/medal.png')} />
      <BadgeItem source={require('../../assets/images/medal.png')} />
      <BadgeItem source={require('../../assets/images/medal.png')} />
      <BadgeItem source={require('../../assets/images/medal.png')} />
      <BadgeItem source={require('../../assets/images/medal.png')} />
      <BadgeItem source={require('../../assets/images/medal.png')} />
      <BadgeItem source={require('../../assets/images/medal.png')} />
      <BadgeItem source={require('../../assets/images/medal.png')} />
      <BadgeItem source={require('../../assets/images/medal.png')} />
      <BadgeItem source={require('../../assets/images/medal.png')} />
      <BadgeItem source={require('../../assets/images/medal.png')} />
      <BadgeItem source={require('../../assets/images/medal.png')} />
    </BadgeContainer>
  );
};

export default Badge;
