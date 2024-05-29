import React, {useEffect} from 'react';
import {ScrollView, View, Text, Image} from 'react-native';
import styled from '@emotion/native';
import {usePage} from '@services/queries/module';
import {useRoute} from '@react-navigation/native';
import {PageParams} from 'types';
import {useModuleUserProgress} from '@services/mutations/module';

const Container = styled(ScrollView)`
  flex: 1;
  background-color: #f8f9fa;
`;

const ImageWrapper = styled(View)`
  align-items: center;
  margin-top: 20px;
`;

const CenteredContent = styled(View)`
  flex: 1;
  margin: 20px;
`;

const StyledImage = styled(Image)`
  width: 300px;
  height: 300px;
`;

const StyledText = styled(Text)`
  font-size: 14px;
  color: #333;
`;

const Page = () => {
  const params = useRoute().params as PageParams;
  const {data} = usePage(params.module_id, params.page_id);
  const {mutateAsync} = useModuleUserProgress();

  useEffect(() => {
    mutateAsync({
      module_id: params.module_id,
      page_id: params.page_id,
      is_completed: true,
    });
  }, [mutateAsync, params.module_id, params.page_id]);

  return (
    <Container>
      {data?.image && (
        <ImageWrapper>
          <StyledImage source={{uri: data?.image}} />
        </ImageWrapper>
      )}
      <CenteredContent>
        <StyledText>{data?.content}</StyledText>
      </CenteredContent>
    </Container>
  );
};

export default Page;
