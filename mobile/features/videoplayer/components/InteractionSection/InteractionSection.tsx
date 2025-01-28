import { View } from "react-native";
import { styles } from "./InteractionSection.style";
import InteractionButton from "../InteractionButton/InteractionButton";
import Heart from "@/components/svgs/Heart";
import HeartFill from "@/components/svgs/HeartFill";
import { Colors } from "@/styles/variables";
import Chat from "@/components/svgs/Chat";
import Bookmark from "@/components/svgs/Bookmark";
import BookmarkFill from "@/components/svgs/BookmarkFill";
import { useState } from "react";
import Send from "@/components/svgs/Send";
import ThreeDots from "@/components/svgs/ThreeDots";

type InteractionSectionProps = {
    post_id: number;
    likes: number;
    comment_count: number;
}

export default function InteractionSection({post_id, likes, comment_count}: InteractionSectionProps) {
    const [isLiked, setIsLiked] = useState<boolean>(false);
    const [isBookmarked, setIsBookmarked] = useState<boolean>(false);

    return (
        <View style={styles.interactionContainer}>
                <InteractionButton 
                    icon={<Heart width={28} color={Colors.dark.white200} />} 
                    interactedIcon={<HeartFill width={28} color={"red"} />}
                    count={3} 
                    onPress={() => setIsLiked(!isLiked)} 
                    interacted={isLiked}
                />
                <InteractionButton 
                    icon={<Chat width={28} color={Colors.dark.white200} />} 
                    count={4}
                    onPress={() => {}} 
                /> 
                <InteractionButton 
                    icon={<Bookmark width={28} color={Colors.dark.white200} />} 
                    interactedIcon={<BookmarkFill width={28} color={"white"} />}
                    count={0} 
                    onPress={() => setIsBookmarked(!isBookmarked)} 
                    interacted={isBookmarked}
                />
                <InteractionButton 
                    icon={<Send width={28} color={Colors.dark.white200} />} 
                    count={0} 
                    onPress={() => {}} 
                />
                <InteractionButton 
                    icon={<ThreeDots width={20} color={Colors.dark.white200} />} 
                    count={0} 
                    onPress={() => {}} 
                />
            </View>
    )
}