import { FlatList, Image, View } from "react-native";
import { styles } from "./ProductImageSlider.style";
import { useCallback, useRef, useState } from "react";
import Pagination from "./Pagination";
import GoBackButton from "@/components/GoBackButton";

export default function ProductImageSlider({images_urls}: { images_urls: string[] }) {
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

    return (
        <View style={styles.imageSliderContainer}>
            <View style={styles.goBackButton}>
                <GoBackButton />
            </View>
            <FlatList 
                data={images_urls}
                renderItem={({item}) => (
                    <Image source={{uri: item}} style={styles.imageSlider} resizeMode="cover"/>
                )}
                horizontal
                keyExtractor={(item) => item}
                showsHorizontalScrollIndicator={false}
                pagingEnabled
                snapToAlignment="center"
                viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
            />
            <Pagination current_index={currentViewableIndex} total={images_urls.length}/>
        </View>
    )
}