import React, {useCallback, useEffect} from 'react';
import styled from '@emotion/native';
import LinearGradient from 'react-native-linear-gradient';
import Item from '@components/game/type/Item';
import {StackNavigationProp} from '@react-navigation/stack';
import {ModuleStackParamList} from 'types';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {Text, ActivityIndicator} from 'react-native-paper';
import {useModules} from '@services/queries/module';

const GameTypeListContainer = styled(LinearGradient)`
  flex: 1;
  padding: 20px;
`;

type ActivityNavigationProps = StackNavigationProp<
  ModuleStackParamList,
  'List'
>;

const LoadingContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const GameTypeList = () => {
  const navigate = useNavigation<ActivityNavigationProps>();
  const {data, isLoading, isError, refetch} = useModules();
  useEffect(() => {
    if (isError) {
      console.error('Error fetching modules');
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
            {id, name, total_pages, total_completed_pages}: any,
            index: number
          ) => (
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
          )
        )
      )}
    </GameTypeListContainer>
  );
};

export default GameTypeList;
