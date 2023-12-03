import Home from '../screens/Home'
import Canvas from '../screens/Canvas'
import Lessons from '../screens/Lessons'
import Share from '../screens/Share'
import Collaborate from '../screens/Collaborate'
import Gallery from '../screens/Gallery'
import { StyleSheet, View } from 'react-native'
import { Icon } from 'react-native-elements'
import { TouchableOpacity } from 'react-native-gesture-handler'
import {
    createDrawerNavigator,
    DrawerContentScrollView,
    DrawerItemList,
} from '@react-navigation/drawer';

const styles = StyleSheet.create({
    menu: {
        paddingRight: 24
    }
})

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
    return (
        <DrawerContentScrollView {...props}>
            <DrawerItemList {...props} />
        </DrawerContentScrollView>
    );
}

export default Navigation = ({ drawings, addDrawing, removeDrawing }) => {
    return (
        <Drawer.Navigator
            drawerContent={(props) => <CustomDrawerContent {...props} />}
            backBehavior="history"
            screenOptions={({ navigation }) => ({
                drawerStyle: {
                    backgroundColor: 'white',
                    width: 300,
                },
                drawerLabelStyle: {
                    fontSize: 24,
                },
                drawerPosition: "right",
                headerLeft: () => (<View style={{ paddingRight: 8 }}></View>),

                headerRight: (props) => (<TouchableOpacity style={styles.menu} onPress={navigation.toggleDrawer}>
                    <Icon size={44} name='menu' />
                </TouchableOpacity>),
                headerTitleAlign: "left",
                headerTitleStyle: { fontSize: 24 },
            })}
        >
            <Drawer.Screen
                name="Home"
                options={{
                    headerTitle: '',
                    title: 'Home',
                    drawerIcon: ({ focused, size }) => (
                        <Icon
                            style={{ paddingRight: 10 }}
                            size={36}
                            type="ionicon"
                            name={Platform.OS === "ios" ? "ios-home-outline" : "md-home-outline"}
                        />
                    ),

                }}
                component={({ navigation }) => <Home navigation={navigation} drawings={drawings} />} />
            <Drawer.Screen
                name="Canvas"
                options={{
                    title: 'Canvas',
                    drawerIcon: ({ focused, size }) => (
                        <Icon
                            style={{ paddingRight: 10 }}
                            size={36}
                            type="ionicon"
                            name={Platform.OS === "ios" ? "ios-color-palette-outline" : "md-color-palette-outline"}
                        />
                    ),
                }}
                component={() => <Canvas addDrawing={addDrawing} />} />
            <Drawer.Screen
                name="Gallery"
                options={{
                    title: 'Gallery',
                    drawerIcon: ({ focused, size }) => (
                        <Icon
                            style={{ paddingRight: 10 }}
                            size={36}
                            type="ionicon"
                            name={Platform.OS === "ios" ? "ios-apps-outline" : "md-apps-outline"}
                        />
                    ),
                }}
                component={({ navigation }) => <Gallery navigation={navigation} drawings={drawings} />} />
            <Drawer.Screen
                name="Lessons"
                options={{
                    title: 'Lessons',
                    drawerIcon: ({ focused, size }) => (
                        <Icon
                            style={{ paddingRight: 10 }}
                            size={36}
                            type="ionicon"
                            name={Platform.OS === "ios" ? "ios-book-outline" : "md-book-outline"}
                        />
                    ),
                }}
                component={Lessons} />
            <Drawer.Screen
                name="Collaborate"
                options={{
                    title: 'Collaborate',
                    drawerIcon: ({ focused, size }) => (
                        <Icon
                            style={{ paddingRight: 10 }}
                            size={36}
                            type="ionicon"
                            name={Platform.OS === "ios" ? "ios-people-outline" : "md-people-outline"}
                        />
                    ),
                }}
                component={Collaborate} />
            <Drawer.Screen
                name="Share"
                options={{
                    title: 'Share',
                    drawerIcon: ({ focused, size }) => (
                        <Icon
                            style={{ paddingRight: 10 }}
                            size={36}
                            type="ionicon"
                            name={Platform.OS === "ios" ? "ios-share-outline" : "md-share-outline"}
                        />
                    ),
                }}
                component={({ navigation, route }) => <Share route={route} navigation={navigation} buttonText="Next" drawings={drawings} />}
            />
        </Drawer.Navigator >
    );
}