import React, { useEffect } from 'react';
import { ScrollView, View, Text, ImageBackground } from 'react-native';
import styled from '@emotion/native';
import { usePage } from '@services/queries/module';
import { useRoute } from '@react-navigation/native';
import { PageParams } from 'types';
import { useModuleUserProgress } from '@services/mutations/module';
import { Image } from 'react-native';

const BackgroundImage = styled(ImageBackground)`
  flex: 1;
`;

const Container = styled(ScrollView)`
  flex: 1;
  background-color: transparent;
`;

const ImageWrapper = styled(View)`
  align-items: center;
  margin-top: 20px;
`;

const CenteredContent = styled(View)`
  flex: 1;
  margin: 20px;
  align-items: center;
`;

const StyledImage = styled(Image)`
  width: 275px;
  height: 275px;
  border-radius: 20px;
  margin-top: 80px;
  border: 1px solid #ffa500;
`;

const StyledText = styled(Text)`
  font-size: 25px;
  color: #333;
  text-align: center;
  font-family: 'Roboto';
  padding: 30px;
  margin-top: 50px;
`;

const Page = () => {
  const params = useRoute().params as PageParams;
  const { data } = usePage(params.module_id, params.page_id);
  const { mutateAsync } = useModuleUserProgress();

  useEffect(() => {
    mutateAsync({
      module_id: params.module_id,
      page_id: params.page_id,
      is_completed: true,
    });
  }, [mutateAsync, params.module_id, params.page_id]);

  return (
    <BackgroundImage source={require('../../assets/images/ggg.png')} style={{ flex: 1 }}>
      <Container>
        {data?.image && (
          <ImageWrapper>
            <StyledImage source={{ uri: data?.image }} />
          </ImageWrapper>
        )}
        <CenteredContent>
          <StyledText>{data?.content}</StyledText>
        </CenteredContent>
      </Container>
    </BackgroundImage>
  );
};

export default Page;
