import { Colors } from "@/styles/variables";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    interactionButton: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 8,
    },
    countText: {
        color: Colors.dark.white300,
        fontSize: 12,
        fontWeight: "600",
    }
})