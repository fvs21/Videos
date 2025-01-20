import { Colors } from "@/styles/variables";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    indexContainer: {
        height: '100%',
        padding: 20,
    },
    darkMain: {
        backgroundColor: Colors.dark.background,
    },
    lightMain: {
        backgroundColor: Colors.light.background
    }
})