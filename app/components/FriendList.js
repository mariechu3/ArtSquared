import Friend from '../components/Friend'
import images from '../Variables/Images'
import { ScrollView, View, Text, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import Button from './Button'
import Marie from '../assets/Marie.png'
import * as SMS from 'expo-sms';
import numbers from '../Variables/Numbers'

const MarieUri = Image.resolveAssetSource(Marie).uri
export default FriendList = ({ buttonText }) => {
    const [isAvailable, setIsAvailable] = useState(false);

    const [selectedFriends, setSelectedFriends] = useState(new Set())
    const addFriend = (name) => {
        setSelectedFriends(friends => new Set([...friends, name]))
        console.log("addFriend:", selectedFriends)
    }
    const removeFriend = (name) => {
        setSelectedFriends(friends => new Set([...friends].filter(x => x !== name)))
        console.log("removeFriend:", selectedFriends)
    }

    useEffect(async () => {
        const isSmsAvailable = await SMS.isAvailableAsync();
        setIsAvailable(isSmsAvailable)
    }, [])

    const sendSMS = async (numbers) => {
        const { result } = await SMS.sendSMSAsync(
            numbers,
            'Check out my artwork!',
            {
                attachments: {
                    uri: MarieUri,
                    mimeType: 'image/png',
                    filename: '../assets/Marie.png',
                },
            }
        )
        console.log(result)
    }

    return (
        <View style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height:'100%' }}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: 20, flex: 1 }}>
                <View style={{ display: 'flex', flexDirection: 'row', columnGap: '8', flex: 1 }}>
                    <Friend name="Leyth" addFriend={addFriend} removeFriend={removeFriend} picture={images.Leyth} />
                    <Friend name="Marie" addFriend={addFriend} removeFriend={removeFriend} picture={images.Marie} />
                    <Friend name="David" addFriend={addFriend} removeFriend={removeFriend} picture={images.David} />
                    <Friend name="Becky" addFriend={addFriend} removeFriend={removeFriend} picture={images.Becky} />
                </View>
            </ScrollView>

            <View style={{ flex: 1 }}>
                <Image source={images.Marie} />
            </View>
            <View style={{ flex: 1 }}>
                {isAvailable ? <Button onPress={() => sendSMS([...selectedFriends].map(x => numbers[x]))} textSize={24}>{buttonText}</Button> : <Text>sms not available</Text>}
                <Text>Selected {selectedFriends.size} friend</Text>
            </View>

        </View>
    )
}
