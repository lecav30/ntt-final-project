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
    borderBottomColor: '#3C3C434D',
    borderBottomWidth: 1,
  },
  services: {
    flexDirection: 'row',
    gap: 10,
  },
  square: {
    width: 20,
    height: 20,
    backgroundColor: '#3C3C434D',
  },
});

export default styles;
