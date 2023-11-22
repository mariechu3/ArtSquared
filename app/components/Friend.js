import React from "react";
import { View, Image, Text } from "react-native";

export default Friend = ({ name, picture }) => {
    return (
        <View style={{ display: 'flex', alignItems: 'center', width: 100 }}>
            <Image style={{ width: 100, height: 100, borderRadius: 50 }} source={picture} />
            <Text>{name}</Text>
        </View>
    )
}