import { Colors } from "@/styles/variables";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    indexContainer: {
        height: '100%',
    },
    darkMain: {
        backgroundColor: Colors.dark.background,
    },
    lightMain: {
        backgroundColor: Colors.light.background
    },
    heading: {
        height: "35%",
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    body: {
        paddingHorizontal: 25,
    },

    inputs: {
        paddingVertical: 20,
        paddingHorizontal: 18,
        borderRadius: 14,
        fontSize: 16,
        marginBottom: 20
    }
})