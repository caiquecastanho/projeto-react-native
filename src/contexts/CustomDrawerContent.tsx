import {
    DrawerContentScrollView,
    DrawerItem,
    DrawerItemList,
  } from '@react-navigation/drawer';
import React from 'react';
import { Linking, View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
  
  function CustomDrawerContent(props) {
    return (
        <>
        <SafeAreaView>
            <View style={{alignItems: 'center', marginTop: 30}}>
                <Text style={{fontWeight: 'bold'}}>{props.name}</Text>
            </View>
        </SafeAreaView>
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
        <DrawerItem
            label="Logoff"
            onPress={() => props.logoff()}
        />
      </DrawerContentScrollView>
        </>
    );
  }

  export default CustomDrawerContent;