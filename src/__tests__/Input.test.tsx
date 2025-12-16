import { fireEvent, render } from '@testing-library/react-native';
import Input from '../design/atoms/Input/Input';

describe('Input', () => {
  it('manages uncontrolled value and clear button', () => {
    const { getByTestId } = render(
      <Input
        placeholder="Type here"
        testID="input-field"
        clearButtonTestID="input-field-clear"
      />
    );

    const input = getByTestId('input-field');

    fireEvent.changeText(input, 'Hello world');
    expect(getByTestId('input-field').props.value).toBe('Hello world');

    const clearButton = getByTestId('input-field-clear');
    fireEvent.press(clearButton);

    expect(getByTestId('input-field').props.value).toBe('');
  });

  it('delegates changes when controlled', () => {
    const onChangeText = jest.fn();

    const { getByTestId } = render(
      <Input
        value="Controlled"
        onChangeText={onChangeText}
        testID="input-field"
        clearButtonTestID="input-field-clear"
      />
    );

    const input = getByTestId('input-field');
    fireEvent.changeText(input, 'Updated');
    expect(onChangeText).toHaveBeenCalledWith('Updated');

    const clearButton = getByTestId('input-field-clear');
    fireEvent.press(clearButton);
    expect(onChangeText).toHaveBeenCalledWith('');
  });
});
