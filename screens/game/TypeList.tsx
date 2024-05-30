import React, { useCallback, useEffect } from 'react';
import styled from '@emotion/native';
import LinearGradient from 'react-native-linear-gradient';
import Item from '@components/game/type/Item';
import { StackNavigationProp } from '@react-navigation/stack';
import { GameStackParamList } from 'types';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { Text, ActivityIndicator } from 'react-native-paper';
import { useGameTypes } from '@services/queries/game';
import { ImageBackground, ScrollView } from 'react-native'; // Import View for creating a fixed container

const BackgroundImage = styled(ImageBackground)`
  flex: 1;
`;

const GameTypeListContainer = styled.View`
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
  const { data, isLoading, isError, refetch } = useGameTypes();
  
  // Sort the data array based on the id property
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
    <BackgroundImage source={require('../../assets/images/orings.png')}>
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
    </BackgroundImage>
  );
};

export default GameTypeList;
