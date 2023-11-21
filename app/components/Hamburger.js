import { TouchableOpacity } from 'react-native-gesture-handler'
import { Icon } from 'react-native-elements'
import React, { useState } from 'react'
import Navigation from './Navigation'
import Home from '../screens/Home'
import Canvas from '../screens/Canvas'
import Lessons from '../screens/Lessons'
import Share from '../screens/Share'
import Collaborate from '../screens/Collaborate'
import Gallery from '../screens/Gallery'

import {
    createDrawerNavigator,
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem,
} from '@react-navigation/drawer';

// export default Hamburger = ({ navigation, route }) => {
//     const [show, setShow] = useState(false);

//     return (
//         <>
//             <TouchableOpacity onPress={() => setShow(true)}>
//                 <Icon name='menu' />
//             </TouchableOpacity>
//             {show && <Navigation navigation={navigation} route={route} />}
//         </>
//     )
// }

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
    return (
        <DrawerContentScrollView {...props}>
            <DrawerItemList {...props} />
        </DrawerContentScrollView>
    );
}

export default Hamburger = () => {
    return (
        <Drawer.Navigator
            drawerContent={(props) => <CustomDrawerContent {...props} />}
        >
            <Drawer.Screen name="Home" component={Home} />
            <Drawer.Screen name="Canvas" component={Canvas} />
            <Drawer.Screen name="Collaborate" component={Collaborate} />
            <Drawer.Screen name="Lessons" component={Lessons} />
            <Drawer.Screen name="Share" component={Share} />
            <Drawer.Screen name="Gallery" component={Gallery} />
        </Drawer.Navigator>
    );
}