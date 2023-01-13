import React, {useContext} from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import ProductsScreen from '../screens/ProductsScreen';
import ProductDetailScreen from '../screens/ProductDetailScreen';

const Stack = createStackNavigator();

const ProductNavigator = () => {
    return (
        <Stack.Navigator initialRouteName='Produtos'>
            <Stack.Screen name='Products' component={ProductsScreen} options={{headerShown: false}}/>
            <Stack.Screen name='ProductDetail' component={ProductDetailScreen} options={{title: '', headerBackTitleVisible: false}}/>
        </Stack.Navigator>
    );
}

export default ProductNavigator;