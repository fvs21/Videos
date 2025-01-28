import { Colors } from "@/styles/variables";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    postInfoContainer: {
        position: "absolute",
        bottom: 60,
        left: 15,
        backgroundColor: "transparent",
        zIndex: 2,
    },
    creatorContainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        paddingBottom: 10
    },
    creator: {
        color: "white",
        fontSize: 16,
        fontFamily: "Rubik-Regular"
    },
    creatorProfilePicture: {
        width: 30,
        height: 30,
        borderRadius: "50%",
        overflow: "hidden"
    },
    creatorProfilePictureImage: {
        width: "100%",
        height: "100%",
        objectFit: "cover"
    },
    followButton: {
        backgroundColor: "white",
        padding: 5,
        paddingHorizontal: 10,
        borderRadius: 12
    },
    followButtonText: {
        color: "black",
        fontSize: 12,
        fontFamily: "Rubik-Regular"
    },
    descriptionContainer: {
        backgroundColor: "transparent",
        zIndex: 2,
    },
    description: {
        color: "white",
        fontSize: 14,
        fontFamily: "Rubik-Regular"
    },
    buyButtonContainer: {
        backgroundColor: "transparent",
        zIndex: 2,
        position: "absolute",
        bottom: 10,
        left: 15,
        right: 15,
        display: "flex",
        flexDirection: "row",
        gap: 10
    },
    buyButton: {
        backgroundColor: "white",
        padding: 12,
        paddingHorizontal: 10,
        borderRadius: 20,
        flex: 1
    },
    addToCartButton: {
        backgroundColor: "#f0f032",
        padding: 12,
        paddingHorizontal: 10,
        borderRadius: 20,
        flex: 1
    },
    buyButtonText: {
        color: "black",
        fontSize: 15,
        fontFamily: "Rubik-SemiBold",
        textAlign: "center",
    },
    gradient: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '35%',
        zIndex: 1,
        pointerEvents: 'none',
    },
    interactionContainer: {
        zIndex: 2,
    },
    bottomGradient: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '35%',
        zIndex: 1,
        pointerEvents: 'none',
    },
    rightGradient: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        width: '20%',
        zIndex: 1,
        pointerEvents: 'none',
    },
})