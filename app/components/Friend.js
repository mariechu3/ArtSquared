import React, { useEffect, useState } from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";
import { Icon } from 'react-native-elements'


export default Friend = ({ name, picture, addFriend, removeFriend }) => {
    const [selected, setSelected] = useState(null)

    useEffect(() => {
        if (selected === true) {
            addFriend(name)
        }
        else if (selected === false) {
            removeFriend(name)
        }
    }, [selected])

    return (
        <TouchableOpacity style={{ display: 'flex', alignItems: 'center', width: 100, position: 'relative' }} onPress={() => setSelected(!selected)}>
            <Image style={{ width: 100, height: 100, borderRadius: 50 }} source={picture} />
            <View style={{ display: 'flex', flexDirection: "row", alignItems: "center" }}>
                <Text style={{fontSize: 18}}>{name}</Text>
                {selected && <Icon size={20} type="ionicon" name="checkmark-circle-outline" />}
            </View>
        </TouchableOpacity >
    )
}