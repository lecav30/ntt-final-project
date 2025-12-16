import type { FC } from 'react';
import RNPickerSelect from 'react-native-picker-select';
import styles from './PickerComponent.styles';

interface Props {
  items: { label: string; value: string }[];
  value?: string;
  onValueChange?: (value: string, index: number) => void;
}

const PickerComponent: FC<Props> = ({ items, value, onValueChange }) => {
  return (
    <RNPickerSelect
      value={value}
      onValueChange={(val, index) => {
        if (onValueChange) {
          onValueChange(val as string, index);
        }
      }}
      items={items}
      placeholder={{ label: 'Selecciona una opción', value: null }}
      style={{
        headlessAndroidContainer: styles.pickerContainer,
        inputAndroidContainer: {},
        inputIOSContainer: styles.pickerContainer,
        inputAndroid: styles.inputAndroid,
        inputIOS: styles.inputIOS,
      }}
      useNativeAndroidPickerStyle={false}
    />
  );
};

export default PickerComponent;
