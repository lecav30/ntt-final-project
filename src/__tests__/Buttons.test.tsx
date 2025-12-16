import { fireEvent, render } from '@testing-library/react-native';
import PrimaryButton from '../design/atoms/PrimaryButton/PrimaryButton';
import SecondaryButton from '../design/atoms/SecondaryButton/SecondaryButton';
import secondaryStyles from '../design/atoms/SecondaryButton/SecondaryButton.styles';

describe('Buttons', () => {
  it('renders primary button text and handles press', () => {
    const onPress = jest.fn();
    const { getByText } = render(
      <PrimaryButton text="Submit" onPress={onPress} testID="primary-button" />
    );

    fireEvent.press(getByText('Submit'));

    expect(onPress).toHaveBeenCalled();
  });

  it('applies variant styles on secondary button', () => {
    const { getByTestId, rerender } = render(
      <SecondaryButton
        text="Accept"
        variant="accept"
        testID="secondary-button"
      />
    );

    const acceptButton = getByTestId('secondary-button');
    expect(acceptButton.props.style).toEqual(
      expect.arrayContaining([secondaryStyles.accept])
    );

    rerender(
      <SecondaryButton
        text="Cancel"
        testID="secondary-button"
        variant="cancel"
      />
    );
    const cancelButton = getByTestId('secondary-button');
    expect(cancelButton.props.style).toEqual(
      expect.arrayContaining([secondaryStyles.cancel])
    );
  });
});
