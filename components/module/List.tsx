/* eslint-disable react/no-unstable-nested-components */
import {View} from 'react-native';
import React from 'react';
import {List, ProgressBar} from 'react-native-paper';
import styled from '@emotion/native';

interface Page {
  title: string;
  is_completed?: boolean;
  progress?: number;
}

interface Module {
  title: string;
  pages: Page[];
  is_completed?: boolean;
}

interface ModuleListProps {
  items: Module[];
}

const StyledProgressBar = styled(ProgressBar)`
  width: 50px;
  height: 10px;
`;

const CompletedBadge = styled.Image`
  width: 25px;
  height: 25px;
`;

const ModuleList = ({items}: ModuleListProps) => {
  return (
    <View>
      <List.AccordionGroup>
        {items.map(item => (
          <List.Accordion
            key={item.title}
            id={item.title}
            title={item.title}
            left={props => <List.Icon {...props} icon="folder" />}
            {...(item.is_completed && {
              right: () => (
                <CompletedBadge
                  source={require('../../assets/images/completed.png')}
                />
              ),
            })}>
            {item.pages.map(page => (
              <List.Item
                key={`${item.title}-${page.title}`}
                title={page.title}
                onPress={() => {
                  console.log('Pressed');
                }}
                right={() => {
                  if (page.is_completed) {
                    return (
                      <CompletedBadge
                        source={require('../../assets/images/completed.png')}
                      />
                    );
                  }

                  if (page.progress) {
                    return (
                      <StyledProgressBar
                        progress={page.progress / 100}
                        color="#ffa500"
                      />
                    );
                  }

                  return null;
                }}
              />
            ))}
          </List.Accordion>
        ))}
      </List.AccordionGroup>
    </View>
  );
};

export default ModuleList;
