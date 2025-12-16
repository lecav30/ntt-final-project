import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import styles from './ChatBox.styles';

interface Props {
  message: string;
  style?: StyleProp<ViewStyle>;
  variant: 'assistant' | 'user';
  testID?: string;
}

const ChatBox = (props: Props) => {
  return (
    <View
      testID={props.testID}
      style={[
        props.style,
        styles.container,
        props.variant === 'assistant' ? styles.assistant : styles.user,
      ]}
    >
      <Text>{props.message}</Text>
    </View>
  );
};

export default ChatBox;
