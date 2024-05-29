import styled from '@emotion/native';
import React, {useCallback, useEffect} from 'react';

import useIsMobile from '@hooks/useIsMobile';
import PagesList from '@components/module/PagesList';
import {usePages} from '@services/queries/module';
import {useFocusEffect, useRoute} from '@react-navigation/native';
import {PageListParams} from 'types';

interface ContainerProps {
  isMobile: boolean;
}
const Container = styled.ScrollView<ContainerProps>`
  flex: 1;
  background-color: #ffff;
`;

export default function PageList() {
  const params = useRoute().params as PageListParams;
  const {data, refetch} = usePages(params.module_id);

  useEffect(() => {
    refetch();
  }, [params.module_id, refetch]);

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch])
  );

  return (
    <Container isMobile={useIsMobile()}>
      <PagesList items={data} />
    </Container>
  );
}
