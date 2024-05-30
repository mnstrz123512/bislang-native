import React, { useState, useEffect } from 'react';
import { Button } from 'react-native-paper';
import Sound from 'react-native-sound';
import styled from '@emotion/native';
import PlayButtonIcon from '@assets/images/svg/play-button.svg';

interface SoundButtonProps {
  soundUrl: string;
}

const StyledButton = styled(Button)`
  width: 50px;
  height: 50px;
  align-items: center;
  justify-content: center;
  border-radius: 50px;
`;

const SoundButton: React.FC<SoundButtonProps> = ({ soundUrl }) => {
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
      sound.play((success: boolean) => {
        if (success) {
          console.log('Sound has finished playing successfully!');
        } else {
          console.log('Playback failed due to audio decoding errors');
          sound.release();
          setSound(null);
        }
        setIsPlaying(false);
      });
    } else {
      const soundInstance = new Sound(soundUrl, undefined, (error) => {
        if (error) {
          console.log('Failed to load the sound', error);
          return;
        }
        setSound(soundInstance);
        soundInstance.play((success: boolean) => {
          if (success) {
            console.log('Sound has finished playing successfully!');
          } else {
            console.log('Playback failed due to audio decoding errors');
          }
          setIsPlaying(false);
        });
        setIsPlaying(true);
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

  return (
    <StyledButton mode="text" onPress={togglePlay}>
      <PlayButtonIcon height={25} width={25} />
    </StyledButton>
  );
};

export default SoundButton;
