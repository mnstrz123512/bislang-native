import React, {useCallback} from 'react';
import styled from '@emotion/native';
import {Text} from 'react-native-paper';
import {StackNavigationProp} from '@react-navigation/stack';
import {GameStackParamList, ListParams} from 'types';
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {useGames} from '@services/queries/game';
import GameCompleted from '@assets/images/svg/complete_icon.svg';

const TextHeader = styled(Text)`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
  align-self: center;
`;

const TextSubHeader = styled(Text)`
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 10px;
  align-self: center;
`;

const ListContainer = styled.View`
  padding: 20px;
  background-color: #ffff;
  flex: 1;
`;

const GameItem = styled.Pressable`
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

type ListNavigationProps = StackNavigationProp<GameStackParamList, 'List'>;
const List = () => {
  const navigate = useNavigation<ListNavigationProps>();
  const params = useRoute().params as ListParams;
  const {data, refetch} = useGames(params.type);

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch])
  );
  return (
    <ListContainer>
      <TextHeader>{params?.subTitle}</TextHeader>
      <TextSubHeader>({params?.title})</TextSubHeader>
      <GameList>
        {data?.map(({id, is_completed}: any, index: number) => (
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
  );
};

export default List;
