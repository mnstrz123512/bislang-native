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
import IncompleteIcon from '@assets/images/svg/incomplete_icon.svg';
import {useUserProgress} from '@services/mutations/game';
import {useUserProgress1} from '@services/mutations/game1';
import { ImageBackground, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

//The whole container
const GameContainer = styled.View`
  padding: 20px;
  flex: 1;
`;

//The image
const StyledImage = styled.Image`
  width: 70%;
  height: 30%;
  align-self: center;
  margin-bottom: 30px;
  margin-top: 60px;
  border: 1px solid #ffa500;
  border-radius: 15px; 
`;

// For clear and hint button
const ButtonRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 10px;
`;

// Text answer
const TextInput = styled.TextInput`
  height: 40px;
  width: 40px;
  border-color: black;
  border-width: 3px;
  margin-bottom: 20px;
  padding: 5px;
  color: black;
  font-size: 25px;
  text-align: center;
`;

const AnswerContainer = styled.View`
  margin-top: 20px;
  justify-content: center;
  flex-direction: row;
  gap: 10px;
  align-items: center;
  text-align: center;
  flex-wrap: wrap;
`;

// button letters
const StyledButton = styled(Button)`
  width: 60px;
  height: 60px;
  justify-content: center;
  align-items: center;
  background-color: ${({ buttonColor }) => buttonColor || '#FEEFAD'};
  border: 0.3px solid #ffa500;
  border-radius: 12px;
`;

//clear size
const ClearButton = styled(Button)`
  margin-top: 0px;
  width: 100px;
  background-color: #FFFFFF;
  border: 1px solid #ffa500;
`;

//hint size
const HintButton = styled(Button)`
  margin-top: 0px;
  width: 100px;
  background-color: #FFFFFF;
  border: 0.5px solid #ffa500;
`;

const ModalText = styled(Text)`
  font-size: 24px;
  font-weight: bold;
  margin-top: 10px;
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

const MechanicsButton = styled(TouchableOpacity)`
  position: absolute;
  top: 20px;
  right: 10px;
  background-color: #FFFFFF;
  padding: 10px;
  border-radius: 10px;
  border: 1px solid #ffa500;
`;

const MechanicsButtonText = styled(Text)`
  color: white;
  font-weight: bold;
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
  const [correctModalVisible, setCorrectModalVisible] = useState(false);
  const [incorrectModalVisible, setIncorrectModalVisible] = useState(false);
  const [mechanicsModalVisible, setMechanicsModalVisible] = useState(false);
  const [hintsUsed, setHintsUsed] = useState<number>(0);
  const [hintIndices, setHintIndices] = useState<number[]>([]);

  // Correct Modal
  const userProgress = useUserProgress();
  const showModal = () => {
    setCorrectModalVisible(true);
    userProgress.mutate({
      id,
      is_completed: true,
    });
  };
  const hideModal = () => {
    setCorrectModalVisible(false);
    navigate.navigate('List', {
      type,
      title,
      subTitle,
    });
  };

  //Incorrect Modal
  const userProgress1 = useUserProgress1();
  const showModal1 = () => {
    setIncorrectModalVisible(true);
    userProgress1.mutate({
      id,
      is_completed: false,
    });
  };
  const hideModal1 = () => {
    setIncorrectModalVisible(false);
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
        showModal1();
      }
      setHasStarted(false);
    },
  });

  const {setFieldValue, values, handleSubmit, resetForm} = formik;

  useEffect(() => {
    if (hasStarted && Object.values(values).join('').length === answerLength) {
      handleSubmit();
    }
  }, [values, answerLength, data?.answer, handleSubmit, hasStarted]);

  useEffect(() => {
    if (data?.answer) {
      resetForm({
        values: Object.fromEntries(
          new Array(answerLength).fill(null).map((_, i) => [`box${i}`, ''])
        )
      });
      setHintIndices([]);
      setHintsUsed(0);
    }
  }, [data?.answer, answerLength, resetForm]);

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

    let emptyBoxes = Object.keys(values).filter(key => !values[key] && !hintIndices.includes(parseInt(key.replace('box', ''))));
    if (emptyBoxes.length > 0) {
      const nextBox = emptyBoxes[0];
      setFieldValue(nextBox, letter);
      setInputIndex(inputIndex + 1);
    }
  };

  //Random hints boxes
  const handleHintClick = async () => {
    if (data?.answer && hintsUsed < 2) {
      let emptyBoxes = Object.keys(values).filter(key => !values[key] && !hintIndices.includes(parseInt(key.replace('box', ''))));
      if (emptyBoxes.length > 0) {
        const randomIndex = Math.floor(Math.random() * emptyBoxes.length);
        const randomBox = emptyBoxes[randomIndex];
        const correctLetterIndex = parseInt(randomBox.replace('box', ''));
        const correctLetter = data.answer[correctLetterIndex].toUpperCase();
        setFieldValue(randomBox, correctLetter);
        setHintsUsed(hintsUsed + 1);
        const newHintIndices = [...hintIndices, correctLetterIndex];
        setHintIndices(newHintIndices);
        await AsyncStorage.setItem(`${id}-hints`, JSON.stringify({ indices: newHintIndices, used: hintsUsed + 1 }));
      }
    }
  };

  const handleClearClick = () => {
    resetForm();
    setInputIndex(0);
    setHasStarted(false);

    // Reapply hints
    hintIndices.forEach(index => {
      const fieldName = `box${index}`;
      const correctLetter = data?.answer[index].toUpperCase();
      setFieldValue(fieldName, correctLetter);
    });
  };

  // hints function
  const loadHints = async () => {
    if (!data?.answer) return;

    const storedHints = await AsyncStorage.getItem(`${id}-hints`);
    if (storedHints) {
      const { indices, used } = JSON.parse(storedHints);
      if (Array.isArray(indices)) {
        setHintIndices(indices);
        setHintsUsed(used);
        indices.forEach(index => {
          const fieldName = `box${index}`;
          const correctLetter = data.answer[index].toUpperCase();
          setFieldValue(fieldName, correctLetter);
        });
      }
    }
  };

  useEffect(() => {
    loadHints();
  }, [data?.answer]);

  const containerStyle = {
    backgroundColor: 'white',
    padding: 20,
    margin: 20,
    flex: 0.35,
    borderRadius: 40,
  };

  const containerStyle1 = {
    backgroundColor: 'white',
    padding: 20,
    margin: 20,
    flex: 0.35,
    borderRadius: 40,
  };

  const mechanicsContainerStyle = {
    backgroundColor: 'white',
    padding: 27,
    margin: 30,
    flex: 0.4,
    borderRadius: 40,
  };

  return (
    <ScreenContainer>
      <ImageBackground source={require('../../assets/images/emman.png')} style={{flex: 1}}>
        <GameContainer>
          {data?.image && <StyledImage source={{uri: data.image}} />}

          <ButtonRow>
            <ClearButton
              mode="contained"
              onPress={handleClearClick}
              labelStyle={{ color: 'black', fontSize: 13 }}>
              Clear
            </ClearButton>
            <HintButton
              mode="contained"
              onPress={handleHintClick}
              disabled={hintsUsed >= 2}
              labelStyle={{ color: 'black', fontSize: 13 }}>
              💡 ({hintsUsed}/2)
            </HintButton>
          </ButtonRow>
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
                onPress={() => handleLetterClick(letter)}
                labelStyle={{ color: 'black', fontSize: 17 }}>
                {letter}
              </StyledButton>
            ))}
          </AnswerContainer>
        </GameContainer>
        <MechanicsButton onPress={() => setMechanicsModalVisible(true)}>
          <MechanicsButtonText>❓</MechanicsButtonText>
        </MechanicsButton>
      </ImageBackground>

      <Portal>
        <Modal
          visible={correctModalVisible}
          contentContainerStyle={containerStyle}>
          <CompleteIcon width={'100%'} height={100} />
          <ModalText>You are correct!</ModalText>
          <CloseButton mode="contained" onPress={hideModal}>
            Close
          </CloseButton>
        </Modal>
      </Portal>

      <Portal>
        <Modal
          visible={incorrectModalVisible}
          contentContainerStyle={containerStyle1}>
          <IncompleteIcon width={'100%'} height={100} />
          <ModalText>You are Incorrect!</ModalText>
          <CloseButton mode="contained" onPress={hideModal1}>
            Close
          </CloseButton>
        </Modal>
      </Portal>

      <Portal>
        <Modal
          visible={mechanicsModalVisible}
          contentContainerStyle={mechanicsContainerStyle}>
          <ModalText>Game Mechanics</ModalText>
          <Text> </Text>
          <Text>1. You need to fill in the correct letters to complete the word.</Text>
          <Text>2. You can use up to 2 hints per game.</Text>
          <Text>3. Click the letters below to fill in the blanks.</Text>
          <Text>4. Use the clear button to reset your answer.</Text>
          <CloseButton mode="contained" onPress={() => setMechanicsModalVisible(false)}>
            Close
          </CloseButton>
        </Modal>
      </Portal>
    </ScreenContainer>
  );
};

export default Game;
