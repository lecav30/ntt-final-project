import { render } from '@testing-library/react-native';
import ListItem from '../design/molecules/ListItem/ListItem';
import styles from '../design/molecules/ListItem/ListItem.styles';

describe('ListItem', () => {
  const baseTransaction = {
    id: '1',
    description: 'Groceries',
    amount: 50,
    date: '2024-01-01',
    category: 'Food',
  };

  it('displays income details with proper sign and styles', () => {
    const { getByText } = render(
      <ListItem
        transaction={{ ...baseTransaction, type: 'income', amount: 150 }}
      />
    );

    expect(getByText('Food')).toBeTruthy();
    expect(getByText('Groceries')).toBeTruthy();
    expect(getByText('2024-01-01')).toBeTruthy();

    const amount = getByText('+ S/150');
    expect(amount.props.style).toEqual(
      expect.arrayContaining([styles.colorIncome])
    );
  });

  it('displays expense details with proper sign and styles', () => {
    const { getByText } = render(
      <ListItem transaction={{ ...baseTransaction, type: 'expense' }} />
    );

    const amount = getByText('- S/50');
    expect(amount.props.style).toEqual(
      expect.arrayContaining([styles.colorExpense])
    );

    const category = getByText('Food');
    expect(category.props.style).toEqual(
      expect.arrayContaining([styles.backgroundExpense])
    );
  });
});
