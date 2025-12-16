import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  button: {
    display: 'flex',
    flexDirection: 'row',
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  text: {
    color: 'white',
    flex: 1,
    textAlign: 'center',
  },
  accept: {
    backgroundColor: '#34C759',
  },
  cancel: {
    backgroundColor: '#FF383C',
  },
});

export default styles;
