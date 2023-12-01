import React from 'react';
import { View, Text } from 'react-native'

export default Content = ({ children }) => {
    return (
        <View style={{ marginTop: 24, marginRight: 24, marginBottom: 80, marginLeft: 24 }}>
            {children}
        </View>
    )
}

