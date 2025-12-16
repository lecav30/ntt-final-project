import { fireEvent, render } from '@testing-library/react-native';
import ServiceItem from '../design/molecules/ServiceItem/ServiceItem';

describe('ServiceItem', () => {
  it('renders service name and triggers press', () => {
    const onPress = jest.fn();
    const { getByText } = render(
      <ServiceItem serviceName="Transfer" onPress={onPress} />
    );

    const button = getByText('Transfer');
    fireEvent.press(button);

    expect(onPress).toHaveBeenCalled();
  });
});
