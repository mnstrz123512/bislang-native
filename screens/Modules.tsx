import styled from '@emotion/native';
import React from 'react';

import useIsMobile from '@hooks/useIsMobile';
import ModuleList from '@components/module/List';

interface ContainerProps {
  isMobile: boolean;
}
const Container = styled.ScrollView<ContainerProps>`
  flex: 1;
  background-color: #ffff;
`;

const moduleList = [
  {
    title: 'Module 1',
    pages: [
      {
        title: 'First item',
        progress: 100,
        is_completed: true,
      },
      {
        title: 'Second item',
        progress: 100,
        is_completed: true,
      },
      {
        title: 'Third item',
        progress: 100,
        is_completed: true,
      },
    ],
    is_completed: true,
  },
  {
    title: 'Module 2',
    pages: [
      {
        title: 'First item',
        progress: 100,
        is_completed: true,
      },
      {
        title: 'Second item',
        progress: 42,
        is_completed: false,
      },
      {
        title: 'Third item',
        progress: 55,
        is_completed: false,
      },
    ],
    is_completed: false,
  },
  {
    title: 'Module 3',
    pages: [
      {
        title: 'First item',
        progress: 100,
        is_completed: true,
      },
      {
        title: 'Second item',
        progress: 65,
        is_completed: false,
      },
      {
        title: 'Third item',
        is_completed: false,
      },
    ],
    is_completed: false,
  },
];
export default function Modules() {
  return (
    <Container isMobile={useIsMobile()}>
      <ModuleList items={moduleList} />
    </Container>
  );
}
