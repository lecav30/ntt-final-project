import type { FC } from 'react';
import {
  Pressable,
  Text,
  type PressableProps,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import styles from './SecondaryButton.styles';

interface Props {
  text: string;
  style?: StyleProp<ViewStyle>;
  variant?: 'accept' | 'cancel';
}

const SecondaryButton: FC<PressableProps & Props> = ({
  text,
  style,
  variant,
  ...rest
}) => {
  return (
    <Pressable
      {...rest}
      style={[
        styles.button,
        style,
        variant === 'accept' ? styles.accept : styles.cancel,
      ]}
    >
      <Text style={styles.text}>{text}</Text>
    </Pressable>
  );
};

export default SecondaryButton;
