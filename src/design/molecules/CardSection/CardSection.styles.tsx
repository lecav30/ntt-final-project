import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    shadowColor: '#171717',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 20,
    borderRadius: 20,
    alignItems: 'center',
  },
  iconContainer: {
    width: 50,
    height: 50,
    backgroundColor: '#CFA9FF',
    borderRadius: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    marginVertical: 10,
    textAlign: 'center',
  },
  description: {
    color: '#4F4F4F',
    textAlign: 'center',
  },
});

export default styles;
