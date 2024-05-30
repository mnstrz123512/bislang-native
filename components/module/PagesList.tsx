import { View } from 'react-native';
import React from 'react';
import { List } from 'react-native-paper';
import styled from '@emotion/native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ModuleNavigatorProps } from '@screens/module/Navigator';
import { PageListParams } from 'types';

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
  fontSize?: number;
}

const CompletedBadge = styled.Image`
  width: 35px;
  height: 28px;
`;

// Styled container with white background and border radius
const PageContainer = styled.View`
  background-color: #ffffff;
  border-radius: 20px;
  padding: 10px;
  margin-top: 20px;
  margin-left: 20px;
  margin-right: 20px;
  border: 2px solid #ffa500;
`;

// Styled text for the title with customizable fontSize and bold text
const TitleText = styled.Text<{ fontSize?: number }>`
  font-size: ${({ fontSize }) => (fontSize ? `${fontSize}px` : '20px')};
  font-weight: bold;
`;

const PagesList = ({ items, fontSize }: ModuleListProps) => {
  const { navigate } = useNavigation<ModuleNavigatorProps>();
  const { module_id } = useRoute().params as PageListParams;

  // Sort items alphabetically by name
  const sortedItems = items.sort((a, b) => a.id - b.id);

  return (
    <View>
      <List.Section>
        {sortedItems?.map(item => (
          // Wrap each List.Item in the PageContainer
          <PageContainer key={item.id.toString()}>
            <List.Item
              id={item.name}
              title={<TitleText fontSize={fontSize}>{item.name}</TitleText>}
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
          </PageContainer>
        ))}
      </List.Section>
    </View>
  );
};

export default PagesList;
