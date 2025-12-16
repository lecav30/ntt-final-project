import type { FC } from 'react';
import {
  Pressable,
  TextInput,
  View,
  type StyleProp,
  type TextInputProps,
  type ViewStyle,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';
import styles from './Input.styles';
import useInput from './useInput';

interface Props {
  style?: StyleProp<ViewStyle>;
  clearButtonTestID?: string;
}

const Input: FC<TextInputProps & Props> = ({
  style,
  testID,
  clearButtonTestID,
  ...props
}) => {
  const {
    value: externalValue,
    onChangeText: externalOnChangeText,
    ...rest
  } = props;

  const { value: internalValue, setValue: setInternalValue } = useInput(
    externalValue ?? ''
  );

  const isControlled = externalValue !== undefined;

  const value = isControlled ? externalValue : internalValue;

  const handleChange = (text: string) => {
    if (isControlled && externalOnChangeText) {
      externalOnChangeText(text);
    } else {
      setInternalValue(text);
    }
  };

  const handleClear = () => {
    if (isControlled && externalOnChangeText) {
      externalOnChangeText('');
    } else {
      setInternalValue('');
    }
  };

  return (
    <View style={[styles.container, style]}>
      <TextInput
        {...rest}
        style={styles.input}
        value={value}
        onChangeText={handleChange}
        testID={testID}
      />

      {value.length > 0 && (
        <Pressable
          style={styles.clearButton}
          onPress={handleClear}
          testID={clearButtonTestID}
        >
          <Svg width="20" height="20" viewBox="0 0 14 14" fill="none">
            <Path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M7 0C10.8656 0 14 3.13438 14 7C14 10.8656 10.8656 14 7 14C3.13438 14 0 10.8656 0 7C0 3.13438 3.13438 0 7 0ZM8.99969 4.29406H8.99906L8.99781 4.295L7 6.29297L5.00219 4.295C5.00156 4.29422 5.00125 4.29406 5.00094 4.29406C5.00058 4.29395 5.0002 4.29395 4.99984 4.29406C4.99937 4.29406 4.99906 4.29422 4.99844 4.29484L4.295 4.99828C4.29462 4.99867 4.29435 4.99916 4.29422 4.99969C4.29411 5.00004 4.29411 5.00042 4.29422 5.00078V5.00109C4.29448 5.00145 4.2948 5.00177 4.29516 5.00203L6.29297 7L4.295 8.99781C4.29422 8.99844 4.29406 8.99875 4.29406 8.99906C4.29395 8.99942 4.29395 8.9998 4.29406 9.00016C4.29406 9.00063 4.29422 9.00094 4.29484 9.00156L4.99828 9.705C4.99867 9.70538 4.99916 9.70565 4.99969 9.70578C5.00004 9.70589 5.00042 9.70589 5.00078 9.70578C5.00109 9.70578 5.00141 9.70562 5.00203 9.705L7 7.70703L8.99781 9.705C8.99844 9.70562 8.99875 9.70578 8.99906 9.70578C8.99942 9.70589 8.9998 9.70589 9.00016 9.70578C9.00063 9.70578 9.00094 9.70562 9.00156 9.705L9.705 9.00156C9.70538 9.00117 9.70565 9.00069 9.70578 9.00016C9.70589 8.9998 9.70589 8.99942 9.70578 8.99906V8.99875C9.70557 8.9984 9.7053 8.99809 9.705 8.99781L7.70703 7L9.705 5.00219C9.70562 5.00156 9.70578 5.00125 9.70578 5.00094C9.70589 5.00058 9.70589 5.0002 9.70578 4.99984C9.70578 4.99937 9.70562 4.99906 9.705 4.99844L9.00156 4.295C9.00117 4.29462 9.00069 4.29435 9.00016 4.29422C8.9998 4.29411 8.99942 4.29411 8.99906 4.29422L8.99969 4.29406Z"
              fill="#B5B5B7"
            />
          </Svg>
        </Pressable>
      )}
    </View>
  );
};

export default Input;
