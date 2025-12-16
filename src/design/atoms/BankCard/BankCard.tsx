import { View, Text } from 'react-native';
import styles from './BankCard.styles';

interface Props {
  balance: number;
  cardNumber: string;
  cardHolder: string;
  expirationDate: string;
}

const BankCard = (props: Props) => {
  const formatBalance = (amount: number): string => {
    if (typeof amount !== 'number') return '$0.00';
    return `$${amount.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  const formatCardNumber = (cardNumber: string): string => {
    const last4 = cardNumber.slice(-4);
    return `**** **** **** ${last4}`;
  };

  return (
    <View style={styles.container}>
      <View style={styles.diagonal1} />
      <View style={styles.diagonal2} />

      <Text
        style={{
          fontSize: 20,
          ...styles.text,
        }}
      >
        {formatBalance(props.balance)}
      </Text>
      <Text
        style={{
          fontWeight: 'bold',
          ...styles.text,
        }}
      >
        {formatCardNumber(props.cardNumber)}
      </Text>
      <View style={styles.data}>
        <View>
          <Text
            style={{
              opacity: 0.5,
              ...styles.text,
            }}
          >
            Card Holder
          </Text>
          <Text
            style={{
              fontWeight: 'bold',
              ...styles.text,
            }}
          >
            {props.cardHolder}
          </Text>
        </View>
        <View>
          <Text
            style={{
              opacity: 0.5,
              ...styles.text,
            }}
          >
            Expires
          </Text>
          <Text
            style={{
              fontWeight: 'bold',
              ...styles.text,
            }}
          >
            {props.expirationDate}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default BankCard;
