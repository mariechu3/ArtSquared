import React from 'react';
import { View, Text } from 'react-native'

export default Content = ({ children }) => {
    return (
        <View style={{ margin: 24 }}>
            {children}
        </View>
    )
}

