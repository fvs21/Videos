import { Colors } from "@/styles/variables";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    option: {
        paddingHorizontal: 20,
        paddingVertical: 12,
        flexDirection: "row",
        alignItems: "center",
        gap: 15,
    },
    optionIcon: {
        width: 20,
        height: 20
    },
    optionText: {
        fontSize: 16
    },
    logoutText: {
        color: Colors.danger
    },
    settingsOptionContainer: {
        margin: 16,
        marginBottom: 8,
        borderWidth: 1,
        borderRadius: 14
    },
})