import { StyleSheet } from 'react-native';

const GlobalStyle = StyleSheet.create({
  fullScreen: {
    flex: 1,
    flexDirection: 'column',
  },
  boxShadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  }
});
export { GlobalStyle };
export * from './fontSize';
export * from './color';
export * from './typography';
export * from './palette';
export * from './spacing';
