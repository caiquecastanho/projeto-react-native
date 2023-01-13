import 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import LoginProps from './src/screens/LoginScreen';
import React, { useContext } from 'react';
import AuthContextProvider from './src/contexts/AuthContextProvider';
import MyRoutes from './src/contexts/Routes';

export default function App() {
  return (
      <NavigationContainer>
        <AuthContextProvider>
          <MyRoutes/>
        </AuthContextProvider> 
      </NavigationContainer>
  );
}

export type RootStackParamList = {
  Login: LoginProps,
  SignUp: undefined,
  Products: undefined,
  ProductDetail: undefined,
  FavoriteScreen: undefined,
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

