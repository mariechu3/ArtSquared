import React, { useState } from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";
import { Icon } from 'react-native-elements'

export default Friend = ({ name, picture }) => {
    const [selected, setSelected] = useState(false)

    return (
        <TouchableOpacity style={{ display: 'flex', alignItems: 'center', width: 100, position: 'relative' }} onPress={() => setSelected(!selected)}>
            <Image style={{ width: 100, height: 100, borderRadius: 50 }} source={picture} />
            <View style={{ display: 'flex', flexDirection: "row", alignItems: "center" }}>
                <Text>{name}</Text>
                {selected && <Icon style={{}} type="ionicon" name="checkmark-circle-outline" />}
            </View>
        </TouchableOpacity >
    )
}