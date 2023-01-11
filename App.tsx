import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen, { LoginProps } from './src/screens/LoginScreen';
import FormInputScreen from './src/screens/FormInputScreen';
import React from 'react';
import ProductsScreen from './src/screens/ProductsScreen';
import ProductDetailScreen from './src/screens/ProductDetailScreen';
import FavoriteScreen from './src/screens/FavoriteScreen';
import AuthContextProvider from './src/contexts/AuthContextProvider';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <AuthContextProvider>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Login' }} />
          <Stack.Screen name="SignUp" component={FormInputScreen} options={{title: 'Cadastro'}} />
          <Stack.Screen name="Products" component={ProductsScreen} options={{title: 'Produtos', headerBackVisible: false}} />
          <Stack.Screen name="ProductDetail" component={ProductDetailScreen} options={{title: 'Detalhe do Produto'}} />
          <Stack.Screen name="FavoriteScreen" component={FavoriteScreen} options={{title: 'Favoritos'}}/>
        </Stack.Navigator>
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

