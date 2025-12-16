import type { FC } from 'react';
import {
  Pressable,
  Text,
  type PressableProps,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import styles from './PrimaryButton.styles';

interface Props {
  text: string;
  style?: StyleProp<ViewStyle>;
}

const PrimaryButton: FC<PressableProps & Props> = ({
  text,
  style,
  ...rest
}) => {
  return (
    <Pressable {...rest} style={[styles.button, style]}>
      <Text style={styles.text}>{text}</Text>
    </Pressable>
  );
};

export default PrimaryButton;
