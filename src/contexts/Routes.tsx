import React, {useContext} from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import { AuthContext } from './AuthContext';
import { createDrawerNavigator } from '@react-navigation/drawer';
import FavoriteScreen from '../screens/FavoriteScreen';
import ProductNavigator from './ProductRoute';
import { getFocusedRouteNameFromRoute, Route } from '@react-navigation/native';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const MyRoutes = () => {
    const {isLogged} = useContext(AuthContext);
    return isLogged ?
    (
        <Drawer.Navigator>
                <Drawer.Screen 
                    name= "Home" 
                    component={ProductNavigator} 
                    options={({ route }) => ({
                        headerTitle: getChildHeaderTitle(route),
                    })}
                />
                <Drawer.Screen name= "Favorites" component={FavoriteScreen} options={{title: "Favoritos"}}/>
        </Drawer.Navigator>
    ):
    (
        <Stack.Navigator>
            <Stack.Screen name= "Login" component={LoginScreen} options={{headerShown: false}}/>
        </Stack.Navigator>
    );
}

//pega a tela em foco do navegação entre produtos e detalhe do produto
function getChildHeaderTitle(route: Partial<Route<string, object | undefined>>){
    const routeName = getFocusedRouteNameFromRoute(route) ?? 'Products';
    
    switch (routeName){
        case "Products": 
            return 'Produtos';
        case 'ProductDetail':
            return 'Detalhe do Produto'
    }
}

export default MyRoutes;