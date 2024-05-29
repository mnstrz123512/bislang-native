import React, {useCallback, useEffect} from 'react';
import styled from '@emotion/native';
import LinearGradient from 'react-native-linear-gradient';
import Item from '@components/game/type/Item';
import {StackNavigationProp} from '@react-navigation/stack';
import {GameStackParamList} from 'types';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {Text, ActivityIndicator} from 'react-native-paper';
import {useGameTypes} from '@services/queries/game';

const GameTypeListContainer = styled(LinearGradient)`
  flex: 1;
  padding: 20px;
`;

type ActivityNavigationProps = StackNavigationProp<
  GameStackParamList,
  'TypeList'
>;

const LoadingContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const GameTypeList = () => {
  const navigate = useNavigation<ActivityNavigationProps>();
  const {data, isLoading, isError, refetch} = useGameTypes();
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

  return (
    <GameTypeListContainer
      colors={['#ffa500', '#ffa500', 'white']}
      start={{x: 0, y: 0}}
      end={{x: 0, y: 1}}
      locations={[0, 0.5, 0.5]}>
      {isLoading ? (
        <LoadingContainer>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text>Loading...</Text>
        </LoadingContainer>
      ) : (
        data?.map(
          (
            {id, name, description, total_completed_games, total_games}: any,
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
    </GameTypeListContainer>
  );
};

export default GameTypeList;
