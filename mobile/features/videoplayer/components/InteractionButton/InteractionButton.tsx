import { Pressable, Text, View, Animated } from "react-native";
import { styles } from "./InteractionButton.style";
import { useRef, useEffect } from "react";

type InteractionButtonProps = {
    icon: React.ReactNode;
    count: number;
    onPress: () => void;
    interacted?: boolean;
    interactedIcon?: React.ReactNode;
}

export default function InteractionButton({icon, count, onPress, interacted, interactedIcon}: InteractionButtonProps) {
    const scaleAnim = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        if (interacted) {
            Animated.sequence([
                Animated.spring(scaleAnim, {
                    toValue: 1.3,
                    useNativeDriver: true,
                    speed: 150,
                    bounciness: 15
                }),
                Animated.spring(scaleAnim, {
                    toValue: 1,
                    useNativeDriver: true,
                    speed: 120,
                    bounciness: 20
                })
            ]).start();
        }
    }, [interacted]);

    return (
        <Pressable style={styles.interactionButton} onPress={onPress}>
            <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
                {interacted ? interactedIcon : icon}
            </Animated.View>
            {count > 0 && 
                <Text style={styles.countText}>{count}</Text>
            }
        </Pressable>
    )
}