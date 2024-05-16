import React from 'react';
import styled from '@emotion/native';
import {Text, ProgressBar} from 'react-native-paper';
const ItemContainer = styled.Pressable`
  background-color: #fff;
  padding: 20px;
  margin: 10px;
  border-radius: 10px;
  elevation: 5;
  border: 1px solid #ffa500;
`;
const ItemHeader = styled(Text)`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const SubHeader = styled(Text)`
  font-size: 14px;
  margin-bottom: 10px;
  text
`;

const ItemLabel = styled(Text)`
  font-size: 12px;
  font-weight: bold;
`;

const ItemDetailContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 10px;
`;

const StyledProgressBar = styled(ProgressBar)`
  margin-top: 20px;
  height: 15px;
  width: 100%;
  border-radius: 10px;
`;

interface ItemProps {
  title: string;
  subTitle: string;
  progress: number;
  total: number;
  onPress?: () => void;
}

const Item = ({title, subTitle, progress, total, onPress}: ItemProps) => {
  return (
    <ItemContainer onPress={onPress}>
      <ItemHeader>{title}</ItemHeader>
      <SubHeader>({subTitle})</SubHeader>
      <ItemDetailContainer>
        <ItemLabel>Progress</ItemLabel>
        <Text>
          {progress}/{total}
        </Text>
      </ItemDetailContainer>
      <ItemDetailContainer>
        <ItemLabel>Completed</ItemLabel>
      </ItemDetailContainer>
      <StyledProgressBar progress={progress / total} color={'#4CDF5B'} />
    </ItemContainer>
  );
};

export default Item;
