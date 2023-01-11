import { ActivityIndicator } from "@react-native-material/core";
import React from "react";
import { View, FlatList, Text } from "react-native";
import { ItemProduct, listProducts, StoreProductsResponse } from "../service/ProductService";
import ProductItemList from "../components.tsx/ProductItemList";
import { AuthContext, AuthContextType } from "../contexts/AuthContext";

export default class ProductsScreen extends React.Component<any,ProductsScreenState> {

  static readonly PER_PAGE: number = 10;
  offset: number;

  constructor(props: any) {
    super(props);
    this.state = { products: [], isLoading: false, totalItems: 0 };
    this.offset = 1;
  }

  componentDidMount(): void {
    this.loadProductsList();
  }

  async loadProductsList(reload?: boolean): Promise<void> {
    if(reload){
      this.offset = 1;
    }
    try {
        const {token} = this.context as AuthContextType;
        this.setState({isLoading: true})
        const storeProductsResponse: StoreProductsResponse = await listProducts(ProductsScreen.PER_PAGE, this.offset, token);
        console.log(storeProductsResponse);
        const newListProducts = reload ? storeProductsResponse.products : this.state.products.concat(storeProductsResponse.products);
        this.setState({ products: newListProducts, isLoading: false, totalItems: storeProductsResponse.totalItems });
    } catch (error) {
      console.log(error.message);
    }
  }

  loadMoreData(): void{
    if(this.state.products.length >= this.state.totalItems){
      return;
    }
    this.offset = this.offset + 1;
    this.loadProductsList();
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

  renderProduct(product: ItemProduct): JSX.Element {
    return (
        <ProductItemList product={product} navigate={this.props.navigation.navigate}/>
    );
  }

  renderList(): JSX.Element {
    const { products } = this.state;
    return (
        <View>
        <FlatList
          data={products}
          renderItem={({ item }) => this.renderProduct(item)}
          onRefresh={() => this.loadProductsList(true) }
          refreshing={this.state.isLoading}
          onEndReached={() => this.loadMoreData()}
        />
      </View>
    );
  }

  render(): JSX.Element {
    const {name} = this.context as AuthContextType;
    return (
        <>
            {this.state.isLoading && this.renderLoading()}
            {!this.state.isLoading && this.renderList()}
        </>
    );
  }
}

ProductsScreen.contextType = AuthContext;

type ProductsScreenState = {
  products: ItemProduct[],
  isLoading: boolean;
  totalItems: number;
};
