import React, { useContext } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import ProductsScreen from "../screens/ProductsScreen";
import FavoriteScreen from "../screens/FavoriteScreen";
import CustomDrawerContent from "./CustomDrawerContent";
import { AuthContext } from "./AuthContext";

const Drawer = createDrawerNavigator();
const HomeNavigator = () => {
    
    const {isLogged, name, authContextLogOff} = useContext(AuthContext);
    return (
        <Drawer.Navigator drawerContent={(props) => <CustomDrawerContent {...props} name={name} isLogged={isLogged} logoff={authContextLogOff}/>}>
            <Drawer.Screen name="Products" component={ProductsScreen} options={{title: 'Produtos', unmountOnBlur:true}}/>
            <Drawer.Screen name= "Favorites" component={FavoriteScreen} options={{title: "Favoritos", unmountOnBlur:true}}/> 
        </Drawer.Navigator>
    );
}


export default HomeNavigator;