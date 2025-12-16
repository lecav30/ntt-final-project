import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    alignSelf: 'stretch',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    shadowColor: '#171717',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 20,
    borderRadius: 20,
  },
  info: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
  },
  category: {
    marginRight: 20,
    borderRadius: 10,
    paddingHorizontal: 10,
    fontSize: 10,
  },
  amount: {
    fontWeight: '700',
    fontSize: 14,
  },
  backgroundIncome: {
    backgroundColor: '#008f3950',
  },
  colorIncome: {
    color: '#008f39',
  },
  backgroundExpense: {
    backgroundColor: '#ff000050',
  },
  colorExpense: {
    color: '#ff0000',
  },
});

export default styles;
