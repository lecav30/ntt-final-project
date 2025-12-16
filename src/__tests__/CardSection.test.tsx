import { fireEvent, render } from '@testing-library/react-native';
import CardSection from '../design/molecules/CardSection/CardSection';

describe('CardSection', () => {
  it('renders content and handles press', () => {
    const handlePress = jest.fn();
    const { getByText } = render(
      <CardSection
        title="Payments"
        description="View your last payments"
        icon="💳"
        handlePress={handlePress}
      />
    );

    fireEvent.press(getByText('Payments'));

    expect(handlePress).toHaveBeenCalled();
    expect(getByText('View your last payments')).toBeTruthy();
  });
});
