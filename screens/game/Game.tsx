import React, {useState, useEffect, useMemo} from 'react';
import {useRoute, RouteProp, useNavigation} from '@react-navigation/native';
import {GameStackParamList, PlayGameParams} from 'types';
import {useGameDetails} from '@services/queries/game';
import styled from '@emotion/native';
import {shuffle, upperCase} from 'lodash';
import {Button, Modal, Portal, Text} from 'react-native-paper';
import {useFormik} from 'formik';
import * as yup from 'yup';
import {StackNavigationProp} from '@react-navigation/stack';
import CompleteIcon from '@assets/images/svg/complete_icon.svg';
import {useGameUserProgress} from '@services/mutations/game';

const GameContainer = styled.View`
  padding: 20px;
  background-color: #c5ebfe;
  flex: 1;
`;
const StyledImage = styled.Image`
  width: 100%;
  height: 50%;
`;

const TextInput = styled.TextInput`
  height: 50px;
  width: 50px;
  border-color: gray;
  border-width: 1px;
  margin-bottom: 20px;
  padding: 10px;
  text-align: center;
`;
const AnswerContainer = styled.View`
  margin-top: 20px;
  justify-content: center;
  flex-direction: row;
  gap: 30px;
  align-items: center;
  text-align: center;
  flex-wrap: wrap;
`;

const StyledButton = styled(Button)`
  width: 70px;
  height: 70px;
  justify-content: center;
  align-items: center;
`;

const ClearButton = styled(Button)`
  margin-top: 10px;
  width: 100px;
`;
const ModalText = styled(Text)`
  font-size: 24px;
  font-weight: bold;
  margin-top 10px;
  align-self: center;
`;

const CloseButton = styled(Button)`
  margin-top: 20px;
  width: 50%;
  align-self: center;
`;

const ScreenContainer = styled.SafeAreaView`
  flex: 1;
`;

type GameRouteProp = RouteProp<{params: PlayGameParams}, 'params'>;
type GameNavigationProps = StackNavigationProp<GameStackParamList, 'PlayGame'>;

type FormValues = {
  [key: string]: string;
};

const Game: React.FC = () => {
  const route = useRoute<GameRouteProp>();
  const navigate = useNavigation<GameNavigationProps>();
  const {id, type, title, subTitle} = route.params;

  const {data} = useGameDetails(id);
  const [inputIndex, setInputIndex] = useState<number>(0);
  const [hasStarted, setHasStarted] = useState<boolean>(false);
  const [visible, setVisible] = useState(false);

  const userProgress = useGameUserProgress();
  const showModal = () => {
    setVisible(true);
    userProgress.mutate({
      id,
      is_completed: true,
    });
  };
  const hideModal = () => {
    setVisible(false);
    navigate.navigate('List', {
      type,
      title,
      subTitle,
    });
  };
  const answerLength = data?.answer?.length || 0;
  const initialValues: FormValues = Object.fromEntries(
    new Array(answerLength).fill(null).map((_, i) => [`box${i}`, ''])
  ) as FormValues;

  const validationSchema = yup
    .object()
    .shape(
      Object.fromEntries(
        new Array(answerLength)
          .fill(null)
          .map((_, i) => [`box${i}`, yup.string().required('Required')])
      )
    );

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: values => {
      const userAnswer = Object.values(values).join('');

      if (upperCase(userAnswer) === upperCase(data?.answer)) {
        console.log('The answer is good!');
        showModal();
      } else {
        console.log('The answer is incorrect.');
      }
      setHasStarted(false);
    },
  });

  const {setFieldValue, values, handleSubmit} = formik;

  useEffect(() => {
    if (hasStarted && Object.values(values).join('').length === answerLength) {
      handleSubmit();
    }
  }, [values, answerLength, data?.answer, handleSubmit, hasStarted]);

  const generateAndJumbleText = (inputString: string): string => {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let extendedText = inputString.slice(0, 12).toUpperCase();

    while (extendedText.length < 12) {
      extendedText += alphabet[Math.floor(Math.random() * alphabet.length)];
    }

    return shuffle(extendedText.split('')).join('');
  };

  const jumbledText = useMemo(() => {
    return generateAndJumbleText(data?.answer || '');
  }, [data?.answer]);

  const handleLetterClick = (letter: string) => {
    if (!hasStarted) {
      setHasStarted(true);
    }
    if (inputIndex < answerLength) {
      const fieldName = `box${inputIndex}`;
      setFieldValue(fieldName, letter);
      setInputIndex(inputIndex + 1);
    }
  };
  const containerStyle = {
    backgroundColor: 'white',
    padding: 20,
    margin: 20,
    flex: 0.5,
  };

  return (
    <ScreenContainer>
      <GameContainer>
        {data?.image && <StyledImage source={{uri: data.image}} />}
        <ClearButton
          mode="contained"
          onPress={() => {
            setInputIndex(0);
            formik.resetForm();
            setHasStarted(false);
          }}>
          Clear
        </ClearButton>
        <AnswerContainer>
          {Object.keys(initialValues).map(key => (
            <TextInput key={key} value={values[key]} editable={false} />
          ))}
        </AnswerContainer>
        <AnswerContainer>
          {jumbledText.split('').map((letter, index) => (
            <StyledButton
              mode="contained"
              key={index}
              onPress={() => handleLetterClick(letter)}>
              {letter}
            </StyledButton>
          ))}
        </AnswerContainer>
      </GameContainer>
      <Portal>
        <Modal
          visible={visible}
          // onDismiss={hideModal}
          contentContainerStyle={containerStyle}>
          <CompleteIcon width={'100%'} height={100} />
          <ModalText>You are correct!</ModalText>
          <CloseButton mode="contained" onPress={hideModal}>
            Close
          </CloseButton>
        </Modal>
      </Portal>
    </ScreenContainer>
  );
};

export default Game;
