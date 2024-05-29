/* eslint-disable react/no-unstable-nested-components */
import {View} from 'react-native';
import React from 'react';
import {List} from 'react-native-paper';
import styled from '@emotion/native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {ModuleNavigatorProps} from '@screens/module/Navigator';
import {PageListParams} from 'types';

interface Page {
  id: number;
  name: string;
  content: string;
  image: string;
  audio: string;
  is_completed?: boolean;
}

interface ModuleListProps {
  items: Page[];
}

const CompletedBadge = styled.Image`
  width: 25px;
  height: 25px;
`;

const PagesList = ({items}: ModuleListProps) => {
  const {navigate} = useNavigation<ModuleNavigatorProps>();
  const {module_id} = useRoute().params as PageListParams;
  return (
    <View>
      <List.Section>
        {items?.map(item => (
          <List.Item
            key={item.name}
            id={item.name}
            title={item.name}
            {...(item.is_completed && {
              right: () => (
                <CompletedBadge
                  source={require('../../assets/images/completed.png')}
                />
              ),
            })}
            onPress={() => {
              navigate('Page', {
                module_id: module_id,
                page_id: item.id,
                audio: item.audio,
                screenOptions: {
                  title: item.name,
                },
              });
            }}
          />
        ))}
      </List.Section>
    </View>
  );
};

export default PagesList;
