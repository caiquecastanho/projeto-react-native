import React, {useContext} from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import { AuthContext } from './AuthContext';
import HomeNavigator from './HomeNavigator';
import ProductDetailScreen from '../screens/ProductDetailScreen';
import FormInputScreen from '../screens/FormInputScreen';


const Stack = createStackNavigator();

const MyRoutes = () => {
    const {isLogged} = useContext(AuthContext);
    return isLogged ?
    (
        <Stack.Navigator>
            <Stack.Screen name='Home' component={HomeNavigator} options={{headerShown: false}}/>
            <Stack.Screen name='ProductDetail' component={ProductDetailScreen} options={{title: 'Detalhe do Produto', headerBackTitleVisible: false}}/>
        </Stack.Navigator>
    ):
    (
        <Stack.Navigator>
            <Stack.Screen name= "Login" component={LoginScreen} options={{headerShown: false}}/>
            <Stack.Screen name= "SignUp" component={FormInputScreen} options={{title: 'Novo Usuário', headerBackTitleVisible: false}}/>
        </Stack.Navigator>
    );
}

export default MyRoutes;