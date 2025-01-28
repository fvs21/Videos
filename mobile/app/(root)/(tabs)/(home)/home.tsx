import { useCallback, useRef, useState } from "react";
import { FlatList, View } from "react-native";
import VideoPlayer from "@/features/videoplayer/components/VideoPlayer";
import { useUser } from "@/store";


export default function Home() {
    const [currentViewableIndex, setCurrentViewableIndex] = useState(0);
    const viewabilityConfig = {
        itemVisiblePercentThreshold: 50,
    }

    const onViewableItemsChanged = useCallback(({viewableItems}: any) => {
        if(viewableItems.length > 0) {
            setCurrentViewableIndex(viewableItems[0].index ?? 0);
        }
    }, []);

    const viewabilityConfigCallbackPairs = useRef([{
        viewabilityConfig,
        onViewableItemsChanged
    }]);

    const [user] = useUser();

    const videos = [
        {
            url: "http://192.168.68.100:8000/api/video/playlist/60/v0/playlist.m3u8",
            description: "This is a test video",
            id: 1,
        },
        {
            url: "http://192.168.68.100:8000/api/video/playlist/61/v0/playlist.m3u8",
            description: "This is a test video 2",
            id: 2,
        },
    ]

    return (
        <View style={{flex: 1, height: "100%", width: "100%"}}>
            <FlatList
                data={videos}
                renderItem={({item, index}) => (
                    <VideoPlayer 
                        likes={1} 
                        comment_count={1} 
                        creator={user} 
                        video_id={1} 
                        video_url={item.url} 
                        shouldPlay={index === currentViewableIndex} 
                        description={item.description} 
                        id={item.id} 
                    />
                )}
                keyExtractor={(item) => item.id.toString()}
                style={{flexGrow: 1}}
                pagingEnabled
                viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
                showsVerticalScrollIndicator={false}
            />
        </View>
    )
}
