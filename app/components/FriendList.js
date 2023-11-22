import Friend from '../components/Friend'
import images from '../components/Images'
import { ScrollView, View, Dimensions } from 'react-native'
export default FriendList = () => {
    return (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{marginTop: 20}}>
            <View style={{ display: 'flex', flexDirection: 'row', columnGap: '8' }}>
                <Friend name="Joe" picture={images.Joe} />
                <Friend name="Fern" picture={images.Fern} />
                <Friend name="Archer" picture={images.Archer} />
                <Friend name="Lexie" picture={images.Lexie} />
                <Friend name="Lexie" picture={images.Lexie} />
                <Friend name="Lexie" picture={images.Lexie} />
            </View>
        </ScrollView>
    )
}
