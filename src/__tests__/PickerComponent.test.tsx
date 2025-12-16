import { render } from '@testing-library/react-native';
import RNPickerSelect from 'react-native-picker-select';
import PickerComponent from '../design/atoms/PickerComponent/PickerComponent';

const mockPicker = RNPickerSelect as unknown as jest.Mock;

describe('PickerComponent', () => {
  beforeEach(() => {
    mockPicker.mockClear();
  });

  it('forwards props to picker and triggers change handler', () => {
    const items = [
      { label: 'First', value: '1' },
      { label: 'Second', value: '2' },
    ];
    const onValueChange = jest.fn();

    render(
      <PickerComponent items={items} value="1" onValueChange={onValueChange} />
    );

    const pickerProps = mockPicker.mock.calls[0][0];

    expect(pickerProps.items).toBe(items);
    expect(pickerProps.value).toBe('1');
    expect(pickerProps.placeholder).toEqual({
      label: 'Selecciona una opción',
      value: null,
    });

    pickerProps.onValueChange('2', 5);

    expect(onValueChange).toHaveBeenCalledWith('2', 5);
  });
});
