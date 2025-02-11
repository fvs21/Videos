import { Dimensions, StyleSheet } from "react-native";
import { initialWindowMetrics } from "react-native-safe-area-context";

export const styles = StyleSheet.create({
    imageSliderContainer: {
        height: "50%",
        width: "100%",
        position: "relative",
    },
    imageSlider: {
        height: "100%",
        width: Dimensions.get("window").width,
    },
    paginationContainer: {
        position: "absolute",
        bottom: 10,
        right: 10,
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        width: 35,
        height: 25,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10
    },
    paginationCount: {
        color: "white",
        fontFamily: "Rubik-Regular"
    },
    goBackButton: {
        position: "absolute",
        top: (initialWindowMetrics?.insets.top as number || 0),
        left: 20,
        zIndex: 10
    }
})