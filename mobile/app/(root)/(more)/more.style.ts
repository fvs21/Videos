import { Colors } from "@/styles/variables";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    moreContainer: {
    },
    moreOption: {
        padding: 16,
        paddingHorizontal: 20,
    },
    option: {
        display: "flex",
        flexDirection: "row",
        gap: 20,
        alignItems: "center"
    },
    optionIcon: {
        borderRadius: "50%",
        backgroundColor: "red",
        padding: 9,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    optionIconDark: {
        backgroundColor: Colors.dark.border
    },
    optionIconLight: {
        backgroundColor: Colors.light.border
    }
})