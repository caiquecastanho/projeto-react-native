import { ActivityIndicator } from "@react-native-material/core";
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { addFavorite, getProduct } from "../service/ProductService";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

export default class ProductDetailScreen extends React.Component<any, ProductScreenState>{

    constructor(props: any){
        super(props);
        this.state = {product: null, isLoading: false, isFavorite: false, lat: 0, longi: 0};
    }

    componentDidMount(): void {
        this.loadProduct();
        this.loadMyLocation();
    }

    async loadMyLocation(): Promise<void> {
        const status = await Location.requestForegroundPermissionsAsync();
        let location = await Location.getCurrentPositionAsync({});
        console.log(location);
        this.setState({lat: location.coords.latitude, longi: location.coords.longitude});
    }

    async loadProduct(): Promise<void>{
        try{
            this.setState({isLoading: true});
            const product: Product = await getProduct('62ce3e33a3c2b4b0af2f5a2a')
            this.setState({product, isLoading: false, isFavorite: product.favorite});
        }catch(error){
            console.log(error);
        }
    }

    async handleFavoriteChange(): Promise<void>{
        const {product} = this.state;
        try{
            this.setState({isLoading: true});
            await addFavorite(product!._id);
            this.setState({isFavorite: !this.state.isFavorite, isLoading: false});
        }catch(error){
            console.log('Erro ao adicionar aos favoritos');
        }
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

    renderContent():JSX.Element {
        const {product, isFavorite} = this.state;
        const {lat, longi} = this.state;
        return (
            <>
                <View style={{justifyContent: 'flex-start', flex: 1}}>
                    <View style={{flex: 1, flexDirection: 'row', alignItems: 'flex-start', paddingTop: 20}}>
                        <View style={{flex: 1, justifyContent: 'center', padding: 10, alignItems: 'center'}}>
                            {isFavorite && <Icon name="star" size={48} onPress={()  => this.handleFavoriteChange()}></Icon>}
                            {!isFavorite && <Icon name="star-outline" size={48} onPress={() => this.handleFavoriteChange()}></Icon>}
                        </View>
                        <View style={{flex: 3, justifyContent: 'flex-end', marginRight: 20 }}>
                            <Text style= {{flex: 1, fontWeight: 'bold'}}>{product?.name}</Text>
                            <Text style={{flex: 1}}>{`Preço: R$${product?.price}`}</Text>
                        </View>
                    </View>
                    <View style={styles.container}>
                        <MapView
                            style={styles.map}
                            initialRegion={{
                                latitude: lat,
                                longitude: longi,
                                latitudeDelta: 0.0922,
                                longitudeDelta: 0.0421,}}>
                            {product?.stores.map((store, index) => (
                                <Marker
                                    key={index}
                                    coordinate={{ latitude : Number(store.latitude) , longitude : Number(store.longitude) }}
                                    title={store.name}
                                    description={store.address}
                                />
                            ))}
                            <Marker
                                key={product?.stores.length || 0 + 1}
                                coordinate={{ latitude : Number(lat) , longitude : Number(longi) }}
                                title={'Estou aqui'}
                            />
                        </MapView>     
                    </View>
                </View>
            </>
        );
    }

    render(): JSX.Element{
        const {isLoading} = this.state;
        return (
            <>
                {isLoading && this.renderLoading()}
                {!isLoading && this.renderContent()}
            </>
        );
    }
}

type ProductScreenState = {
    product: Product | null,
    isLoading: boolean,
    isFavorite: boolean,
    lat: number,
    longi: number,
}

const styles = StyleSheet.create({
    container: {
      flex: 5,
      marginHorizontal: 10,
      marginBottom: 30
    },
    map: {
      width: '100%',
      height: '100%',
    },
  });