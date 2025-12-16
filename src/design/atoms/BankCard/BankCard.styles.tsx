import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    width: 331,
    height: 209,
    padding: 20,
    gap: 20,
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.35,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 8 },
    elevation: 8,
    justifyContent: 'center',
  },
  diagonal1: {
    position: 'absolute',
    width: '150%',
    height: 140,
    backgroundColor: '#5A5A5A',
    top: -40,
    left: -40,
    transform: [{ rotate: '-15deg' }],
  },
  diagonal2: {
    position: 'absolute',
    width: '150%',
    height: 140,
    backgroundColor: '#1A1A1A',
    bottom: -40,
    right: -40,
    transform: [{ rotate: '-15deg' }],
  },
  data: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    color: 'white',
  },
});

export default styles;
