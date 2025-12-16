import { render } from '@testing-library/react-native';
import BankCard from '../design/atoms/BankCard/BankCard';

describe('BankCard', () => {
  it('formats balance and card number', () => {
    const { getByText } = render(
      <BankCard
        balance={1234.5}
        cardNumber="1234567812346789"
        cardHolder="John Doe"
        expirationDate="12/25"
      />
    );

    expect(getByText('$1,234.50')).toBeTruthy();
    expect(getByText('**** **** **** 6789')).toBeTruthy();
    expect(getByText('John Doe')).toBeTruthy();
    expect(getByText('12/25')).toBeTruthy();
  });
});
