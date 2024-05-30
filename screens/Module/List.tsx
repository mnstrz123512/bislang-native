import React, { useCallback, useEffect } from 'react';
import styled from '@emotion/native';
import { ImageBackground, Text, ActivityIndicator, ScrollView } from 'react-native'; // Import ScrollView
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { ModuleStackParamList } from 'types';
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

const ScrollViewContainer = styled.ScrollView`
  flex: 1;
`;

type ActivityNavigationProps = StackNavigationProp<
  ModuleStackParamList,
  'List'
>;

// Define a type for the module data
interface ModuleData {
  id: number;
  name: string;
  total_pages: number;
  total_completed_pages: number;
}

const GameTypeList = () => {
  const navigate = useNavigation<ActivityNavigationProps>();
  const { data, isLoading, isError, refetch } = useModules();

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

  // Sort the data array based on the id property
  const sortedData = data?.sort((a: ModuleData, b: ModuleData) => a.id - b.id);

  return (
    <BackgroundImage
      source={require('../../assets/images/rens.png')} // Specify the correct path to your image
      resizeMode="cover"
    >
      <ScrollViewContainer>
        {isLoading ? (
          <LoadingContainer>
            <ActivityIndicator size="large" color="#0000ff" />
            <Text>Loading...</Text>
          </LoadingContainer>
        ) : (
          sortedData?.map(
            (
              { id, name, total_pages, total_completed_pages }: ModuleData,
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
      </ScrollViewContainer>
    </BackgroundImage>
  );
};

export default GameTypeList;
