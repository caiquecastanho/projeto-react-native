import { Divider } from "@react-native-material/core";
import React from "react";
import { View, Text } from "react-native";
import { ItemProduct } from "../service/ProductService";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

export default class ProductItemList extends React.Component<{product: ItemProduct, navigate: (route: string, parameter: any) => void}, any>{
    constructor(props: {product: ItemProduct, navigate: () => void}){
        super(props);
    }

    navigateToProductDetail = (product: ItemProduct) => {
        this.props.navigate('ProductDetail', {product});
    } 

    render(): JSX.Element {
        const product = this.props.product;
        return(
            <>
            <View style={{flex: 1, flexDirection: 'row', alignItems: 'flex-start', paddingVertical: 20}}>
                <View style={{flex: 1, justifyContent: 'center', padding: 10, alignItems: 'center'}}>
                    {product.favorite && <Icon name="star" size={36}/>}
                    {!product.favorite && <Icon name="star-off" size={36}/>}
                </View>
                <View style={{flex: 4, justifyContent: 'flex-end' }}>
                    <Text style= {{flex: 2, fontWeight: 'bold'}}>{product.name}</Text>
                    <Text style={{flex: 1, paddingTop: 10}}>{`Preço: R$${product.price}`}</Text>
                </View>
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'flex-end', padding: 10}}>
                    <Icon onPress={() => this.navigateToProductDetail(product)} name='chevron-right' size={36}/>
                </View>
            </View>
            <Divider leadingInset={16} />
        </>
        );
    }
}