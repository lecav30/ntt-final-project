import { Text, View } from 'react-native';
import type { Transaction } from '../../../modules/shared/types/Transaction';
import styles from './ListItem.styles';

interface Props {
  transaction: Transaction;
}

const ListItem = ({ transaction }: Props) => {
  return (
    <View style={styles.item}>
      <View style={styles.info}>
        <Text
          style={[
            styles.category,
            transaction.type === 'income'
              ? styles.backgroundIncome
              : styles.backgroundExpense,
          ]}
        >
          {transaction.category}
        </Text>
        <View>
          <Text
            style={{
              fontWeight: '700',
            }}
          >
            {transaction.description}
          </Text>
          <Text>{transaction.date}</Text>
        </View>
      </View>
      <Text
        style={[
          styles.amount,
          transaction.type === 'income'
            ? styles.colorIncome
            : styles.colorExpense,
        ]}
      >
        {transaction.type === 'income' ? '+' : '-'} S/
        {transaction.amount}
      </Text>
    </View>
  );
};

export default ListItem;
