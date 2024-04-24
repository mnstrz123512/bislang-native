import {Dimensions} from 'react-native';

const useIsMobile = () => {
  const width = Dimensions.get('window').width;

  return width < 768;
};

export default useIsMobile;
