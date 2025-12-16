import { Pressable, Text, View } from 'react-native';
import styles from './ServiceItem.styles';
import Svg, { Path } from 'react-native-svg';

interface Props {
  serviceName: string;
  onPress: () => void;
}

const ServiceItem = ({ serviceName, onPress }: Props) => {
  return (
    <Pressable style={styles.item} onPress={onPress}>
      <View style={styles.services}>
        <View style={styles.square} />
        <Text>{serviceName}</Text>
      </View>

      <Svg width="12" height="20" viewBox="0 0 12 20" fill="none">
        <Path
          d="M10.8076 10.3306C10.8076 10.1064 10.7246 9.91553 10.5586 9.74121L4.36621 3.68994C4.2168 3.54053 4.02588 3.46582 3.81006 3.46582C3.36182 3.46582 3.02148 3.80615 3.02148 4.25439C3.02148 4.46191 3.11279 4.66943 3.25391 4.81055L8.89844 10.3306L3.25391 15.8423C3.11279 15.9917 3.02148 16.1826 3.02148 16.4067C3.02148 16.855 3.36182 17.1953 3.81006 17.1953C4.02588 17.1953 4.2168 17.1123 4.36621 16.9712L10.5586 10.9116C10.7246 10.7456 10.8076 10.5547 10.8076 10.3306Z"
          fill="#3C3C43"
          fill-opacity="0.3"
        />
      </Svg>
    </Pressable>
  );
};

export default ServiceItem;
