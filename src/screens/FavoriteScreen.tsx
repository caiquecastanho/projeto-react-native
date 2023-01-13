import { ActivityIndicator } from "@react-native-material/core";
import React from "react";
import { View, FlatList } from "react-native";
import ProductItemList from "../components.tsx/ProductItemList";
import { AuthContext, AuthContextType } from "../contexts/AuthContext";
import { getFavorites, ItemProduct } from "../service/ProductService";

export default class FavoriteScreen extends React.Component<any, ProductsScreenState>{
    constructor(props: any){
        super(props);
        this.state = {products: [], isLoading: false}
    }

    async loadFavorites(): Promise<void>{
        const {token} = this.context as AuthContextType;
        try{
            this.setState({isLoading: true});
            const products: Product[] = await getFavorites(token);
            const itemsProduct: ItemProduct[] = products.map((product) => {
                const {_id, name, price} = product ;
                const itemProduct: ItemProduct = {_id: _id, name: name, price: price, favorite: true};
                return itemProduct;
            });
            this.setState({isLoading: false, products: itemsProduct});
        }catch(error){
            console.log(error.message);
        }
    }

    componentDidMount(): void {
        this.loadFavorites();
    }

    renderLoading(): JSX.Element {
        return (
            <>
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <ActivityIndicator size="large" />
                </View>
            </>
        );
    }

    renderProduct(itemProduct: ItemProduct): JSX.Element {
        return (
            <ProductItemList product={itemProduct} navigate={this.props.navigation.navigate}/>
        );
    }

    renderList(): JSX.Element {
        const {products} = this.state;
        return (
            <View>
                <FlatList
                data={products}
                renderItem={({ item }) => this.renderProduct(item)}
                />
            </View>
        );
    }

    render(): JSX.Element {
        return(
            <>
                {this.state.isLoading && this.renderLoading()}
                {!this.state.isLoading && this.renderList()}
            </>
        );
    }
}

FavoriteScreen.contextType = AuthContext;

type ProductsScreenState = {
    products: ItemProduct[];
    isLoading: boolean;
};