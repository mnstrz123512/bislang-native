import styled from '@emotion/native';
import React, { useCallback, useEffect } from 'react';
import { ImageBackground } from 'react-native';
import useIsMobile from '@hooks/useIsMobile';
import PagesList from '@components/module/PagesList';
import { usePages } from '@services/queries/module';
import { useFocusEffect, useRoute } from '@react-navigation/native';
import { PageListParams } from 'types';

interface ContainerProps {
  isMobile: boolean;
}

const BackgroundImage = styled(ImageBackground)`
  flex: 1;
`;

const Container = styled.ScrollView<ContainerProps>`
  flex: 1;
  background-color: transparent;
`;

export default function PageList() {
  const params = useRoute().params as PageListParams;
  const { data, refetch } = usePages(params.module_id);

  useEffect(() => {
    refetch();
  }, [params.module_id, refetch]);

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch])
  );

  return (
    <BackgroundImage
      source={require('../../assets/images/rens.png')} // Specify the correct path to your image
      resizeMode="cover"
    >
      <Container isMobile={useIsMobile()}>
        {data ? <PagesList items={data} /> : null}
      </Container>
    </BackgroundImage>
  );
}
