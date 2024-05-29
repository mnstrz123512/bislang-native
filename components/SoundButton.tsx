import React, {useState, useEffect} from 'react';
import {Button} from 'react-native-paper';
import Sound from 'react-native-sound';
import styled from '@emotion/native';
import PlayButtonIcon from '@assets/images/svg/play-button.svg';
import PauseButtonIcon from '@assets/images/svg/pause-button.svg';

interface SoundButtonProps {
  soundUrl: string;
}

const StyledButton = styled(Button)`
  width: 50px;
  height: 50px;
  align-items: center;
  justify-content: center;
  border-radius: 50px;
  background-image: url(*);
`;

const SoundButton: React.FC<SoundButtonProps> = ({soundUrl}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [sound, setSound] = useState<Sound | null>(null);

  useEffect(() => {
    return () => {
      if (sound) {
        sound.release();
      }
    };
  }, [sound]);

  const playSound = (): void => {
    if (sound) {
      setIsPlaying(true);
      sound.play((success: boolean) => {
        if (success) {
          console.log('Sound has finished playing successfully!');
          setIsPlaying(false);
        } else {
          console.log('Playback failed due to audio decoding errors');
          sound.release();
          setSound(null);
        }
      });
    } else {
      const soundInstance = new Sound(soundUrl, undefined, error => {
        if (error) {
          console.log('Failed to load the sound', error);
          return;
        }
        setSound(soundInstance);
        setIsPlaying(true);
        soundInstance.play();
      });
    }
  };

  const togglePlay = (): void => {
    if (isPlaying) {
      if (sound) {
        sound.pause();
        setIsPlaying(false);
      }
    } else {
      playSound();
    }
  };

  return isPlaying ? (
    <StyledButton mode="text" onPress={togglePlay}>
      <PauseButtonIcon height={25} width={25} />
    </StyledButton>
  ) : (
    <StyledButton mode="text" onPress={togglePlay}>
      <PlayButtonIcon height={25} width={25} />
    </StyledButton>
  );
};

export default SoundButton;
