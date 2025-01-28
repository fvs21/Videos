import { useVideoPlayer, VideoView } from "expo-video";
import { Post } from "../types";
import { Dimensions, Image, Pressable, Text, TouchableOpacity, View } from "react-native";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useEvent } from "expo";
import { useEffect, useState } from "react";
import { styles } from "./VideoPlayer.style";
import InteractionSection from "./InteractionSection/InteractionSection";
import {LinearGradient} from "expo-linear-gradient";

type VideoPlayerProps = Post & {
    shouldPlay: boolean;
    id: number;
}

export default function VideoPlayer({video_url, description, creator, likes, comment_count, shouldPlay, id}: VideoPlayerProps) {
    const player = useVideoPlayer(video_url, player => {
        player.loop = true;
    });

    const tabBarHeight = useBottomTabBarHeight()
    const height = Dimensions.get("window").height;

    const { isPlaying } = useEvent(player, "playingChange", { isPlaying: player.playing });

    const duration = player.duration;
    const [timestamp, setTimestamp] = useState<number>(player.currentTime);

    useEffect(() => {
        if(shouldPlay) {
            player.play();
        } else {
            player.pause();
        }
    }, [shouldPlay]);   

    useEffect(() => {
        const interval = setInterval(() => {
            if(!isPlaying) return;

            if(timestamp >= duration) {
                setTimestamp(0);
            } else {
                setTimestamp((prev) => prev + 0.1);
            }
        }, 100);

        return () => {
            clearInterval(interval);
        };
    }, [isPlaying]);

    return (
        <Pressable style={{height: height - tabBarHeight, width: "100%", position: "relative"}} onPress={() => {
            if(isPlaying) {
                player.pause();
            } else {
                player.play();
            }
        }}>
            <VideoView 
                player={player} 
                style={{width: "100%", height: "100%", flex: 1}} 
                allowsFullscreen={false}
                allowsPictureInPicture={false}
                allowsVideoFrameAnalysis={false}
                nativeControls={false}
                requiresLinearPlayback={true}
                contentFit="cover"
            />
            
            {/* Bottom gradient overlay */}
            <LinearGradient
                colors={['transparent', 'rgba(0,0,0,0.1)', 'rgba(0,0,0,0.6)']}
                style={styles.bottomGradient}
                pointerEvents="none"
            />
            
            {/* Right side gradient overlay */}
            <LinearGradient
                colors={[
                    'transparent',
                    'rgba(0,0,0,0.01)',
                    ...Array.from({length: 20}, (_, i) => `rgba(0,0,0,${(i + 1) * 0.015})`)
                ]}
                style={styles.rightGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                pointerEvents="none"
            />
            <InteractionSection post_id={id} likes={likes} comment_count={comment_count} />
            <View style={styles.postInfoContainer}>
                <View style={styles.creatorContainer}>
                    <View style={styles.creatorProfilePicture}>
                        <Image source={{uri: creator.pfp_url}} style={styles.creatorProfilePictureImage} />
                    </View>
                    <Text style={styles.creator}>{creator.username}</Text>
                    <TouchableOpacity style={styles.followButton}>
                        <Text style={styles.followButtonText}>Follow</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.descriptionContainer}>
                    <Text style={styles.description}>{description}</Text>
                </View>
            </View>
            <View style={styles.buyButtonContainer}>
                <TouchableOpacity style={styles.buyButton}>
                    <Text style={styles.buyButtonText}>Buy</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.addToCartButton}>
                    <Text style={styles.buyButtonText}>Add to cart</Text>
                </TouchableOpacity>
            </View>
        </Pressable>
    )
}